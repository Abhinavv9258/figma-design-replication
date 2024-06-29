const playButtons = document.querySelectorAll(".play-button");

const happyParentListContainer = document.querySelector('.happy-parents-list');
const happyParentBtnPrev = document.querySelector('.happy-parents-slider-prev');
const happyParentBtnNext = document.querySelector('.happy-parents-slider-next');
const happyParentBtnSeeAll = document.querySelector('.happy-parents-button');

const happyParentItemWidth = happyParentListContainer.querySelector('.happy-parents-item').offsetWidth + 20;

const awardedBabiesListContainer = document.querySelector('.awarded-babies-list');
const awardedBabiesBtnPrev = document.querySelector('.awarded-babies-slider-prev');
const awardedBabiesBtnNext = document.querySelector('.awarded-babies-slider-next');

const awardedBabiesItemWidth = awardedBabiesListContainer.querySelector('.awarded-babies').offsetWidth + 20;



playButtons.forEach(button => {
    button.addEventListener("click", function () {
        const thumbnail = button.closest('.wonder').querySelector(".video-thumbnail");
        const iframe = button.closest('.wonder').querySelector(".youtube-video");

        thumbnail.style.display = "none";
        iframe.style.display = "block";
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const happyParentUpdateButtons = () => {
        const scrollLeft = happyParentListContainer.scrollLeft;
        const scrollWidth = happyParentListContainer.scrollWidth;
        const clientWidth = happyParentListContainer.clientWidth;
        happyParentBtnPrev.style.display = scrollLeft === 0 ? 'none' : 'block';
        happyParentBtnNext.style.display = scrollLeft + clientWidth >= scrollWidth ? 'none' : 'block';
    };

    happyParentBtnPrev.addEventListener('click', () => {
        happyParentListContainer.scrollBy({
            left: -happyParentItemWidth * 2,
            behavior: 'smooth'
        });
    });

    happyParentBtnNext.addEventListener('click', () => {
        happyParentListContainer.scrollBy({
            left: happyParentItemWidth * 2,
            behavior: 'smooth'
        });
    });

    happyParentListContainer.addEventListener('scroll', happyParentUpdateButtons);

    happyParentUpdateButtons();

    happyParentBtnSeeAll.addEventListener('click', () => {
        happyParentListContainer.classList.toggle('expanded');
        if (happyParentListContainer.classList.contains('expanded')) {
            happyParentBtnSeeAll.textContent = 'Show Less';
            happyParentBtnPrev.style.display = 'none';
            happyParentBtnNext.style.display = 'none';
        } else {
            happyParentBtnSeeAll.textContent = 'See All';
            happyParentUpdateButtons();
        }
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const awardedBabiesUpdateButtons = () => {
        const scrollLeft = awardedBabiesListContainer.scrollLeft;
        const scrollWidth = awardedBabiesListContainer.scrollWidth;
        const clientWidth = awardedBabiesListContainer.clientWidth;
        awardedBabiesBtnPrev.style.display = scrollLeft === 0 ? 'none' : 'block';
        awardedBabiesBtnNext.style.display = scrollLeft + clientWidth >= scrollWidth ? 'none' : 'block';
    };

    awardedBabiesBtnPrev.addEventListener('click', () => {
        awardedBabiesListContainer.scrollBy({
            left: -awardedBabiesItemWidth * 2,
            behavior: 'smooth'
        });
    });

    awardedBabiesBtnNext.addEventListener('click', () => {
        awardedBabiesListContainer.scrollBy({
            left: awardedBabiesItemWidth * 2,
            behavior: 'smooth'
        });
    });

    awardedBabiesListContainer.addEventListener('scroll', awardedBabiesUpdateButtons);

    awardedBabiesUpdateButtons();
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