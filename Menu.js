function StartGame() {
  document.getElementById('firstsection').style.display = "none";
  document.getElementById('secondsection').style.display = "block";
  document.body.style.backgroundColor = "white";
  document.getElementById("secondsection").style.border = "4px solid red";
  document.getElementById('thirdsection').style.display = "none";
  document.getElementById('invisiblebutton').style.display = "none";
  Start();
}
function BackToMenu() {
  document.getElementById('firstsection').style.display = "block";
  document.getElementById('secondsection').style.display = "none";
  document.body.style.backgroundColor = "white";
  document.getElementById("secondsection").style.border = "none";
  Stop();
}
function settings(){
  document.getElementById('thirdsection').style.display = "block";
  document.getElementById('invisiblebutton').style.display = "block";
}
function settingsof(){
  document.getElementById('thirdsection').style.display = "none";
  document.getElementById('invisiblebutton').style.display = "none";
}
function Shop(){
  document.getElementById('shop').style.display = "block";
}
function ShopOff(){
   document.getElementById('shop').style.display = "none";
}