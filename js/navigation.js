const homeURL = "/";
const projectsURL = "/projects.html";

const loadContent = async (url) => {

    // Retrieve and store content
    const resp = await fetch(url);
    const data = await resp.text();
    const respDoc = document.implementation.createHTMLDocument();
    respDoc.body.innerHTML = data;

    // Fade out existing content (fade out handled by css)
    const body = document.getElementById('body-content');
    body.style.opacity = 0;
    setTimeout(() => {

        // Replace current page body title/content with response body title/content
        document.title = respDoc.getElementsByTagName("title")[0].innerHTML;
        body.innerHTML = respDoc.getElementById("body-content").innerHTML;

        // Remove scripts
        let oldScripts = document.getElementsByTagName("script");
        for(let i of Array.from(oldScripts)) {
            let script = document.getElementById(i.id);
            document.body.removeChild(script);
        }

        // Re-add scripts (which re-runs them)
        let newScripts = respDoc.getElementsByTagName("script");
        for(let i of Array.from(newScripts)) {

            // Don't re-run navbar script since we're not replacing that content
            if(i.id === "nav-script") continue;

            let newScript = document.createElement('script')
            newScript.src = i.src;
            newScript.id = i.id;
            document.body.appendChild(newScript);
        }

        // Fade in new content (fade handled by css)
        body.style.opacity = 100;

    }, 150);

    // Highlight navbar button for selected page
    const navButtons = document.getElementsByClassName("navbar-button-selected");
    for(let button of navButtons) {
        button.classList.remove("navbar-button-selected");
    }

    if(url === homeURL) {
        document.getElementById("navbar-home").classList.add("navbar-button-selected");
    } else if(url === projectsURL) {
        document.getElementById("navbar-projects").classList.add("navbar-button-selected");
    }
}

document.getElementById("navbar-home").addEventListener("click", () => {
    const currentPath = "/" + location.pathname.replace(/^.*[\\/]/, "");
    if(currentPath !== homeURL) {
        history.pushState({ urlPath: homeURL}, "", homeURL);
        loadContent(homeURL);
    }
});

document.getElementById("navbar-projects").addEventListener("click", () => {
    const currentPath = "/" + location.pathname.replace(/^.*[\\/]/, "");
    if(currentPath !== projectsURL) {
        history.pushState({ urlPath: projectsURL}, "", projectsURL);
        loadContent(projectsURL);
    }
});

window.onpopstate = () => {
    let path = location.pathname.replace(/^.*[\\/]/, "");
    loadContent(path);
}

window.onload = () => {
    // Fade entire page in once loaded by turning overlay off
    document.querySelector('.overlay-on').className = "overlay-off";
}