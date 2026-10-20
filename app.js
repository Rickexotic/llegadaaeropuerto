const notifs = document.getElementById("notifs");
const playBtn = document.getElementById("playBtn");
const replayBtn = document.getElementById("replayBtn");
const progressBar = document.getElementById("progressBar");

/* ---------- Intro ---------- */
const intro = document.getElementById("intro");
const controlsEl = document.getElementById("controls");
const introTyped = document.getElementById("introTyped");

const INTRO_TEXT = "Outside Co.";
const typing = { n: 0 };

/* Sonido de tipeo */
const typingSound = new Audio("assets/typing.wav");
typingSound.preload = "auto";
typingSound.volume = 0.5;
typingSound.loop = true;

function startTypingSound() {
  typingSound.currentTime = 0;
  typingSound.play().catch(() => {});
}
function stopTypingSound() {
  typingSound.pause();
  typingSound.currentTime = 0;
}

/* Estado inicial seguro */
if (intro) {
  intro.style.display = "none";
  intro.style.opacity = "1";
}
if (controlsEl) {
  controlsEl.style.opacity = "1";
  controlsEl.style.pointerEvents = "auto";
}
if (playBtn) {
  playBtn.disabled = false;
  playBtn.textContent = "▶";
}

/* Intro timeline: se ejecuta al presionar Play */
const introTl = gsap.timeline({
  paused: true,
  onComplete: () => {
    stopTypingSound();
    if (intro) intro.style.display = "none";
    if (controlsEl) controlsEl.style.pointerEvents = "none"; // durante presentación no se usa play
    master.play(0); // arranca presentación
  }
});

introTl
  .fromTo("#introSearch",
    { opacity: 0, y: 14, scale: .94 },
    { opacity: 1, y: 0, scale: 1, duration: .5, ease: "power3.out" }, 0)
  .call(startTypingSound, null, 0.5)
  .to(typing, {
    n: INTRO_TEXT.length,
    duration: 1.6,
    ease: "none",
    onUpdate: () => {
      if (introTyped) introTyped.textContent = INTRO_TEXT.slice(0, Math.round(typing.n));
    }
  }, 0.5)
  .call(stopTypingSound, null, 2.1)
  .to("#introGo", { scale: .9, duration: .12, yoyo: true, repeat: 1, ease: "power1.inOut" }, 2.1)
  .to("#introSearch",
    { opacity: 0, scale: 1.06, y: -10, filter: "blur(6px)", duration: .5, ease: "power2.in" }, 2.5)
  .fromTo("#introLogo",
    { opacity: 0, scale: .85, filter: "blur(10px)" },
    { opacity: 1, scale: 1, filter: "blur(0px)", duration: .6, ease: "power3.out" }, 2.9)
  .to("#introLogo", { scale: 1.2, duration: 1, ease: "none" }, 3.5)
  .to("#introLogo", { opacity: 0, filter: "blur(6px)", duration: .5, ease: "power2.in" }, 4.5)
  .to("#intro", { opacity: 0, duration: .4, ease: "power2.out" }, 4.9);

/* ---------- Audio ---------- */
const MUSIC_VOLUME = 0.35;
let audioUnlocked = false;
let appMusicStarted = false;

const SOUNDS = {
  whatsapp: new Audio("assets/notification.wav"),
  appMusic: new Audio("assets/1.mp3")
};

SOUNDS.whatsapp.preload = "auto";
SOUNDS.whatsapp.volume = 0.5;

SOUNDS.appMusic.preload = "auto";
SOUNDS.appMusic.volume = MUSIC_VOLUME;
SOUNDS.appMusic.loop = true;

function unlockAudioFromUserGesture() {
  if (audioUnlocked) return;
  audioUnlocked = true;

  SOUNDS.whatsapp.play()
    .then(() => {
      SOUNDS.whatsapp.pause();
      SOUNDS.whatsapp.currentTime = 0;
    })
    .catch(() => {});

  typingSound.play()
    .then(() => {
      typingSound.pause();
      typingSound.currentTime = 0;
    })
    .catch(() => {});
}

function playWhatsappNotification() {
  if (!audioUnlocked) return;
  SOUNDS.whatsapp.currentTime = 0;
  SOUNDS.whatsapp.play().catch(() => {});
}

function startAppMusic() {
  if (!audioUnlocked || appMusicStarted) return;
  appMusicStarted = true;
  SOUNDS.appMusic.currentTime = 0;
  SOUNDS.appMusic.volume = MUSIC_VOLUME;
  SOUNDS.appMusic.play().catch(() => {});
}

