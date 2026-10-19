const progress =
document.querySelector(".progress-fill");

const title =
document.querySelector(".card-title");

const status =
document.querySelector(".card-status");

function updateProgress(value){

progress.style.width =
value + "%";

}

const tl =
gsap.timeline();

// WhatsApp

tl.fromTo(
".notification",
{
y:-100,
opacity:0
},
{
y:0,
opacity:1,
duration:1
}
)

.fromTo(
".reply",
{
y:20,
opacity:0
},
{
y:0,
opacity:1,
duration:.8
},
"+=1"
)

// Transformación

.to(
".notification",
{
scale:.85,
opacity:.3,
duration:.8
},
"+=1"
)

.to(
".reply",
{
scale:.85,
opacity:.3,
duration:.8
},
"<"
)

.to(
".app-badge",
{
opacity:1,
duration:.8
}
)

.to(
".action-card",
{
opacity:1,
duration:.8
}
)

// Parking

.call(()=>{

title.innerHTML =
"🅿 Parking Premium";

status.innerHTML =
"Reservando...";

updateProgress(25);

})

.to({}, {duration:2})

.call(()=>{

status.innerHTML =
"✅ Confirmado";

updateProgress(35);

})

// Restaurante

.to({}, {duration:1.2})

.call(()=>{

title.innerHTML =
"🍽 Restaurant";

status.innerHTML =
"Reservando mesa...";

updateProgress(65);

})

.to({}, {duration:2})

.call(()=>{

status.innerHTML =
"✅ Mesa Confirmada";

updateProgress(75);

})

// Gift

.to({}, {duration:1.2})

.call(()=>{

title.innerHTML =
"🎁 Duty Free";

status.innerHTML =
"Aplicando 15% OFF";

updateProgress(90);

})

.to({}, {duration:2})

.call(()=>{

status.innerHTML =
"✅ Regalo Comprado";

updateProgress(100);

})

// Resumen

.to(
".action-card",
{
opacity:0,
duration:.8
}
)

.to(
".stack",
{
opacity:1,
duration:1
}
)

.to(
".stack",
{
opacity:0,
duration:1
},
"+=2"
)

// Final

.to(
".closing",
{
opacity:1,
duration:1.5
}
);
