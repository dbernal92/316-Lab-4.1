document.getElementById("registration").addEventListener("submit", function (e) {

    // Form won't submit if the validation fails
    e.preventDefault();

    let usernameInput = document.querySelector("input[name='username']");
    // Makes username lowercase and removes any spaces
    let username = usernameInput.value.trim().toLowerCase();
    let errorDisplay = document.getElementById("errorDisplay");

    // Ensure at least two unique characters
    let uniqueChars = new Set(username.split(""));
    if (uniqueChars.size < 2) {
        errorDisplay.textContent = "Username must contain at least two unique characters.";
        return;
    }

    // Check if username exists in localStorage
    let storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    let existingUser = storedUsers.find(user => user.username === username);

    if (existingUser) {
        errorDisplay.textContent = "This username is already taken. Please choose another.";
        return;
    }

    // Stores the user if valid
    let email = document.querySelector("input[name='email']").value.trim().toLowerCase();
    let password = document.querySelector("input[name='password']").value;
    
    storedUsers.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(storedUsers));

    // Show success message and clears form
    errorDisplay.textContent = "Registration successful!";
    document.getElementById("registration").reset();
});
