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

    document.getElementById('demo-form').addEventListener('submit', function (event) {
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

        localStorage.setItem('applicationData', JSON.stringify(formData));
        alert('Form submitted!');
        document.getElementById('popup-container').classList.remove('show');
    });

    document.getElementById('popup-container').addEventListener('click', function (event) {
        if (event.target === this) {
            this.classList.remove('show');
        }
    });
});