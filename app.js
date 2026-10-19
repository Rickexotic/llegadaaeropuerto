const card =
document.querySelector(".story-card");

const header =
document.querySelector(".card-header");

const title =
document.querySelector(".card-title");

const body =
document.querySelector(".card-body");

const progress =
document.querySelector(".progress-bar");

const island =
document.querySelector(".dynamic-island");

function setProgress(value){

    progress.style.width =
    value + "%";

}

const tl = gsap.timeline();

// WhatsApp

tl.to({},{

duration:1,

onStart:()=>{

setProgress(10);

}

});

// Respuesta

tl.to({},{

duration:2,

onStart:()=>{

header.textContent =
"Respuesta";

title.textContent =
"Ok 👍";

body.textContent =
"No hay problema";

setProgress(20);

island.style.background =
"#d3b06b";

}

});

// Club Beneficios

tl.to({},{

duration:2,

onStart:()=>{

header.textContent =
"Club Beneficios";

title.textContent =
"✈ Preparando llegada";

body.textContent =
"Buscando beneficios";

setProgress(35);

}

});

// Parking

tl.to({},{

duration:2,

onStart:()=>{

header.textContent =
"Parking";

title.textContent =
"🅿 Parking Premium";

body.textContent =
"Reservando...";

setProgress(55);

}

});

// Parking OK

tl.to({},{

duration:1.5,

onStart:()=>{

body.textContent =
"✅ Confirmado";

setProgress(65);

}

});

// Restaurant

tl.to({},{

duration:2,

onStart:()=>{

header.textContent =
"Restaurant";

title.textContent =
"🍽 Mesa para 2";

body.textContent =
"Reservando mesa";

setProgress(80);

}

});

// Restaurant OK

tl.to({},{

duration:1.5,

onStart:()=>{

body.textContent =
"✅ Mesa Confirmada";

setProgress(90);

}

});

// Gift

tl.to({},{

duration:2,

onStart:()=>{

header.textContent =
"Duty Free";

title.textContent =
"🎁 Regalo de bienvenida";

body.textContent =
"Aplicando 15% OFF";

setProgress(100);

}

});

// Final

tl.to(card,{

opacity:0,

scale:.85,

duration:1

});

tl.to(".final-screen",{

opacity:1,

duration:1.5

});
