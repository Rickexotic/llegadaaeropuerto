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
// TRANSICIÓN SAAS FINAL V2 (CINEMATIC / AE STYLE)
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

    // Salida del teléfono con look más "camera move"
    gsap.to(".phone",{
        scale:1.32,
        opacity:0,
        filter:"blur(24px)",
        rotationX:-12,
        rotationY:4,
        y:-90,
        duration:1.35,
        ease:"power4.inOut"
    });

    const scene = document.createElement("div");
    scene.id = "saas-scene";

    scene.innerHTML = `
    <div class="vignette"></div>
    <div class="bg-grid"></div>
    <div class="bg-orb orb-1"></div>
    <div class="bg-orb orb-2"></div>
    <div class="bg-orb orb-3"></div>
    <div class="noise"></div>

    <div id="slide1" class="saas-slide">
        <div class="saas-number gradient-text">26,5 millones</div>
        <div class="saas-subtitle">de pasajeros al año</div>
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
        <div class="cta-pill">Activa · Reserva · Disfruta</div>
    </div>
    `;

    document.body.appendChild(scene);

    const connectedChars = splitChars("#connectedText");
    const logoChars = splitChars("#logoMain");

    gsap.set("#saas-scene",{opacity:0});
    gsap.to("#saas-scene",{opacity:1,duration:.75,ease:"power2.out"});

    // Movimiento ambiental
    gsap.to(".orb-1",{x:90,y:-50,repeat:-1,yoyo:true,duration:7,ease:"sine.inOut"});
    gsap.to(".orb-2",{x:-80,y:40,repeat:-1,yoyo:true,duration:8,ease:"sine.inOut"});
    gsap.to(".orb-3",{x:40,y:60,repeat:-1,yoyo:true,duration:9,ease:"sine.inOut"});
    gsap.to(".bg-grid",{backgroundPosition:"220px 140px",duration:16,repeat:-1,ease:"none"});

    const tl = gsap.timeline({delay:.6});

    tl
    // Slide 1
    .fromTo("#slide1",
    {opacity:0, scale:.58, y:110, filter:"blur(18px)"},
    {opacity:1, scale:1, y:0, filter:"blur(0px)", duration:1.2, ease:"power4.out"})
    .fromTo(".saas-number",
    {letterSpacing:"0.22em", textShadow:"0 0 0 rgba(120,190,255,0)"},
    {letterSpacing:"0.02em", textShadow:"0 0 28px rgba(120,190,255,.35)", duration:.9, ease:"power3.out"},
    "<0.08")
    .to("#slide1",
    {opacity:0, scale:1.18, y:-46, filter:"blur(14px)", duration:.85, ease:"power3.in"},
    "+=1.15")

    // Slide 2
    .fromTo("#slide2",{opacity:0},{opacity:1,duration:.4})
    .from(".saas-word",
    {
        opacity:0,
        y:30,
        rotateX:-65,
        transformOrigin:"50% 100%",
        filter:"blur(8px)",
        stagger:.14,
        duration:.62,
        ease:"power3.out"
    },"<")
    .to(".saas-word",
    {
        y:-22,
        opacity:0,
        filter:"blur(8px)",
        stagger:.07,
        duration:.42,
        ease:"power2.in"
    },"+=1.15")
    .to("#slide2",{opacity:0,duration:.2},"<")

    // Slide 3
    .fromTo("#slide3",
    {opacity:0,y:24,scale:.97},
    {opacity:1,y:0,scale:1,duration:.5,ease:"power2.out"})
    .from(connectedChars,
    {
        opacity:0,
        y:22,
        rotateX:-90,
        transformOrigin:"50% 50% -12",
        stagger:.028,
        duration:.55,
        ease:"back.out(2)"
    },"<")
    .fromTo(".shine",
    {x:"-130%", opacity:0},
    {x:"130%", opacity:1, duration:1.05, ease:"power2.inOut"},
    "+=.08")
    .to("#slide3",
    {opacity:0,y:-24,filter:"blur(8px)",duration:.58,ease:"power2.in"},
    "+=.95")

    // Slide 4 (logo final)
    .fromTo("#slide4",
    {opacity:0, scale:.9, filter:"blur(12px)"},
    {opacity:1, scale:1, filter:"blur(0px)", duration:.85, ease:"power3.out"})
    .from(logoChars,
    {opacity:0, y:16, stagger:.022, duration:.42, ease:"power2.out"},
    "<.05")
    .from(".saas-logo-sub",
    {opacity:0, y:14, duration:.45},
    "<.15")
    .from(".cta-pill",
    {opacity:0, y:12, scale:.92, duration:.4, ease:"power2.out"},
    "<.12")

    // Respiración final
    .to("#slide4",{scale:1.02,duration:2.4,yoyo:true,repeat:1,ease:"sine.inOut"});
    
},27000);
