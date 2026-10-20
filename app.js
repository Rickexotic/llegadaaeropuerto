const notificationSound =
document.getElementById(
"notificationSound"
);

let audioUnlocked = false;

function unlockAudio(){

    if(audioUnlocked || !notificationSound) return;

    notificationSound.volume = 0.5;

    notificationSound.play()
    .then(()=>{
        notificationSound.pause();
        notificationSound.currentTime = 0;
        audioUnlocked = true;
    })
    .catch(()=>{
        // Se intentará nuevamente con la próxima interacción
    });

}

document.addEventListener("click", unlockAudio, { once:true });
document.addEventListener("touchstart", unlockAudio, { once:true });

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
    if(!audioUnlocked) return;

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
// TRANSICIÓN SAAS FINAL (AE STYLE)
// ---------------------

function splitChars(selector){
    const el = document.querySelector(selector);
    if(!el) return [];
    const text = el.textContent.trim();
    el.textContent = "";
    return [...text].map(ch=>{
        const span = document.createElement("span");
        span.className = "char";
        span.textContent = ch === " " ? "\u00A0" : ch;
        el.appendChild(span);
        return span;
    });
}

setTimeout(()=>{

    typing.style.display = "none";

    gsap.to(".phone",{
        scale:1.25,
        opacity:0,
        filter:"blur(22px)",
        rotationX:-10,
        y:-90,
        duration:1.4,
        ease:"power4.inOut"
    });

    const scene = document.createElement("div");
    scene.id = "saas-scene";

    scene.innerHTML = `
    <div class="bg-orb orb-1"></div>
    <div class="bg-orb orb-2"></div>
    <div class="noise"></div>

    <div id="slide1" class="saas-slide">
        <div class="saas-number gradient-text">26,5 millones</div>
        <div class="saas-subtitle">de pasajeros</div>
    </div>

    <div id="slide2" class="saas-slide">
        <div class="saas-word">Retail</div>
        <div class="saas-word">Gastronomía</div>
        <div class="saas-word">Parking</div>
        <div class="saas-word">Experiencias</div>
    </div>

    <div id="slide3" class="saas-slide">
        <div class="saas-message gradient-text" id="connectedText">Todo conectado.</div>
        <div class="shine"></div>
    </div>

    <div id="slide4" class="saas-slide">
        <div class="saas-logo gradient-text" id="logoMain">Club Beneficios</div>
        <div class="saas-logo-sub">Aeropuerto Santiago</div>
    </div>
    `;

    document.body.appendChild(scene);

    const connectedChars = splitChars("#connectedText");
    const logoChars = splitChars("#logoMain");

    gsap.set("#saas-scene",{opacity:0});
    gsap.to("#saas-scene",{opacity:1,duration:.8});

    gsap.to(".orb-1",{
        x:80,y:-50,repeat:-1,yoyo:true,duration:6,ease:"sine.inOut"
    });
    gsap.to(".orb-2",{
        x:-70,y:40,repeat:-1,yoyo:true,duration:7,ease:"sine.inOut"
    });

    const tl = gsap.timeline({delay:.7});

    tl.fromTo("#slide1",
    {
        opacity:0, scale:.55, y:100, filter:"blur(16px)"
    },
    {
        opacity:1, scale:1, y:0, filter:"blur(0px)",
        duration:1.2, ease:"power4.out"
    })
    .fromTo(".saas-number",
    {letterSpacing:"0.25em", opacity:.6},
    {letterSpacing:"0.02em", opacity:1, duration:.9, ease:"power3.out"},
    "<0.1")
    .to("#slide1",
    {
        opacity:0, scale:1.15, y:-40, filter:"blur(14px)",
        duration:.9, ease:"power3.in"
    },"+=1.2")

    .fromTo("#slide2",
    {opacity:0},
    {opacity:1,duration:.5})
    .from(".saas-word",
    {
        opacity:0, y:28, filter:"blur(8px)",
        stagger:.16, duration:.65, ease:"power3.out"
    },"<")
    .to(".saas-word",
    {
        y:-18, opacity:0, filter:"blur(8px)",
        stagger:.08, duration:.45, ease:"power2.in"
    },"+=1.2")
    .to("#slide2",{opacity:0,duration:.25},"<")

    .fromTo("#slide3",
    {opacity:0, y:20},
    {opacity:1, y:0, duration:.5, ease:"power2.out"})
    .from(connectedChars,
    {
        opacity:0, y:22, rotateX:-90, transformOrigin:"50% 50% -10",
        stagger:.03, duration:.55, ease:"back.out(2)"
    },"<")
    .fromTo(".shine",
    {x:"-120%"},
    {x:"120%", duration:1.1, ease:"power2.inOut"},
    "+=.1")
    .to("#slide3",
    {opacity:0, y:-26, filter:"blur(8px)", duration:.6, ease:"power2.in"},
    "+=1.0")

    .fromTo("#slide4",
    {opacity:0, scale:.92, filter:"blur(10px)"},
    {opacity:1, scale:1, filter:"blur(0px)", duration:.9, ease:"power3.out"})
    .from(logoChars,
    {
        opacity:0, y:16, stagger:.025, duration:.45, ease:"power2.out"
    },"<.05")
    .from(".saas-logo-sub",
    {opacity:0, y:14, duration:.5},
    "<.15");

},27000);
