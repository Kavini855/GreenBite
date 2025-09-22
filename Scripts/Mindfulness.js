// //---------mindfulness page -------------//
// --------------- JavaScript from fixed Mindfulness.js ---------------
// Breathing Exercise
const breathingCircle = document.getElementById('breathingCircle');
const breathingText = document.getElementById('breathingText');
const startBreathingBtn = document.getElementById('startBreathing');
const stopBreathingBtn = document.getElementById('stopBreathing');
let breathingInterval;
let isBreathingActive = false;

function startBreathing() {
    if (isBreathingActive) return;
    isBreathingActive = true;
    breathingCircle.classList.add('inhale');
    breathingText.textContent = 'Inhale';
    breathingInterval = setInterval(() => {
        if (breathingCircle.classList.contains('inhale')) {
            breathingCircle.classList.remove('inhale');
            breathingCircle.classList.add('exhale');
            breathingText.textContent = 'Exhale';
        } else {
            breathingCircle.classList.remove('exhale');
            breathingCircle.classList.add('inhale');
            breathingText.textContent = 'Inhale';
        }
    }, 4000);
}

function stopBreathing() {
    clearInterval(breathingInterval);
    isBreathingActive = false;
    breathingCircle.classList.remove('inhale','exhale');
    breathingText.textContent = 'Breathe';
    saveSession({type:'Breathing Exercise', duration:'Custom', date:new Date().toISOString()});
}
startBreathingBtn.addEventListener('click', startBreathing);
stopBreathingBtn.addEventListener('click', stopBreathing);

