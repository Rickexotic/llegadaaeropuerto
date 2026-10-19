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

// ----------

function showScreen(screen){

document
.querySelectorAll(".screen")
.forEach(s =>
s.classList.remove("active")
);

screen.classList.add("active");

}

// ----------

function showMessage(selector){

const message =
document.querySelector(selector);

message.classList.add("show");

}

// ----------

function showCard(selector){

const card =
document.querySelector(selector);

card.classList.add("show");

}

// ----------

function confirmCard(selector){

const card =
document.querySelector(selector);

card.classList.add("confirmed");

card.innerHTML =
"✓ " + card.innerHTML;

}

// ----------
// INICIO
// ----------

showMessage(".incoming");

// ----------
// RESPUESTA
// ----------

setTimeout(()=>{

showMessage(".outgoing");

},2000);

// ----------
// APP
// ----------

setTimeout(()=>{

showScreen(
screens.dashboard
);

},4500);

// ----------
// PARKING
// ----------

setTimeout(()=>{

showCard(".parking");

},5500);

setTimeout(()=>{

confirmCard(".parking");

},7500);

// ----------
// RESTAURANTE
// ----------

setTimeout(()=>{

showCard(".restaurant");

},9000);

setTimeout(()=>{

confirmCard(".restaurant");

},11000);

// ----------
// REGALO
// ----------

setTimeout(()=>{

showCard(".gift");

},12500);

setTimeout(()=>{

confirmCard(".gift");

},14500);

// ----------
// RESUMEN
// ----------

setTimeout(()=>{

showScreen(
screens.summary
);

},18000);

// ----------
// CIERRE
// ----------

setTimeout(()=>{

showScreen(
screens.closing
);

},22000);

// ----------
// PHONE 3D
// ----------

const phone =
document.querySelector(".phone");

window.addEventListener(
"mousemove",
e=>{

const x =
(e.clientX /
window.innerWidth -.5) * 8;

const y =
(e.clientY /
window.innerHeight -.5) * 8;

phone.style.transform =
`
translateY(-6px)
rotateY(${x}deg)
rotateX(${-y}deg)
`;

});
