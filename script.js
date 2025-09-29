const displayCode = document.querySelector("#code");
const speedValue = document.querySelector("#speedLabel");
const displaySpeed = document.querySelector(".speed-display");
const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");
const displayStatus = document.querySelector("#status");
const colorBox = document.querySelector("#code");

const speeds = {
  1: { ms: 2000, name: "Very Slow" },
  2: { ms: 1600, name: "Slow" },
  3: { ms: 1300, name: "Medium-Slow" },
  4: { ms: 1000, name: "Medium" },
  5: { ms: 800, name: "Normal" },
  6: { ms: 600, name: "Medium-Fast" },
  7: { ms: 400, name: "Fast" },
  8: { ms: 250, name: "Very-Fast" },
  9: { ms: 150, name: "Ultra-Fast" },
  10: { ms: 100, name: "Lightning" },
};
let currentSpeed = 800;
let intervalId;

//generates Random Colors
function randomColors() {
  const hexCode = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    let randomHexCode = Math.floor(Math.random() * 16);
    color += hexCode[randomHexCode];
  }
  return color;
}

function changeBodyBgColor(){
    let colorCode = randomColors();
    document.body.style.backgroundColor = colorCode;
    displayCode.textContent = colorCode;    
}


function displayActiveStatus(){
    displayStatus.id = "active";
    displayStatus.textContent = "Status : Active"
}

function displayStoppedStatus(){
    displayStatus.id = "stopped";
    displayStatus.textContent = "Status : Stopped";
}

startButton.addEventListener("click", () => {

   if(!intervalId){
    intervalId = setInterval(changeBodyBgColor,currentSpeed);
    startButton.disabled = true;
    stopButton.disabled = false;
   }

    displayActiveStatus();
});

stopButton.addEventListener('click', ()=>{
    clearInterval(intervalId);
    intervalId = null;
    startButton.disabled = false;
    stopButton.disabled = true;
    displayStoppedStatus();
})

  speedValue.addEventListener('input', (event)=>{
        let speedMS = event.target.value;
        currentSpeed = speeds[speedMS].ms
        displaySpeed.textContent = "Speed :" + speeds[speedMS].name

        if(intervalId){
            clearInterval(intervalId);
            intervalId = setInterval(changeBodyBgColor,currentSpeed);
        }
});

//block to copy color code
colorBox.addEventListener('click', () =>{
    const colorText = colorBox.textContent;

    //copy to clipboard
    navigator.clipboard.writeText(colorText).then( () => {
        colorBox.classList.add("copy");
        colorBox.textContent = "Copied!";
        setTimeout(() => {
            colorBox.classList.remove("copy");
            colorBox.textContent = colorText;
        }, 1000);
    }).catch( (err) =>{
        console.log("Failed To Copy Color: ",err);
        colorBox.textContent = "Failed!";
    })
})

window.addEventListener('load', ()=>{
    displayStoppedStatus();
    stopButton.disabled = true;
})




