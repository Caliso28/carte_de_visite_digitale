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