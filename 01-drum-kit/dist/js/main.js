//Event Listeners
window.addEventListener("keydown", playSound);

//Selecting all key classes and listening transitions
const keys = document.querySelectorAll(".key");
keys.forEach(key => key.addEventListener("transitionend", removeTransition));

//Functions required for event listeners

function removeTransition(e) {
  if (e.propertyName !== "transform") return; //skip if its not a transform
  this.classList.remove("playing");
}

function playSound(e) {
  const audio = document.querySelector(`audio[data-key = "${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key = "${e.keyCode}"]`);

  key.classList.add("playing");

  if (!audio) return;
  audio.currentTime = 0; //Rewind to the start
  audio.play();
}
