document.getElementById('calcform').addEventListener('submit', function(e){
    e.preventDefault();
  
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const activity = parseFloat(document.getElementById('activity').value);
  
    let bmr = gender === 'male' ? 10*weight + 6.25*height - 5*age + 5 : 10*weight + 6.25*height - 5*age - 161;
    let tdee = bmr * activity;
  
    let carbs = (tdee*0.5)/4;
    let protein = (tdee*0.2)/4;
    let fat = (tdee*0.3)/9;
  
    document.getElementById('bmr').textContent = bmr.toFixed(0);
    document.getElementById('tdee').textContent = tdee.toFixed(0);
    document.getElementById('carbs').textContent = carbs.toFixed(0);
    document.getElementById('protein').textContent = protein.toFixed(0);
    document.getElementById('fat').textContent = fat.toFixed(0);
  
    document.getElementById('carbsBar').style.width = Math.min(carbs/300*100,100) + '%';
    document.getElementById('proteinBar').style.width = Math.min(protein/150*100,100) + '%';
    document.getElementById('fatBar').style.width = Math.min(fat/70*100,100) + '%';
  
    document.getElementById('result').style.display = 'block';
});

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