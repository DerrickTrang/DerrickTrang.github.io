


var x = "test";
var y = "clicked again";
var helloText = document.getElementById("hello-tag");
//helloText.addEventListener("click", functio);


function functio() {
    alert("you clicked!");
    if (this.innerHTML === x) {
        this.innerHTML = y;
    }
    else {
        this.innerHTML = x;
    }
    

}

function loadFunction() {
    var link = document.querySelector('link[rel="import"]');
    var content = link.import;

    var el = content.querySelector('.navbar');
    document.getElementById("nav-placeholder").appendChild(el.cloneNode(true));
}