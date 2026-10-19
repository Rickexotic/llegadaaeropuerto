const chat =
document.getElementById("chat");

const dashboard =
document.getElementById("dashboard");

const summary =
document.getElementById("summary");

const closing =
document.getElementById("closing");

const transition =
document.querySelector(".app-transition");

const incoming =
document.querySelector(".incoming");

const outgoing =
document.querySelector(".outgoing");

function activateCard(selector){

    document
    .querySelector(selector)
    .classList.add("show");

}

function confirmCard(selector){

    document
    .querySelector(selector)
    .classList.add("confirmed");

}

// CHAT

setTimeout(() => {

    incoming.classList.add("show");

}, 500);

setTimeout(() => {

    outgoing.classList.add("show");

}, 2500);

// TRANSICIÓN APP

setTimeout(() => {

    chat.classList.remove("active");

    transition.classList.add("show");

}, 5000);

setTimeout(() => {

    transition.classList.remove("show");

    dashboard.classList.add("active");

}, 7000);

// PARKING

setTimeout(() => {

    activateCard(".parking");

}, 8000);

setTimeout(() => {

    confirmCard(".parking");

}, 9500);

// RESTAURANTE

setTimeout(() => {

    activateCard(".restaurant");

}, 11000);

setTimeout(() => {

    confirmCard(".restaurant");

}, 12500);

// REGALO

setTimeout(() => {

    activateCard(".gift");

}, 14000);

setTimeout(() => {

    confirmCard(".gift");

}, 15500);

// RESUMEN

setTimeout(() => {

    dashboard.classList.remove("active");

    summary.classList.add("active");

}, 19000);

// CIERRE

setTimeout(() => {

    summary.classList.remove("active");

    closing.classList.add("active");

}, 23000);

// PHONE 3D

const phone =
document.querySelector(".phone");

window.addEventListener("mousemove", e => {

    const x =
    (e.clientX / window.innerWidth - .5) * 10;

    const y =
    (e.clientY / window.innerHeight - .5) * 10;

    phone.style.transform =
    `translateY(-8px)
     rotateY(${x}deg)
     rotateX(${-y}deg)`;

});
