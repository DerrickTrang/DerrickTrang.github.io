// Initialize
var blnLightOn = false;
var intToggleCount = 0;
var lightbulbPic = document.getElementById("lightbulb");
var alertText = document.getElementById("burntOutAlert");

lightbulbPic.addEventListener("click", lightSwitch);

// Functions
function lightSwitch() {
    // Turn the light on/off
    if (intToggleCount < 20 && blnLightOn == false) {
        this.innerHTML = '<img src="img/lightbulb_on.png"/>';
    }
    else {
        this.innerHTML = '<img src="img/lightbulb_off.png"/>';
    }
        
    // Toggle light switch value
    blnLightOn = !blnLightOn;
    
    // Display messages when count exceeds a threshold
    intToggleCount++;
    if (intToggleCount == 5) alertText.innerHTML = "Don't you have something better to do?";
    if (intToggleCount == 10) alertText.innerHTML = "Okay that's enough...";
    if (intToggleCount == 15) alertText.innerHTML = "Really...that's enough...";
    if (intToggleCount == 20) alertText.innerHTML = "<b>You burnt out the bulb.</b><br><button type='button' onclick=reset()>Click here to change the bulb.</button>"; // HTML onclick test
}

function reset() {
    blnLightOn = false;
    intToggleCount = 0;
    alertText.innerHTML = "";
}