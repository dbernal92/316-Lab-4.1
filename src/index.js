document.getElementById("registration").addEventListener("submit", function (e) {

    // Form won't submit if the validation fails
    e.preventDefault();

    let usernameInput = document.querySelector("input[name='username']");
    // Makes username lowercase and removes any spaces
    let username = usernameInput.value.trim().toLowerCase();
    let emailInput = document.querySelector("input[name='email']");
    let passwordInput = document.querySelector("input[name='password']");
    let passwordCheckInput = document.querySelector("input[name='passwordCheck']");
    let termsCheckbox = document.querySelector("input[name='terms']");
    let errorDisplay = document.getElementById("errorDisplay");

    // Ensure username is at least 4 characters long
    if (username.length < 4) {
        errorDisplay.textContent = "Username must be at least 4 characters long.";
        return;
    }

    // Ensure at least two unique characters
    let uniqueChars = new Set(username.split(""));
    if (uniqueChars.size < 2) {
        errorDisplay.textContent = "Username must contain at least two unique characters.";
        return;
    }

    // Ensure username does not contain special characters or whitespace
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
        errorDisplay.textContent = "Username must not contain special characters or whitespace.";
        return;
    }

    // Check if username already exists in localStorage
    let storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    let existingUser = storedUsers.find(user => user.username === username);

    if (existingUser) {
        errorDisplay.textContent = "This username is already taken. Please choose another.";
        return;
    }

    // Stores the user if valid
    let email = emailInput.value.trim().toLowerCase();
    let password = passwordInput.value;
    let passwordCheck = passwordCheckInput.value;

    // Ensure email is valid
    if (!email.includes("@") || !email.includes(".")) {
        errorDisplay.textContent = "Please enter a valid email address.";
        return;
    }

    // Ensure email is not from the example.com domain
    if (email.endsWith("@example.com")) {
        errorDisplay.textContent = "Emails from 'example.com' are not allowed.";
        return;
    }

    // Ensure password meets all validation requirements
    if (password.length < 12) {
        errorDisplay.textContent = "Password must be at least 12 characters long.";
        return;
    }

    // Ensure password contains at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        errorDisplay.textContent = "Password must contain at least one uppercase letter.";
        return;
    }

    // Ensure password contains at least one lowercase letter
    if (!/[a-z]/.test(password)) {
        errorDisplay.textContent = "Password must contain at least one lowercase letter.";
        return;
    }

    // Ensure password contains at least one number
    if (!/\d/.test(password)) {
        errorDisplay.textContent = "Password must contain at least one number.";
        return;
    }

    // Ensure password contains at least one special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errorDisplay.textContent = "Password must contain at least one special character.";
        return;
    }

    // Ensure password does not contain the word "password" (case insensitive)
    if (password.toLowerCase().includes("password")) {
        errorDisplay.textContent = "Password must not contain the word 'password'.";
        return;
    }

    // Ensure password does not contain the username
    if (password.toLowerCase().includes(username)) {
        errorDisplay.textContent = "Password must not contain the username.";
        return;
    }

    // Ensure passwords match
    if (password !== passwordCheck) {
        errorDisplay.textContent = "Passwords do not match.";
        return;
    }

    // Ensure terms and conditions are accepted
    if (!termsCheckbox.checked) {
        errorDisplay.textContent = "You must accept the terms and conditions.";
        return;
    }

    // Stores user data in localStorage
    storedUsers.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(storedUsers));

    // Show success message and clears form
    errorDisplay.textContent = "Registration successful!";
    document.getElementById("registration").reset();
});

// LOGIN FORM VALIDATION
document.getElementById("login").addEventListener("submit", function (e) {
    e.preventDefault();

    let usernameInput = document.querySelector("#login input[name='username']");
    let passwordInput = document.querySelector("#login input[name='password']");
    let errorDisplay = document.getElementById("errorDisplay");

    // Formats the username to lowercase for comparison
    let username = usernameInput.value.trim().toLowerCase();
    let password = passwordInput.value;

    // Retrieves stored users from localStorage
    let storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    let user = storedUsers.find(user => user.username === username);

    // Ensure the username exists
    if (!user) {
        errorDisplay.textContent = "Username not found.";
        return;
    }

    // Ensure the password matches the stored password
    if (user.password !== password) {
        errorDisplay.textContent = "Incorrect password.";
        return;
    }

    // Login successful
    errorDisplay.textContent = "Login successful!";
    document.getElementById("login").reset();
});
