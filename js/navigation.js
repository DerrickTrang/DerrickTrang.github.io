var homeURL = "/index.html";
var projectsURL = "/projects.html";
var debugHomeURL = "../DerrickTrang.github.io/index2.html";
var debugProjectsURL = "../DerrickTrang.github.io/projects2.html";

document.getElementById("navbar-home").addEventListener("click", function() {
    console.log("home link clicked");
    
    if ((window.location.href).substring(0, 4) == "file") {
        history.pushState({urlPath: homeURL}, "", "#/index2.html"); // for debugging purposes
        loadContent(debugHomeURL);
    } else {
        history.pushState({ urlPath: homeURL}, "", homeURL);
        loadContent(homeURL);
    }
});

document.getElementById("navbar-projects").addEventListener("click", function() {
    console.log("project link clicked");
    
    if ((window.location.href).substring(0, 4) == "file") {
        history.pushState({urlPath: projectsURL}, "", "#/projects.html"); // for debugging purposes
        loadContent(debugProjectsURL);
    } else {
        history.pushState({ urlPath: projectsURL}, "", projectsURL);
        loadContent(projectsURL);
    }
});

function loadContent(url) {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if(request.readyState == 4) {
            console.log("response received");
            document.open();
            document.write(request.responseText);
            document.close();
        }        
    }

    console.log("URL: " + url)
    request.open("GET", url);
    request.send();
}

window.onload = function() {
    document.getElementById("body-content").className = "contentloaded";
}