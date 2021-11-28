function StartGame() {
  document.getElementById('StartButton').style.visibility = 'hidden';
  document.getElementById('SecondButton').style.visibility = 'hidden';
  document.getElementById('ThirdButton').style.visibility = 'hidden';
  document.getElementById('game').style.visibility = 'visible';
  document.getElementById('game').style.width = "100%";
  document.getElementById('BackToMenuButton').style.visibility = 'visible';
  Start();
}
function BackToMenu() {
  document.getElementById('StartButton').style.visibility = 'visible';
  document.getElementById('SecondButton').style.visibility = 'visible';
  document.getElementById('ThirdButton').style.visibility = 'visible';
  document.getElementById('game').style.visibility = 'hidden';
  document.getElementById('game').style.width = "60%";
  document.getElementById('BackToMenuButton').style.visibility = 'hidden';
}