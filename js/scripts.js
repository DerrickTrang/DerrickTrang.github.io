console.log("scripts.js executing...");

function loadNavbar() {
    console.log("Load navbar function call start");
    var link = document.querySelector('link[rel="import"]');
    var content = link.import;

    var el = content.querySelector('.navbar');
    document.getElementById("nav-placeholder").appendChild(el.cloneNode(true));
    console.log("Load navbar function call end");
}