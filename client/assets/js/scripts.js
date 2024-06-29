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