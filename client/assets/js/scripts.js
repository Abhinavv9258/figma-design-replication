// Select all elements with the class ".play-button"
const playButtons = document.querySelectorAll(".play-button");

// Loop through each play button and attach an event listener
playButtons.forEach(button => {
    button.addEventListener("click", function () {
        // Find the related thumbnail and iframe within the same wonder
        const thumbnail = button.closest('.wonder').querySelector(".video-thumbnail");
        const iframe = button.closest('.wonder').querySelector(".youtube-video");

        // Toggle display properties
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
        alert('Form submitted!');
        document.getElementById('popup-container').classList.remove('show');
    });

    document.getElementById('popup-container').addEventListener('click', function (event) {
        if (event.target === this) {
            this.classList.remove('show');
        }
    });
});