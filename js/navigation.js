var homeURL = "/index.html";
var projectsURL = "/projects.html";

function loadContent(url){
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if(request.readyState == 4) {
            console.log("Response received: " + request.responseText.substring(0, 10));

            // Retrieve and store response
            var resp = document.implementation.createHTMLDocument();
            resp.body.innerHTML = request.responseText;

            console.log("Response stored: " + resp.body.innerHTML.substring(0, 10));            

            /*
            // Disable existing stylesheets from current page
            var style = document.styleSheets;
            console.log("Stylesheet length: " + style.length);
            for (i = 0; i < style.length; i++) {
                style[i].disabled = true;
            }

            // Remove existing stylesheets from current page
            var styleElements = document.getElementsByTagName("link");
            console.log("Stylesheetelements length: " + styleElements.length);
            for (i = 0; i < styleElements.length; i++) {
                var parent = styleElements[i].parentNode;
                parent.removeChild(styleElements[i]);
            }
            */

            // Add stylesheets from response to current page head (may be a better way to handle all this?)
            var currentHead = document.getElementsByTagName('head')[0];            
            var responseLinks = resp.getElementsByTagName('link');
            console.log("responseLinks length: " + responseLinks.length);
            for (i = 0; i < responseLinks.length; i++) {
                console.log("Response link: " + i);
                currentHead.appendChild(responseLinks[i]);
            }

            // Fade out existing stuff with jquery
            jQuery("#body-content").fadeOut(200, function() {
                // Replace current page body title/content with response body title/content            
                document.title = resp.getElementsByTagName("title")[0].innerHTML;
                
                document.getElementById("body-content").innerHTML = resp.getElementById("body-content").innerHTML;                         

                // Fade new stuff in
                jQuery("#body-content").fadeIn(200, null);
            });
        }        
    }

    console.log("URL: " + url);
    request.open("GET", url);
    request.send();
}

document.getElementById("navbar-home").addEventListener("click", function() {    
    history.pushState({ urlPath: homeURL}, "", homeURL);
    loadContent(homeURL);
});

document.getElementById("navbar-projects").addEventListener("click", function() {
    history.pushState({ urlPath: projectsURL}, "", projectsURL);
    loadContent(projectsURL);    
});

window.onload = function() {
    // Fade entire page in once loaded by hiding overlay div
    //document.getElementsByClassName("overlay")[0].style.opacity = 0;    

    jQuery(".overlay").fadeOut(500, null);
}

window.onpopstate = function(event) {
    if(event.state) {
        loadContent(location.pathname.replace(/^.*[\\/]/, ""));
    }    
}