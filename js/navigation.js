var homeURL = "/index.html";
var projectsURL = "/projects.html";

function loadContent(url){
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if(request.readyState == 4) {

            console.log("Response received: begin");
            // Retrieve and store response
            var resp = document.implementation.createHTMLDocument();
            resp.body.innerHTML = request.responseText;

            // Add stylesheets from response to current page head (may be a better way to handle all this?)
            var currentHead = document.getElementsByTagName('head')[0];                        
            var responseLinks = resp.getElementsByTagName('link');
            for (i = 0; i < responseLinks.length; i++) {
                // If stylesheet doesn't already exist, add it
                if (jQuery("link[href=\"" + responseLinks[i].getAttribute("href") + "\"]").length == 0) {
                    currentHead.appendChild(responseLinks[i]);
                }
            }

            // Fade out existing stuff with jquery
            jQuery("#body-content").fadeOut(200, function() {
                // Replace current page body title/content with response body title/content            
                document.title = resp.getElementsByTagName("title")[0].innerHTML;
                
                document.getElementById("body-content").innerHTML = resp.getElementById("body-content").innerHTML;                         

                // Fade new stuff in
                jQuery("#body-content").fadeIn(200, null);
            });

            console.log("Response received: end");
        }        
    }

    console.log("URL: " + url);
    request.open("GET", url);
    request.send();
}

document.getElementById("navbar-home").addEventListener("click", function() {    
    var currentPath = "/" + location.pathname.replace(/^.*[\\/]/, "");
    if(currentPath != homeURL && currentPath != "/") {
        history.replaceState({ urlPath: homeURL}, "", "/");
        loadContent(homeURL);
    }    
});

document.getElementById("navbar-projects").addEventListener("click", function() {
    var currentPath = "/" + location.pathname.replace(/^.*[\\/]/, "");
    if(currentPath != projectsURL) {
        history.replaceState({ urlPath: projectsURL}, "", projectsURL);
        loadContent(projectsURL);
    }
});

window.onpopstate = function(event) {
    var path = location.pathname.replace(/^.*[\\/]/, "");
    if (!path) {
        path = homeURL;
    }
    loadContent(path);
}

window.onload = function() {
    // Fade entire page in once loaded by hiding overlay div
    jQuery(".overlay").fadeOut(500, null);
}