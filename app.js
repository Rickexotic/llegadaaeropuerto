const tl = gsap.timeline();

const progress =
document.querySelector(".progress-fill");

const title =
document.querySelector(".card-title");

const status =
document.querySelector(".card-status");

function setProgress(value){

    progress.style.width =
    value + "%";

}

tl

.fromTo(
".notification",
{
    y:-80,
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
    duration:1
}
)

.to(
".action-card",
{
    opacity:1,
    duration:.8
}
)

.call(()=>{

    title.innerHTML =
    "🅿 Parking Premium";

    status.innerHTML =
    "Reservando...";

    setProgress(20);

})

.to({}, {duration:2})

.call(()=>{

    status.innerHTML =
    "✅ Confirmado";

    setProgress(35);

})

.to({}, {duration:1.5})

.call(()=>{

    title.innerHTML =
    "🍽 Restaurant";

    status.innerHTML =
    "Reservando mesa...";

    setProgress(60);

})

.to({}, {duration:2})

.call(()=>{

    status.innerHTML =
    "✅ Mesa Confirmada";

    setProgress(75);

})

.to({}, {duration:1.5})

.call(()=>{

    title.innerHTML =
    "🎁 Duty Free";

    status.innerHTML =
    "Aplicando 15% OFF";

    setProgress(90);

})

.to({}, {duration:2})

.call(()=>{

    status.innerHTML =
    "✅ Regalo Comprado";

    setProgress(100);

})

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

.to(
".closing",
{
    opacity:1,
    duration:1.5
}
);
