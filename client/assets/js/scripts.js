const playButtons = document.querySelectorAll(".play-button");

playButtons.forEach(button => {
    button.addEventListener("click", function () {
        const thumbnail = button.closest('.wonder').querySelector(".video-thumbnail");
        const iframe = button.closest('.wonder').querySelector(".youtube-video");

        thumbnail.style.display = "none";
        iframe.style.display = "block";
    });
});


document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.demo-btn').addEventListener('click', function () {
        document.getElementById('popup-container').classList.add('show');
    });

    document.querySelector('.close-btn').addEventListener('click', function () {
        document.getElementById('popup-container').classList.remove('show');
    });

    document.getElementById('demo-form').addEventListener('submit', async function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const countryCode = document.getElementById('country-code').value;
        const mobile = document.getElementById('phone-number').value;
        const babyStage = document.getElementById('child-stage').value;

        const formData = {
            name: name,
            email: email,
            phone: `${countryCode} ${mobile}`,
            babyStage: babyStage
        };

        try {
            const response = await fetch('/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Form submission failed');
            }
            alert('Form submitted successfully!');
            document.getElementById('popup-container').classList.remove('show');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error submitting form. Please try again.');
        }
        document.getElementById('popup-container').classList.remove('show');
    });

    document.getElementById('popup-container').addEventListener('click', function (event) {
        if (event.target === this) {
            this.classList.remove('show');
        }
    });
});