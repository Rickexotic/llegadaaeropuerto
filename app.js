const notificationSound = document.getElementById("notificationSound");
const notifs = document.getElementById("notifs");

/* ---------- Audio ---------- */
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
    .catch(()=>{});
}

document.addEventListener("click", unlockAudio, { once:true });
document.addEventListener("touchstart", unlockAudio, { once:true });

function playNotification(){
    if(!notificationSound || !audioUnlocked) return;
    notificationSound.currentTime = 0;
    notificationSound.volume = 0.5;
    notificationSound.play().catch(err=>{
        console.log("Audio bloqueado:", err);
    });
}

/* ---------- Notificaciones ---------- */
const MAX_VISIBLE = 4;

function showNotif({
    appIcon = "assets/wassap.png",
    app = "WhatsApp",
    avatar = "",
    name = "",
    text = "",
    detail = "",
    status = "",
    time = "ahora",
    mode = "contact" // "contact" | "app"
}){

    playNotification();

    const wrap = document.createElement("div");
    wrap.className = "notif-wrap";

    const rightVisual = mode === "contact"
      ? `
        <div class="avatar-stack">
            <img class="avatar-img" src="${avatar}" alt="">
            <img class="avatar-app-badge" src="${appIcon}" alt="">
        </div>`
      : "";

    const leftVisual = mode === "app"
      ? `<img class="left-app-icon" src="${appIcon}" alt="">`
      : "";

    wrap.innerHTML = `
    <div class="notif">
        ${leftVisual}
        <div class="body">
            <div class="top"><span>${app}</span><span>${time}</span></div>
            <div class="name">${name}</div>
            ${text ? `<div class="msg">${text}</div>` : ""}
            ${detail ? `<div class="detail">${detail}</div>` : ""}
            ${status ? `<div class="status">${status}</div>` : ""}
        </div>
        ${rightVisual}
    </div>`;

    notifs.appendChild(wrap);

    gsap.from(wrap,{
        height:0,
        duration:.55,
        ease:"power3.out"
    });

    gsap.from(wrap.firstElementChild,{
        y:-72,
        scale:.92,
        opacity:0,
        duration:.62,
        ease:"back.out(1.5)"
    });

    const items = [...notifs.children];
const lastIndex = items.length - 1; // el mas nuevo (abajo)

items.forEach((w,i)=>{

    const distanceFromNewest = lastIndex - i; // 0 = nuevo, 1 = uno arriba, etc.

    if(distanceFromNewest === 0) return;

    if(distanceFromNewest >= MAX_VISIBLE){
        gsap.to(w,{
            opacity:0,
            duration:.32,
            onComplete:()=>w.remove()
        });
        return;
    }

    gsap.to(w.firstElementChild,{
        scale:1 - distanceFromNewest*.04,
        opacity:Math.max(1 - distanceFromNewest*.18, .42),
        duration:.42,
        ease:"power2.out"
    });

});

}

function clearNotifs(){
    const items = [...notifs.querySelectorAll(".notif")];
    gsap.to(items,{
        y:-42,
        opacity:0,
        stagger:.07,
        duration:.45,
        ease:"power2.in",
        onComplete:()=>{ notifs.innerHTML = ""; }
    });
}

/* ---------- Datos ---------- */
const SIWA = { avatar:"assets/Siwa.png", name:"Siwa" };
const WOKI = { avatar:"assets/Woki.png", name:"Woki" };
const APP  = { appIcon:"assets/App.png", app:"Club Beneficios" };

/* ---------- Secuencia ---------- */

// Parte 1: estilo conversación (Siwa/Woki)
setTimeout(()=>{
    showNotif({...SIWA, mode:"contact", text:"Hola 👋", time:"1m ago"});
},500);

setTimeout(()=>{
    showNotif({...SIWA, mode:"contact", text:"Llego a las 21:00", time:"justo ahora"});
},1900);

setTimeout(()=>{
    showNotif({...WOKI, mode:"contact", text:"Te espero en el aeropuerto 🙌", time:"ahora"});
},3400);

