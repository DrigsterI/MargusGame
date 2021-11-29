function StartGame() {
  document.getElementById('firstsection').style.display = "none";
  document.getElementById('secondsection').style.display = "block";
  document.body.style.backgroundColor = "white";
  document.getElementById("secondsection").style.border = "4px solid red";
  Start();
}
function BackToMenu() {
  document.getElementById('firstsection').style.display = "block";
  document.getElementById('secondsection').style.display = "none";
  document.body.style.backgroundColor = "white";
  document.getElementById("secondsection").style.border = "none";
  Stop();
}