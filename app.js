const notificationSound =
document.getElementById(
"notificationSound"
);

const chat =
document.getElementById(
"chat"
);

const typing =
document.getElementById(
"typing"
);

function playNotification(){

    if(!notificationSound) return;

    notificationSound.currentTime = 0;

    notificationSound.volume = 0.5;

    notificationSound.play()
    .catch(err=>{
        console.log(
        "Audio bloqueado:",
        err
        );
    });

}

function scrollBottom(){

chat.scrollTop =
chat.scrollHeight;

}

function typingOn(){

gsap.to(
typing,
{
opacity:1,
duration:.3
}
);

}

function typingOff(){

gsap.to(
typing,
{
opacity:0,
duration:.3
}
);

}

function addMessage(
type,
text,
time,
checks=false
){

const bubble =
document.createElement("div");

bubble.className =
"message " + type;

let checkHtml = "";

if(checks){

checkHtml =
`<span class="checks">✓✓</span>`;

}

bubble.innerHTML =

`
<div class="text">
${text}
</div>

<div class="meta">
${time}
${checkHtml}
</div>
`;

chat.appendChild(
bubble
);

gsap.from(
bubble,
{
y:40,
opacity:0,
duration:.5
}
);

scrollBottom();

}

// ----------

setTimeout(()=>{

playNotification();

addMessage(
"incoming",
"Hola 👋",
"20:58"
);

},500);

// ----------

setTimeout(()=>{

playNotification();

addMessage(
"incoming",
"Llego a las 21:00",
"20:58"
);

},2200);

// ----------

setTimeout(()=>{

typingOn();

},3200);

// ----------

setTimeout(()=>{

typingOff();

playNotification();

addMessage(
"outgoing",
"Perfecto 👍",
"20:59",
true
);

},4800);

// ----------

setTimeout(()=>{

typingOn();

},6000);

// ----------

setTimeout(()=>{

typingOff();

playNotification();

addMessage(
"outgoing",
"Déjame revisar beneficios",
"20:59",
true
);

},7600);

// ----------

setTimeout(()=>{

addMessage(
"incoming",

`
<div class="business-card">

<div class="business-title">
🅿 Parking Premium
</div>

<div class="business-detail">
Sector P3 · Terminal Internacional
</div>

<div class="business-detail">
✅ Reserva Exitosa
</div>

</div>
`,

"21:00"
);

},9800);

// ----------

setTimeout(()=>{

addMessage(	
"outgoing",
"Excelente 👌",
"21:00",
true
);

},12000);

// ----------

setTimeout(()=>{

addMessage(
"incoming",

`
<div class="business-card">

<div class="business-title">
🍽 Restaurant Internacional
</div>

<div class="business-detail">
Mesa para 2 personas
</div>

<div class="business-detail">
✅ Confirmada 20:30
</div>

</div>
`,

"21:00"
);

},14500);

// ----------

setTimeout(()=>{
addMessage(
"incoming",

`
<div class="business-card">

<div class="business-title">
🎁 Duty Free
</div>

<div class="business-detail">
Regalo comprado
</div>

<div class="business-detail">
✅ 15% OFF aplicado
</div>

</div>
`,

"21:01"
);

},17000);

// ----------

setTimeout(()=>{

addMessage(
"incoming",
"✅ Todo listo para recibir a tu pasajero",
"21:01"
);

},19500);

// ----------

setTimeout(()=>{

typingOn();

},21500);

// ----------

setTimeout(()=>{

typingOff();

addMessage(
"incoming",
"✈ Tu pasajero acaba de aterrizar",
"21:01"
);

},23000);

// ---------------------
// TRANSICIÓN SAAS FINAL
// ---------------------

setTimeout(()=>{

typing.style.display = "none";

gsap.to(".phone",{

    scale:1.4,

    opacity:0,

    filter:"blur(20px)",

    rotationX:-8,

    y:-80,

    duration:1.6,

    ease:"power4.out"

});

const scene =
document.createElement("div");

scene.id = "saas-scene";

scene.innerHTML =

`
<div id="slide1" class="saas-slide">

    <div class="saas-number">
        26,5 millones
    </div>

    <div class="saas-subtitle">
        de pasajeros
    </div>

</div>

<div id="slide2" class="saas-slide">

    <div class="saas-word">
        Retail
    </div>

    <div class="saas-word">
        Gastronomía
    </div>

    <div class="saas-word">
        Parking
    </div>

    <div class="saas-word">
        Experiencias
    </div>

</div>

<div id="slide3" class="saas-slide">

    <div class="saas-message">
        Todo conectado.
    </div>

</div>

<div id="slide4" class="saas-slide">

    <div class="saas-logo">
        Club Beneficios
    </div>

    <div class="saas-logo-sub">
        Aeropuerto Santiago
    </div>

</div>
`;

document.body.appendChild(scene);

gsap.to(scene,{
    opacity:1,
    duration:1
});

const tl = gsap.timeline({
    delay:1
});

tl

.fromTo("#slide1",{

    opacity:0,

    scale:.4,

    y:120,

    filter:"blur(25px)"

},{
    opacity:1,

    scale:1,

    y:0,

    filter:"blur(0px)",

    duration:1.4,

    ease:"power4.out"

})

.to("#slide1",{

    opacity:0,

    scale:1.25,

    y:-60,

    filter:"blur(20px)",

    duration:1

},"+=1.5")

.to("#slide2",{
    opacity:1,
    duration:1
})

.call(()=>{

gsap.from(".saas-word",{

    opacity:0,

    y:40,

    stagger:.4,

    duration:.8,

    ease:"power3.out"

});

})

.to("#slide2",{
    opacity:0,
    y:-50,
    duration:.8
},"+=2")

.to("#slide3",{
    opacity:1,
    duration:1
})

.to("#slide3",{
    opacity:0,
    y:-50,
    duration:.8
},"+=2")

.to("#slide4",{
    opacity:1,
    duration:1.2
});

},27000);
