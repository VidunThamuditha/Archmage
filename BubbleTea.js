document.addEventListener('DOMContentLoaded', () => {
            const navbar = document.querySelector('.navbar');

            window.addEventListener('scroll',() => {
                if (window.scrollY > 80) {
                    navbar.classList.add('navbar-scrolled');
                } else {
                    navbar.classList.remove('navbar-scrolled');
                }
            });
});

document.getElementById('contactForm').addEventListener('submit', (event) => {
    event.preventDefault();

    // Get the form data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    const submitDate = new Date().toISOString();

    //validation form 

    if (!name || !email || !phone || !message) {
        alert('Please fill out all fields.');
        isValid = false;
        return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(email)){
        alert('Please enter a valid email address.');
        isValid = false;
         return;
    }

    const phonePattern = /^\d{10}$/;
    if(!phonePattern.test(phone)){
        alert('Please enter a valid 10-digit phone number.');
        isValid = false;
        return;
    }


    fetch('https://www.archmage.lk/api/v1/webapi/assignment/saveassignment/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Name:name,
            Email:email,
            Phone:phone,
            Message:message,
            Date:submitDate
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Form submitted successfully!');
        document.getElementById('contactForm').reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error submitting the form.');
    });
});