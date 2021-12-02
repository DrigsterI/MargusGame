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
function MuteButton () {
document.getElementById("bgvid").muted = false;
document.getElementById('muteicon').classList.remove('fa-volume-mute');
document.getElementById("muteicon").classList.add('fa-volume-up');
document.getElementById("muteicon").onclick=function(){
document.getElementById("bgvid").muted = true;
document.getElementById('muteicon').classList.remove('fa-volume-up');
document.getElementById("muteicon").classList.add('fa-volume-mute');
document.getElementById("muteicon").onclick=function(){
return MuteButton();
    }
  }
}