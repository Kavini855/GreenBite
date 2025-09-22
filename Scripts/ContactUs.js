// Load existing feedbacks on page load
document.addEventListener("DOMContentLoaded", loadFeedback);

// Handle Form Submission
document.getElementById("feedbackform").addEventListener("submit", function(e) {
    e.preventDefault();
      
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Save feedback in localStorage
    let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    feedbacks.push({ name, email, message });
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

    // Show confirmation
    document.getElementById("confirmationMsg").style.display = "block";

    // Reset form
    this.reset();

    // Reload feedback list
    loadFeedback();
});

// Function to load feedbacks
function loadFeedback() {
    let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    let feedbackContainer = document.getElementById("feedbackItems");
    feedbackContainer.innerHTML = "";

    if (feedbacks.length === 0) {
        feedbackContainer.innerHTML = "<p>No feedback yet.</p>";
        return;
    }
    feedbacks.forEach(fb => {
        let div = document.createElement("div");
        div.classList.add("feedback-item");
        div.innerHTML = `<strong>${fb.name}</strong> (${fb.email})<br>${fb.message}`;
        feedbackContainer.appendChild(div);
    });
}

// FAQ Accordion
let acc = document.getElementsByClassName("accordion");
for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        let panel = this.nextElementSibling;
        panel.style.display = (panel.style.display === "block") ? "none" : "block";
    });
}
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