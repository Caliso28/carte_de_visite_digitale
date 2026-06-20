// bouton toggle

const toggle = document.getElementById("switch");
const html = document.documentElement;

const mediaQueryOS = window.matchMedia("(prefers-color-scheme: dark)");

function darkMode () {
    html.classList.toggle("dark")

    if (html.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        toggle.checked = true
    }
    else {
        localStorage.setItem("theme", "light");
        toggle.checked = false;
    }
}

function changerTheme () {

    const theme = localStorage.getItem("theme");

    if (theme == "dark") {
        html.classList.add("dark");
        toggle.checked = true;
    }
    else if (theme == "light") {
        html.classList.remove("dark");
        toggle.checked = false;
    }
    else {
        const pageDark = mediaQueryOS.matches;

        if (pageDark) {
            html.classList.add("dark");
            toggle.checked = true;
        }
        else {
            html.classList.remove("dark");
            toggle.checked = false;
        }
    }
}

function ecouterChangementOS (e) {
    if (localStorage.getItem("theme")) {
        return;
    }

    const pageDark = e.matches;
    if (pageDark) {
        html.classList.add("dark");
        toggle.checked = true;
    } else {
        html.classList.remove("dark");
        toggle.checked = false;
    }
}

changerTheme ();

toggle.addEventListener("change", darkMode);

mediaQueryOS.addEventListener("change", ecouterChangementOS);

/*
Ce bloque a pour objectif de modifier par programmation les éléments HTML
afin de ne pas afficher d'informations personnelles en claire. Vous pouvez soit le
supprimer et modifier manuellement le HTML ;
soit créer un dictionnaire comme celui-ci dans un fichier config.js à la
racine du dossier carte_de_visite_digitale, ce qui est vivement conseillé pour la suite du JS :

const dicInfos = {
    identite : {nom : "Nom", prenom : "Prénom", photo : "img/portrait_professionnel.png", role : "métier"},
    com : {tel : "0102030405", mail : "adresse_mail@exemple.com",
        reseaux : {github : "https://github.com/pseudo_github", linkedin : "lien vers votre compte linkedin"}}
    }
*/

if (typeof dicInfos != 'undefined') {
    
    const nom = document.getElementById("nom");
    const prenom = document.getElementById("prenom");
    const role = document.getElementById("role");
    const tel = document.getElementById("tel");
    const mail = document.getElementById("mail");
    const github = document.getElementById("github");
    const linkedin = document.getElementById("linkedin");
    const photo = document.getElementById("photo");

    if (nom) nom.textContent = dicInfos.identite.nom;
    if (prenom) prenom.textContent = dicInfos.identite.prenom;
    if (role) role.textContent = dicInfos.identite.role;
    if (photo) photo.src = dicInfos.identite.photo;
    if (tel) {
        tel.textContent = dicInfos.com.tel;
        tel.setAttribute("href", "tel:" + dicInfos.com.tel); }
    if (mail) {
        mail.textContent = dicInfos.com.mail;
        mail.setAttribute("href", "mailto:" + dicInfos.com.mail); }
    if (github) github.setAttribute("href", dicInfos.com.reseaux.github);
    if (linkedin) linkedin.setAttribute("href", dicInfos.com.reseaux.linkedin);
}

// bouton vCard, "Partager"

function capitaliser (mot) {
    return mot.slice(0,1).toUpperCase() + mot.slice(1).toLowerCase();
}

function genererVCard () {

    const FN = capitaliser(dicInfos.identite.prenom) + " " + capitaliser(dicInfos.identite.nom);
    const TITLE = dicInfos.identite.role;
    const TEL = dicInfos.com.tel;
    const EMAIL = dicInfos.com.mail;
    const X_SOCIALPROFILE_G = dicInfos.com.reseaux.github;
    const X_SOCIALPROFILE_L = dicInfos.com.reseaux.linkedin;

    return `BEGIN:VCARD\r\nVERSION:3.0\r\nFN:${FN}\r\nTITLE:${TITLE}\r\nTEL;TYPE=CELL:${TEL}\r\nEMAIL:${EMAIL}\r\nX-SOCIALPROFILE;TYPE=GitHub:${X_SOCIALPROFILE_G}\r\nX-SOCIALPROFILE;TYPE=LinkedIn:${X_SOCIALPROFILE_L}\r\nEND:VCARD`;
}

function genererBlobVCard() {

    const vcardTexte = genererVCard();
    const blob = new Blob([vcardTexte], { type: 'text/vcard;charset=utf-8;' });

    return blob;
}

const boutonAjout = document.getElementById('ajouter');

boutonAjout.addEventListener('click', function() {
    const blob = genererBlobVCard();
    
    const urlBlob = URL.createObjectURL(blob);
    
    const lienTemporaire = document.createElement('a');
    lienTemporaire.href = urlBlob;
    lienTemporaire.download = `contact.vcf`;
    
    document.body.appendChild(lienTemporaire);
    lienTemporaire.click();
    
    document.body.removeChild(lienTemporaire);
    URL.revokeObjectURL(urlBlob);
});

// Bouton partager via l'API Navigator.share


async function partagerCarte() {
    const nomContact = capitaliser(dicInfos.identite.prenom) + " " + capitaliser(dicInfos.identite.nom);
    const lien = window.location.href;

    /** Il se peut que la carte ne soit pas communicable directement à causes des restrictions de certaines applications 
     comme Firefox PC ou les navigateur in app*/
    const copieSecours = function() {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(lien)
                .then( function() {
                    alert("Le partage direct est impossible. Le lien de la carte a été copié !");
                })
                .catch( function() {
                    alert(`Impossible de copier automatiquement. Voici le lien : ${lien}`);
                });
        } else {
            alert(`Voici le lien à copier : ${lien}`);
        }
    };

    if (navigator.share) {
        try {
            await navigator.share({
                title: `Carte de visite de ${nomContact}`,
                text: "Voici ma carte de visite digitale",
                url: lien
            });
        } catch (error) {
            if (error.name !== "AbortError") {
                console.error("Erreur lors du partage :", error);
                copieSecours();
            }
        }
    } else {
        copieSecours();
    }
}

const partager = document.getElementById("partager");
partager.addEventListener("click", function(){partagerCarte()});