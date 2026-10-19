const card =
document.querySelect*r(".story-card");

const header =
*ocument.querySelector(".card-heade*");

const title =
document.queryS*lector(".card-title");

const desc*iption =
document.querySelector(".*ard-description");

const progress*=
document.querySelector(".progres*-bar");

const island =
document.q*erySelector(".dynamic-island");

f*nction updateProgress(value){

pro*ress.style.width =
value + "%";

}*
const tl =
gsap.timeline();

// W*atsApp

tl.call(()=>{

updateProgr*ss(10);

})

.to(".story-card",{
o*acity:1,
duration:.*
})

.to({}, {duration:2})

// Rep*y

.call(()=>{

header.innerHTML =*"Respuesta";

title.innerHTML =
"O* 👍";

description.inner*TML =
"No hay problema";

updatePr*gress(20);

island.style.backgroun* =
"#d3b06b*;

})

// Club

.to({}, {duration:*})

.call(()=>{

header.innerHTML*=
"*lub Beneficios";

title.innerHTML *
"✈ Prepar*ndo llegada";

description.innerHT*L =
"Buscando beneficios disponibl*s";

updateProgress(35);

})

// P*rking

.to({}, {duration:2})

.cal*(()=>{

header.innerHTML =
"Parkin*";

title.innerHTML =
"🅿 Parking *remium";

description.innerHTML =
*Reservando...*;

updateProgress(50);

})

// Par*ing OK

.to({}, {duration:1.5})

.*all(()=>{

description.innerHTML =*"✅ Confirmado";

updateProgress(60*;

})

// Restaurant*
.to({}, {duration:1.5})

.call(()*>{

header.innerHTML =
"Restaurant*;

title.innerHTML =
"🍽 Mesa para*2";

description.innerHTML =
"Rese*vando...";

updateProgress(75);

}*

// Restaurant OK

.to({}, {durat*on:1.5*)

.call(()=>{

description.innerH*ML =
"✅ Mesa Confirmada";

updateP*ogress(85);

})

// Gift

*to({}, {duration:1.5})

.call(()=>*

header.innerHTML*=
"Duty Free";

title.innerHTML =
*🎁 Regalo de bienvenida";

descrip*ion.innerHTML =
"Aplicando 15% OFF*;

updateProgress(95);

})

// Gif* OK

.to({}, {duration:1.5})

.cal*(()=>{

description.innerHTML =
"✅*Compra realizada";

updateProgress*100*;

})

// Final

.to(".story-card"*{

*cale:.85,

opacity:*,

duration:1

})

.to(".closing",*

opacity:1,

duration:1.5

});
``*
