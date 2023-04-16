
function validate(){
    // Get the name, email, and message fields
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    // Define regular expressions to validate name and email
    var nameRegex = /^[a-zA-Z\s]+$/;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate name
    if (!nameRegex.test(name)) {
      alert("Please enter a valid name.");
      return false;
    }

    // Validate email
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    // Validate message
    if (message.length < 10) {
      alert("Please enter a message that is at least 10 characters long.");
      return false;
    }

    // If all fields are valid, submit the form
    alert("Thank you for your message! We will get back to you soon.");
  }