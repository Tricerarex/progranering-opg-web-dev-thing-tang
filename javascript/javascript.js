
let root = document.documentElement;



function nav_meny(){

}


function mode_controle(){
    var body = document.body;
    var icon = document.getElementById("mode");
    icon.classList.toggle("mode-dark");
    icon.classList.toggle("mode-light");
    body.classList.toggle("light-mode");
}

window.addEventListener('keydown', function(e) {
    if(e.keyCode == 32 && e.target == document.body) {
      e.preventDefault();
    }
  });