setTimeout(()=>{
    clearNotifs();
},5200);

// Parte 2: app aeropuerto con mismo estilo vidrio
setTimeout(()=>{
    showNotif({
        ...APP,
        mode:"app",
        name:"Tu pasajero llega a las 21:00 ✈",
        text:"Preparemos tus beneficios",
        time:"ahora"
    });
},6200);

setTimeout(()=>{
    showNotif({
        ...APP,
        mode:"app",
        name:"🅿 Parking Premium",
        detail:"Sector P3 · Terminal Internacional",
        status:"✅ Reserva exitosa",
        time:"ahora"
    });
},7900);

setTimeout(()=>{
    showNotif({
        ...APP,
        mode:"app",
        name:"🍽 Restaurant Internacional",
        detail:"Mesa para 2 personas",
        status:"✅ Confirmada 20:30",
        time:"ahora"
    });
},9800);

setTimeout(()=>{
    showNotif({
        ...APP,
        mode:"app",
        name:"🎁 Duty Free",
        detail:"Regalo comprado",
        status:"✅ 15% OFF aplicado",
        time:"ahora"
    });
},11700);

setTimeout(()=>{
    showNotif({
        ...APP,
        mode:"app",
        name:"Todo listo",
        text:"✅ Todo listo para recibir a tu pasajero",
        time:"ahora"
    });
},13600);

setTimeout(()=>{
    showNotif({
        ...APP,
        mode:"app",
        name:"Aterrizaje",
        text:"✈ Tu pasajero acaba de aterrizar",
        time:"ahora"
    });
},15400);

/* ---------- SaaS final ---------- */
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

   gsap.to("#stage",{
  scale:1.08,
  opacity:0,
  filter:"blur(12px)",
  y:-20,
  duration:1.0,
  ease:"power3.inOut"
});

    const scene = document.createElement("div");
    scene.id = "saas-scene";

    scene.innerHTML = `
    <div class="vignette"></div>
    <div class="bg-orb orb-1"></div>
    <div class="bg-orb orb-2"></div>
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
        <div class="saas-message" id="connectedText">Todo conectado.</div>
    </div>

    <div id="slide4" class="saas-slide">
        <div class="saas-logo" id="logoMain">Club Beneficios</div>
        <div class="saas-logo-sub">Aeropuerto Santiago</div>
        <div class="cta-pill">Activa · Reserva · Disfruta</div>
    </div>
    `;

    document.body.appendChild(scene);

    const connectedChars = splitChars("#connectedText");
    const logoChars = splitChars("#logoMain");

    gsap.set("#saas-scene",{opacity:0});
    gsap.to("#saas-scene",{opacity:1,duration:.75,ease:"power2.out"});

    gsap.to(".orb-1",{x:40,y:-25,repeat:-1,yoyo:true,duration:9,ease:"sine.inOut"});
    gsap.to(".orb-2",{x:-35,y:20,repeat:-1,yoyo:true,duration:10,ease:"sine.inOut"});

    const tl = gsap.timeline({delay:.6});

    tl
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

    .fromTo("#slide3",
    {opacity:0},
    {opacity:1, duration:.5, ease:"power2.out"})
    .from(connectedChars,
    {
        opacity:0,
        y:24,
        stagger:.03,
        duration:.5,
        ease:"power3.out"
    },"<")
    .to("#slide3",
    {opacity:0, y:-24, duration:.6, ease:"power2.in"},
    "+=1.2")

    .fromTo("#slide4",
    {opacity:0, scale:.94},
    {opacity:1, scale:1, duration:.8, ease:"power3.out"})
    .from(logoChars,
    {opacity:0, y:16, stagger:.022, duration:.42, ease:"power2.out"},
    "<.05")
    .from(".saas-logo-sub",
    {opacity:0, y:14, duration:.45},
    "<.15")
    .from(".cta-pill",
    {opacity:0, y:12, scale:.92, duration:.4, ease:"power2.out"},
    "<.12")
    .to("#slide4",{scale:1.02,duration:2.4,yoyo:true,repeat:1,ease:"sine.inOut"});

},17500);