function stopAppMusic() {
  SOUNDS.appMusic.pause();
  SOUNDS.appMusic.currentTime = 0;
  SOUNDS.appMusic.volume = MUSIC_VOLUME;
  appMusicStarted = false;
}

/* ---------- Replay UI ---------- */
function showReplayButton() {
  replayBtn.classList.add("show");
}
function hideReplayButton() {
  replayBtn.classList.remove("show");
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
  mode = "contact"
}) {
  if (mode === "contact") {
    playWhatsappNotification();
  } else {
    startAppMusic();
  }

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

  gsap.from(wrap, {
    height: 0,
    duration: .55,
    ease: "power3.out"
  });

  gsap.fromTo(
    wrap.firstElementChild,
    { y: 18, scale: .98, opacity: 0, filter: "blur(3px)" },
    { y: 0, scale: 1, opacity: 1, filter: "blur(0px)", duration: .55, ease: "power2.out" }
  );

  const items = [...notifs.children];
  const lastIndex = items.length - 1;

  items.forEach((w, i) => {
    const distanceFromNewest = lastIndex - i;

    if (distanceFromNewest === 0) return;

    if (distanceFromNewest >= MAX_VISIBLE) {
      gsap.to(w, {
        opacity: 0,
        duration: .32,
        onComplete: () => w.remove()
      });
      return;
    }

    gsap.to(w.firstElementChild, {
      scale: 1 - distanceFromNewest * .04,
      opacity: Math.max(1 - distanceFromNewest * .18, .42),
      duration: .42,
      ease: "power2.out"
    });
  });
}

function clearNotifs() {
  const items = [...notifs.querySelectorAll(".notif")];
  gsap.to(items, {
    y: -42,
    opacity: 0,
    stagger: .07,
    duration: .45,
    ease: "power2.in",
    onComplete: () => { notifs.innerHTML = ""; }
  });
}

/* ---------- Datos ---------- */
const MARIA = { avatar: "assets/Siwa.png", name: "María" };
const JUAN = { avatar: "assets/Woki.png", name: "Juan" };
const APP  = { appIcon: "assets/App.png", app: "Club Beneficios" };

/* ---------- Escena final ---------- */
function splitChars(selector) {
  const el = document.querySelector(selector);
  if (!el) return [];
  const text = el.textContent.trim();
  el.textContent = "";
  return [...text].map(ch => {
    const span = document.createElement("span");
    span.className = "char";
    span.textContent = ch === " " ? "\u00A0" : ch;
    el.appendChild(span);
    return span;
  });
}

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

gsap.to(".orb-1", { x: 40, y: -25, repeat: -1, yoyo: true, duration: 9, ease: "sine.inOut" });
gsap.to(".orb-2", { x: -35, y: 20, repeat: -1, yoyo: true, duration: 10, ease: "sine.inOut" });

function buildSaaSTimeline() {
  const tl = gsap.timeline();

  tl.to("#stage",
    { scale: 1.08, opacity: 0, filter: "blur(12px)", y: -20, duration: 1.0, ease: "power3.inOut" }, 0);
  tl.fromTo("#saas-scene",
    { opacity: 0 }, { opacity: 1, duration: .75, ease: "power2.out" }, 0);

  tl.addLabel("s1", .6);

  tl.fromTo("#slide1",
      { opacity: 0, scale: .58, y: 110, filter: "blur(18px)" },
      { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power4.out" }, "s1")
    .fromTo(".saas-number",
      { letterSpacing: "0.22em", textShadow: "0 0 0 rgba(120,190,255,0)" },
      { letterSpacing: "0.02em", textShadow: "0 0 28px rgba(120,190,255,.35)", duration: .9, ease: "power3.out" },
      "<0.08")
    .to("#slide1",
      { opacity: 0, scale: 1.18, y: -46, filter: "blur(14px)", duration: .85, ease: "power3.in" },
      "+=1.15");

  tl.fromTo("#slide2", { opacity: 0 }, { opacity: 1, duration: .4 })
    .fromTo(".saas-word",
      { opacity: 0, y: 30, rotateX: -65, transformOrigin: "50% 100%", filter: "blur(8px)" },
      { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)", stagger: .14, duration: .62, ease: "power3.out" },
      "<")
    .to(".saas-word",
      { y: -22, opacity: 0, filter: "blur(8px)", stagger: .07, duration: .42, ease: "power2.in" },
      "+=1.15")
    .to("#slide2", { opacity: 0, duration: .2 }, "<");

  tl.fromTo("#slide3", { opacity: 0 }, { opacity: 1, duration: .5, ease: "power2.out" })
    .fromTo(connectedChars,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, stagger: .03, duration: .5, ease: "power3.out" },
      "<")
    .to("#slide3",
      { opacity: 0, y: -24, duration: .6, ease: "power2.in" },
      "+=1.2");

  tl.addLabel("s4", ">");
  tl.fromTo("#slide4",
      { opacity: 0, scale: .94 },
      { opacity: 1, scale: 1, duration: .8, ease: "power3.out" }, "s4")
    .fromTo(logoChars,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, stagger: .022, duration: .42, ease: "power2.out" },
      "s4+=.05")
    .fromTo(".saas-logo-sub",
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: .45 },
      "s4+=.15")
    .fromTo(".cta-pill",
      { opacity: 0, y: 12, scale: .92 },
      { opacity: 1, y: 0, scale: 1, duration: .4, ease: "power2.out" },
      "s4+=.27")
    .fromTo("#slide4",
      { scale: 1 },
      { scale: 1.035, duration: 5, ease: "none", force3D: true, immediateRender: false },
      "s4+=.8")
    .to("#saas-scene",
      { opacity: 0, duration: 1.0, ease: "power2.inOut" },
      "s4+=5.8");

  return tl;
}

