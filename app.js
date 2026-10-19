const screens = {

chat:
document.getElementById("chat"),

dashboard:
document.getElementById("dashboard"),

summary:
document.getElementById("summary"),

closing:
document.getElementById("closing")

};

function showScreen(screen){

document
.querySelectorAll(".screen")
.forEach(s=>s.classList.remove("active"));

screen.classList.add("active");

}

// respuesta whatsapp

setTimeout(()=>{

document
.querySelector(".outgoing")
.classList.remove("hidden");

},2000);

// abrir app

setTimeout(()=>{

showScreen(
screens.dashboard
);

animateCards();

},5000);

function animateCards(){

const cards =
document.querySelectorAll(".card");

cards.forEach((card,index)=>{

setTimeout(()=>{

card.style.opacity=1;

card.style.transform=
"translateX(0px)";

},index*800);

});

}

// resumen

setTimeout(()=>{

showScreen(
screens.summary
);

},15000);

// cierre

setTimeout(()=>{

showScreen(
screens.closing
);

},21000);
