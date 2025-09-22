//nav bar
const menuLinks = document.querySelectorAll('.menu li a');
const checkBox = document.getElementById('check');

menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    checkBox.checked = false; // close menu on link click
  });
});
// homepage-herosection
const quotes = [
    { text: "Health is the greatest 'Gift', contentment the greatest 'Wealth'.", img: "Images/H2.jpg" },
    { text: "Eat Well, Move Daily, Hydrate Often, Sleep Lots, Love Your Body.", img: "Images/H1.jpg" },
    { text: "Take Care of your body, It's the only place you have to Live.", img: "Images/H3.jpg" },
    { text: "A Healthy outside starts from the inside.", img: "Images/H4.jpg" },
    { text: "Your Health is an Investment, not an 'Expense'.", img: "Images/H5.jpg" }
];

const quoteElement = document.getElementById("health-quote");
const herosection = document.querySelector(".hero-h")
let currentIndexh = 0;

function showQuote() {
    const current = quotes[currentIndexh];

    quoteElement.textContent = current.text;

    herosection.style.backgroundImage = `url(${current.img})`;

    quoteElement.style.animation = "none";
    void quoteElement.offsetWidth;
    quoteElement.style.animation = "fadeIn 1s ease-in-out";

    currentIndexh = (currentIndexh + 1)% quotes.length;
}
document.addEventListener("DOMContentLoaded", () => {
    showQuote();
    setInterval(showQuote, 5000);
});

//tipscard
const tips = [
    "Drink at least 8 glasses of water every day.",
    "take a 10-minute walk after meals to improve digestion.",
    "Sleep 7-8 hours daily for Better Health",
    "Include Fresh fruits and vegetables in your meals.",
    "strecth for 5-minutes every morning to Stay Flexible.",
    "Eat Whole Foods – Favor fruits, vegetables, grains, and lean proteins.",
    "Move Daily – Get at least 30 minutes of activity."
];

const tipElement = document.getElementById("daily-tip");

const today = new Date().getDate();
const tipIndex = today % tips.length;

tipElement.textContent = tips[tipIndex];

//-----home page------//
// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle?.addEventListener('click', ()=>{
    if(navLinks.style.display === 'flex') navLinks.style.display = 'none';
    else navLinks.style.display = 'flex';
});

// Simple testimonials slider (carousel by translating X)
const track = document.getElementById('testimonialTrack');
const prev = document.getElementById('prevTest');
const next = document.getElementById('nextTest');
let index = 0;
const itemsCount = track?.children.length || 0;
// function updateSlider(){
//     const w = Math.min(window.innerWidth, 1100) * 0.28; // estimation
//     track.style.transform = `translateX(${-index * (320)}px)`;
// }
function updateSlider(){
    if(!track) return; // prevents error if track is missing
    const w = Math.min(window.innerWidth, 1100) * 0.28;
    track.style.transform = `translateX(${-index * 320}px)`; 
}
prev?.addEventListener('click', ()=>{ index = Math.max(0, index-1); updateSlider(); });
next?.addEventListener('click', ()=>{ index = Math.min(itemsCount-1, index+1); updateSlider(); });
window.addEventListener('resize', updateSlider);

// small improvement: smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
    const target = a.getAttribute('href');
    if(target === '#' || target === '') return;
    e.preventDefault();
    const el = document.querySelector(target);
    if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
    });
});

document.getElementById("newsletter-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const emailInput = document.getElementById("email");
    const email = emailInput.value.trim().toLowerCase(); // normalize email
    const message = document.getElementById("message");

    // Get saved emails from localStorage (empty array if none)
    let subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];

    // Check if email already exists
    if (subscribers.includes(email)) {
        message.textContent = "Error: This email is already subscribed!";
        message.style.color = "red";
    } else {
        // Save new email
        subscribers.push(email);
        localStorage.setItem("subscribers", JSON.stringify(subscribers));
        message.textContent = "Subscription successful!";
        message.style.color = "green";
        emailInput.value = ""; // clear input
    }
});

// home.js--reusable function
document.addEventListener("DOMContentLoaded", () => {
    const btn1 = document.getElementById('msgBtn1');
    if (btn1) {
        btn1.addEventListener('click', () => {
            showMessage("Hello from Home Page!");
        });
    }
});