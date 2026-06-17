// fonctionnement du toggle

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

function ecouterChangementOS(e) {
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

changerTheme();

toggle.addEventListener("change", darkMode);

mediaQueryOS.addEventListener("change", ecouterChangementOS);

/*
Ce bloque a pour objectif de modifier par programmation les éléments HTML
afin de ne pas afficher d'information en claire. Vous pouvez soit le
supprimer et modifier manuellement le HTML ;
soit créer un dictionnaire comme celui-ci dans un fichier config.js à la
racine du dossier carte_de_visite_digitale :

const dicInfos = {
    identite : {nom : "Nom", photo : "img/portrait_professionnel.png", role : "métier"},
    com : {tel_txt : "01 02 03 04 05", tel_href : "tel:+330102030405", mail_txt : "adresse_mail", mail_href : "mailto:adresse_mail",
        reseaux : {github : "https://github.com/pseudo_github", linkedin : "lien vers votre compte linkedin"}}
    }
*/

if (typeof dicInfos != 'undefined') {
    
    const nom = document.getElementById("nom");
    const role = document.getElementById("role");
    const tel = document.getElementById("tel");
    const mail = document.getElementById("mail");
    const github = document.getElementById("github");
    const linkedin = document.getElementById("linkedin");
    const photo = document.getElementById("photo");

    if (nom) nom.textContent = dicInfos.identite.nom;
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