/* ---------- Timeline maestro ---------- */
const master = gsap.timeline({
  paused: true,
  onUpdate: () => {
    progressBar.style.width = `${(master.progress() * 100).toFixed(2)}%`;
  },
  onComplete: () => {
    progressBar.style.width = "100%";
    stopAppMusic();
    showReplayButton();
  }
});

master.call(() => { showNotif({ ...MARIA, mode: "contact", text: "Hola 👋", time: "20:45" }); }, null, 0.5);
master.call(() => { showNotif({ ...MARIA, mode: "contact", text: "Llego a las 21:00", time: "20:45" }); }, null, 1.9);
master.call(() => { showNotif({ ...JUAN, mode: "contact", text: "Perfecto. Te espero 🙌", time: "20:46" }); }, null, 3.4);
master.call(() => { clearNotifs(); }, null, 5.2);

master.call(() => { showNotif({ ...APP, mode: "app", name: "Tu pasajero llega a las 21:00 ✈", text: "Comencemos", time: "20:47" }); }, null, 6.2);
master.call(() => { showNotif({ ...APP, mode: "app", name: "🅿 Parking Premium", detail: "Sector P3 · Terminal Internacional", status: "✅ Reserva exitosa", time: "20:47" }); }, null, 7.9);
master.call(() => { showNotif({ ...APP, mode: "app", name: "🍽 Restaurant Internacional", detail: "Mesa para 2 personas", status: "✅ Confirmada 21:15", time: "20:47" }); }, null, 9.8);
master.call(() => { showNotif({ ...APP, mode: "app", name: "🎁 Duty Free", detail: "Regalo comprado", status: "✅ 15% OFF aplicado", time: "20:48" }); }, null, 11.7);
master.call(() => { showNotif({ ...APP, mode: "app", name: "Algo más?", text: "✅ Todo listo", time: "20:48" }); }, null, 13.6);
master.call(() => { showNotif({ ...APP, mode: "app", name: "Aterrizaje", text: "✈ Tu pasajero ya aterrizó", time: "21:00" }); }, null, 15.4);

master.add(buildSaaSTimeline(), 17.5);

const END = master.duration();
master.fromTo(SOUNDS.appMusic,
  { volume: MUSIC_VOLUME },
  { volume: 0, duration: 1.0, ease: "none", immediateRender: false },
  END - 1.0);

/* ---------- Controles ---------- */
playBtn.addEventListener("click", () => {
  unlockAudioFromUserGesture();

  playBtn.disabled = true;
  playBtn.textContent = "⏵";
  controlsEl.style.pointerEvents = "none";

  if (intro) {
    intro.style.display = "flex";
    intro.style.opacity = "1";
  }
  if (introTyped) introTyped.textContent = "";
  typing.n = 0;

  introTl.restart(true);
});

replayBtn.addEventListener("click", () => {
  hideReplayButton();
  notifs.innerHTML = "";
  stopAppMusic();
  stopTypingSound();
  progressBar.style.width = "0%";

  gsap.set("#stage", { clearProps: "all" });
  gsap.set("#saas-scene", { opacity: 0 });
  gsap.set("#introSearch", { clearProps: "all" });
  gsap.set("#introLogo", { clearProps: "all" });
  gsap.set("#introGo", { clearProps: "all" });

  if (intro) {
    intro.style.display = "none";
    intro.style.opacity = "1";
  }

  master.pause(0);
  introTl.pause(0);

  playBtn.disabled = false;
  playBtn.textContent = "▶";
  controlsEl.style.opacity = "1";
  controlsEl.style.pointerEvents = "auto";
});
