let form = document.querySelector(".chat-form");
let userQuestion = document.getElementById("userQuestion");
let botResponse = document.getElementById("botResponse");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let userMessage = userQuestion.value.trim();
    if (!userMessage) return;

    botResponse.innerText = "Thinking...";

    try {
        const response = await fetch("http://localhost:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage })
        });

        const data = await response.json();

        botResponse.innerText = data.reply || "Sorry, I didn't understand.";
    } 
    catch (err) {
        botResponse.innerText = "Error: " + err.message;
    }
});