// Timer
const timerDisplay = document.getElementById('timerDisplay');
const startTimerBtn = document.getElementById('startTimer');
const pauseTimerBtn = document.getElementById('pauseTimer');
const resetTimerBtn = document.getElementById('resetTimer');
const timerOptions = document.querySelectorAll('.timer-option');
let timerInterval, timeLeft=300, isTimerActive=false, isTimerPaused=false, currentTimerMinutes=5;
function updateTimerDisplay(){
    const min=Math.floor(timeLeft/60), sec=timeLeft%60;
    timerDisplay.textContent=`${min.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
}
function startTimer(){
    if(isTimerActive&&!isTimerPaused) return;
    isTimerActive=true; isTimerPaused=false;
    timerInterval=setInterval(()=>{
        if(timeLeft>0){timeLeft--;updateTimerDisplay();}
        else{
            clearInterval(timerInterval); isTimerActive=false;
            showNotification('Timer completed!');
            saveSession({type: currentTimerMinutes===25?'Pomodoro':'Meditation',
                duration:`${currentTimerMinutes} minutes`, date:new Date().toISOString()});
        }
    },1000);
}
function pauseTimer(){ if(!isTimerActive||isTimerPaused) return; clearInterval(timerInterval); isTimerPaused=true;}
function resetTimer(){clearInterval(timerInterval);isTimerActive=false;isTimerPaused=false;timeLeft=currentTimerMinutes*60;updateTimerDisplay();}
timerOptions.forEach(opt=>{opt.addEventListener('click',()=>{timerOptions.forEach(o=>o.classList.remove('active'));opt.classList.add('active');currentTimerMinutes=parseInt(opt.dataset.minutes);timeLeft=currentTimerMinutes*60;updateTimerDisplay();if(isTimerActive) resetTimer();})});
startTimerBtn.addEventListener('click',startTimer);
pauseTimerBtn.addEventListener('click',pauseTimer);
resetTimerBtn.addEventListener('click',resetTimer);

// Ambient Sounds
const soundButtons = document.querySelectorAll('.sound-btn');
const masterVolumeSlider=document.getElementById('masterVolume');
const masterVolumeValue=document.getElementById('masterVolumeValue');
const stopAllSoundsBtn=document.getElementById('stopAllSounds');
const audioElements={
    rain:document.getElementById('rainSound'),
    ocean:document.getElementById('oceanSound'),
    forest:document.getElementById('forestSound'),
    'white-noise':document.getElementById('whiteNoiseSound'),
    cafe:document.getElementById('cafeSound'),
    fireplace:document.getElementById('fireplaceSound')
};
masterVolumeSlider.addEventListener('input',()=>{const vol=masterVolumeSlider.value/100;masterVolumeValue.textContent=`${masterVolumeSlider.value}%`;Object.values(audioElements).forEach(a=>a.volume=vol);});
masterVolumeSlider.dispatchEvent(new Event('input'));
soundButtons.forEach(button=>{
    const sound=button.dataset.sound;
    const volumeControl=button.querySelector('.volume-control');
    const audio=audioElements[sound];
    button.addEventListener('click',e=>{
        if(e.target.classList.contains('volume-control')) return;
        if(audio.paused){audio.play().catch(err=>console.error(err));button.classList.add('active');}
        else{audio.pause();button.classList.remove('active');}
    });
    volumeControl.addEventListener('input',e=>{audio.volume=e.target.value/100;});
    volumeControl.value=50;
    volumeControl.dispatchEvent(new Event('input'));
});
stopAllSoundsBtn.addEventListener('click',()=>{
    Object.entries(audioElements).forEach(([s,a])=>{a.pause();a.currentTime=0;document.querySelector(`[data-sound="${s}"]`)?.classList.remove('active');});
    showNotification('All sounds stopped');
});

// Session History
const sessionsContainer=document.getElementById('sessionsContainer');
const clearHistoryBtn=document.getElementById('clearHistory');
function saveSession(session){
    const sessions=JSON.parse(localStorage.getItem('mindfulnessSessions')||'[]');
    sessions.unshift(session);
    localStorage.setItem('mindfulnessSessions',JSON.stringify(sessions));
    displaySessions();
    showNotification('Session saved to history!');
}
function displaySessions(){
    const sessions=JSON.parse(localStorage.getItem('mindfulnessSessions')||'[]');
    sessionsContainer.innerHTML='';
    if(!sessions.length){sessionsContainer.innerHTML='<p class="session-item">No sessions completed yet. Start a meditation or breathing exercise!</p>';return;}
    sessions.forEach(session=>{
        const date=new Date(session.date);
        const formattedDate=date.toLocaleDateString()+' '+date.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
        const div=document.createElement('div');
        div.className='session-item';
        div.innerHTML=`<div><div class="session-type">${session.type}</div><div class="session-date">${formattedDate}</div></div>
        <div class="session-duration">${session.duration}</div>`;
        sessionsContainer.appendChild(div);
    });
}
function clearHistory(){if(confirm('Are you sure you want to clear your session history?')){localStorage.removeItem('mindfulnessSessions');displaySessions();showNotification('Session history cleared!');}}
clearHistoryBtn.addEventListener('click',clearHistory);

// Notifications
const notification=document.getElementById('notification');
function showNotification(msg){notification.textContent=msg;notification.classList.add('show');setTimeout(()=>{notification.classList.remove('show');},3000);}

// Initialize
updateTimerDisplay();
displaySessions();

// Newsletter
document.getElementById("newsletter-form").addEventListener("submit", function(e){
    e.preventDefault();
    const emailInput=document.getElementById("email");
    const email=emailInput.value.trim().toLowerCase();
    const message=document.getElementById("message");
    let subscribers=JSON.parse(localStorage.getItem("subscribers")||'[]');
    if(subscribers.includes(email)){message.textContent="Error: This email is already subscribed!";message.style.color="red";}
    else{subscribers.push(email);localStorage.setItem("subscribers",JSON.stringify(subscribers));message.textContent="Subscription successful!";message.style.color="green";emailInput.value="";}
});

// Hamburger Menu
const menuToggle=document.getElementById("check");
const openBtn=document.querySelector(".open-menu");
const closeBtn=document.querySelector(".close-menu");
menuToggle.addEventListener("change",()=>{
    if(menuToggle.checked){openBtn.style.display="none";closeBtn.style.display="block";}
    else{openBtn.style.display="block";closeBtn.style.display="none";}
});
