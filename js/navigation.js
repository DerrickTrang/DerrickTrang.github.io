var homeURL = "/index.html";
var projectsURL = "/projects.html";

document.getElementById("navbar-home").addEventListener("click", function() {    
    history.pushState({ urlPath: homeURL}, "", homeURL);
    loadContent(homeURL);
});

document.getElementById("navbar-projects").addEventListener("click", function() {
    history.pushState({ urlPath: projectsURL}, "", projectsURL);
    loadContent(projectsURL);
});

function loadContent(url) {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if(request.readyState == 4) {

            // Retrieve and store response
            var resp = document.createElement("html");
            resp.innerHTML = request.responseText;

            // Disable existing stylesheets from current page
            var style = document.styleSheets
            for (i = 0; i < style.length; i++) {
                style[i].disabled = true;
            }

            // Remove existing stylesheets from current page
            var styleElements = document.getElementsByTagName("link");
            for (i = 0; i < styleElements.length; i++) {
                var parent = styleElements[i].parentNode;
                parent.removeChild(styleElements[i]);
            }

            // Add stylesheets from response to current page head (may be a better way to handle all this?)
            var currentHead = document.getElementsByTagName('head')[0];            
            var responseCSS = resp.getElementsByTagName('link')
            for (i = 0; i < this.responseCSS.length; i++) {
                currentHead.appendChild(responseCSS[i]);
            }

            // Replace current page body content with response body content
            document.getElementById("body-content").innerHTML = resp.getElementById("body-content").innerHTML;            
        }        
    }

    console.log("URL: " + url)
    request.open("GET", url);
    request.send();
}

window.onload = function() {
    // Fade body content in when in changes
    document.getElementById("body-content").className = "contentloaded";

    // Fade entire page in once loaded
    document.getElementsByClassName("overlay")[0].style.opacity = 0;    
}

window.onpopstate = function(event) {
    if(event.state) {
        loadContent(location.pathname.replace(/^.*[\\/]/, ""));
    }    
}