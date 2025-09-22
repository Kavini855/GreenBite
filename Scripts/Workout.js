//workout generator
const workouts = {
    arms:{ none:["Push-ups","Plank","Arm Circles"], dumbbells:["Bicep Curls","Tricep Kickbacks","Shoulder Press"], resistanceBand:["Band Bicep Curl","Band Tricep Extension"], kettlebell:["Kettlebell Curl","Kettlebell Press"], medicineBall:["MB Arm Toss","MB Overhead Press"] },
    legs:{ none:["Squats","Lunges","Glute Bridges"], dumbbells:["Weighted Squats","Dumbbell Lunges"], resistanceBand:["Band Squats","Band Leg Press"], kettlebell:["Kettlebell Deadlift","Kettlebell Swing"], medicineBall:["MB Squat Press","MB Jump Squats"] },
    fullBody:{ none:["Burpees","Mountain Climbers"], dumbbells:["Dumbbell Thrusters","Renegade Rows"], resistanceBand:["Band Thrusters","Band Deadlift"], kettlebell:["Kettlebell Clean & Press","Kettlebell Swing"], medicineBall:["MB Slam","MB Burpees"] },
    back:{ none:["Superman","Bird Dog"], dumbbells:["Dumbbell Rows","Deadlifts"], resistanceBand:["Band Rows","Band Pull Apart"], kettlebell:["Kettlebell Row","Kettlebell Deadlift"], medicineBall:["MB Rotations","MB Back Extensions"] },
    chest:{ none:["Push-ups","Chest Dips"], dumbbells:["Dumbbell Bench Press","Dumbbell Flys"], resistanceBand:["Band Chest Press","Band Push-ups"], kettlebell:["Kettlebell Floor Press","Kettlebell Fly"], medicineBall:["MB Push-up Toss","MB Chest Press"] },
    shoulders:{ none:["Arm Circles","Pike Push-ups"], dumbbells:["Shoulder Press","Lateral Raises"], resistanceBand:["Band Shoulder Press","Band Lateral Raise"], kettlebell:["Kettlebell Shoulder Press","Kettlebell Upright Row"], medicineBall:["MB Shoulder Press","MB Front Raise"] },
    core:{ none:["Plank","Sit-ups"], dumbbells:["Weighted Sit-ups","Russian Twists"], resistanceBand:["Band Crunch","Band Twist"], kettlebell:["Kettlebell Sit-ups","Kettlebell Twists"], medicineBall:["MB Russian Twist","MB Sit-ups"] }
};

function getRandomExercises(list,count=5){ 
    const shuffled=[...list].sort(()=>0.5-Math.random()); 
    return shuffled.slice(0,Math.min(count,list.length)); 
}

const generateBtn=document.getElementById('generateBtn');
const workoutContainer=document.getElementById('workoutContainer');
const messageSection=document.getElementById('messageSection');

let exercises=[], currentIndex=0, duration=30, timer;

generateBtn.addEventListener('click',() => {
    const bodyPart=document.getElementById('bodyPart').value;
    const equipment=document.getElementById('equipment').value;
    duration=parseInt(document.getElementById('duration').value)||30;

    exercises=getRandomExercises(workouts[bodyPart][equipment],5);
    currentIndex=0;
    clearInterval(timer);
    workoutContainer.innerHTML='';
    messageSection.textContent='Workout successfully generated! Click Start on the first exercise.';
    messageSection.classList.remove('completed');

    exercises.forEach((ex,index)=>{
        const card=document.createElement('div');
        card.className='workout-card';
        card.id=`card${index}`;
        card.innerHTML=`
            <h3>${ex}</h3>
            <div class="timer" id="timer${index}">${formatTime(duration)}</div>
            <div class="progress-bar-container"><div class="progress-bar" id="progress${index}"></div></div>
            <button onclick="startExercise(${index})">Start</button>
        `;
        workoutContainer.appendChild(card);
    });
});

function startExercise(index){
    if(index!==currentIndex){ 
        messageSection.textContent=`Please complete exercises in order. Next is "${exercises[currentIndex]}".`; 
        return; 
    }
    let time=duration;
    const display=document.getElementById(`timer${index}`);
    const progressBar=document.getElementById(`progress${index}`);
    messageSection.textContent=`Starting "${exercises[index]}"`;

    document.querySelectorAll('.workout-card').forEach(c=>c.classList.remove('active'));
    const currentCard=document.getElementById(`card${index}`);
    currentCard.classList.add('active');

    progressBar.style.width='100%';

    timer=setInterval(()=>{
        display.textContent=formatTime(time);
        progressBar.style.width=((time/duration)*100)+'%';
        time--;
        if(time<0){
            clearInterval(timer);
            messageSection.textContent=`Exercise "${exercises[index]}" completed! Click Start on the next exercise.`;
            currentCard.classList.remove('active');
            currentCard.classList.add('completed');
            currentIndex++;
            if(currentIndex>=exercises.length){
                // Slide-in side message for workout completed
                messageSection.textContent="🎉 Workout successfully completed! 🎉";
                messageSection.classList.add('completed');
                setTimeout(()=>{ messageSection.classList.remove('completed'); }, 3000);
            }
        }
    },1000);
}

function formatTime(sec){ 
    const m=Math.floor(sec/60).toString().padStart(2,'0'); 
    const s=(sec%60).toString().padStart(2,'0'); 
    return `${m}:${s}`; 
}

//newsletter
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
