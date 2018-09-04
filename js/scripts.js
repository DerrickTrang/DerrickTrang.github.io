console.log("scripts.js executing...");

function loadFunction() {
    console.log("load function called");
    var link = document.querySelector('link[rel="import"]');
    var content = link.import;

    var el = content.querySelector('.navbar');
    document.getElementById("nav-placeholder").appendChild(el.cloneNode(true));
}