document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializePlayButtons();
    initializeHappyParentsSlider();
    initializeAwardedBabiesSlider();
    initializeDemoForm();
});

/**
 * Initialize navigation links with smooth scrolling and active state management.
 */
function initializeNavigation() {
    const links = document.querySelectorAll('nav ul li.menu a');
    const homeButton = document.querySelector('nav ul li.menu:first-child a');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                links.forEach(l => l.parentElement.classList.remove('active'));
                link.parentElement.classList.add('active');
            }
        });
    });

    homeButton.parentElement.classList.add('active');
}

/**
 * Initialize play buttons to toggle video playback.
 */
function initializePlayButtons() {
    const playButtons = document.querySelectorAll(".play-button");

    playButtons.forEach(button => {
        button.addEventListener("click", () => {
            const thumbnail = button.closest('.wonder').querySelector(".video-thumbnail");
            const iframe = button.closest('.wonder').querySelector(".youtube-video");
            thumbnail.style.display = "none";
            iframe.style.display = "block";
        });
    });
}

/**
 * Initialize the happy parents slider with scroll buttons and 'See All' toggle.
 */
function initializeHappyParentsSlider() {
    const happyParentListContainer = document.querySelector('.happy-parents-list');
    const happyParentBtnPrev = document.querySelector('.happy-parents-slider-prev');
    const happyParentBtnNext = document.querySelector('.happy-parents-slider-next');
    const happyParentBtnSeeAll = document.querySelector('.happy-parents-button');
    const happyParentItemWidth = getItemWidth(happyParentListContainer, '.happy-parents-item');

    const updateHappyParentButtons = () => updateScrollButtons(happyParentListContainer, happyParentBtnPrev, happyParentBtnNext);

    happyParentBtnPrev.addEventListener('click', () => scrollContainer(happyParentListContainer, -happyParentItemWidth));
    happyParentBtnNext.addEventListener('click', () => scrollContainer(happyParentListContainer, happyParentItemWidth));
    happyParentListContainer.addEventListener('scroll', updateHappyParentButtons);

    happyParentBtnSeeAll.addEventListener('click', () => toggleSeeAll(happyParentListContainer, happyParentBtnSeeAll, updateHappyParentButtons));

    updateHappyParentButtons();
}

/**
 * Initialize the awarded babies slider with scroll buttons.
 */
function initializeAwardedBabiesSlider() {
    const awardedBabiesListContainer = document.querySelector('.awarded-babies-list');
    const awardedBabiesBtnPrev = document.querySelector('.awarded-babies-slider-prev');
    const awardedBabiesBtnNext = document.querySelector('.awarded-babies-slider-next');
    const awardedBabiesItemWidth = getItemWidth(awardedBabiesListContainer, '.awarded-babies-item');

    const updateAwardedBabiesButtons = () => updateScrollButtons(awardedBabiesListContainer, awardedBabiesBtnPrev, awardedBabiesBtnNext);

    awardedBabiesBtnPrev.addEventListener('click', () => scrollContainer(awardedBabiesListContainer, -awardedBabiesItemWidth));
    awardedBabiesBtnNext.addEventListener('click', () => scrollContainer(awardedBabiesListContainer, awardedBabiesItemWidth));
    awardedBabiesListContainer.addEventListener('scroll', updateAwardedBabiesButtons);

    updateAwardedBabiesButtons();
}

/**
 * Initialize demo form with submission and popup handling.
 */
function initializeDemoForm() {
    document.querySelector('.demo-btn').addEventListener('click', () => showPopup('popup-container'));
    document.querySelector('.close-btn').addEventListener('click', () => hidePopup('popup-container'));

    document.getElementById('demo-form').addEventListener('submit', async function (event) {
        event.preventDefault();
        await submitForm();
    });

    document.getElementById('popup-container').addEventListener('click', (event) => {
        if (event.target.id === 'popup-container') {
            hidePopup('popup-container');
        }
    });
}

/**
 * Helper function to get the width of an item including margin.
 */
function getItemWidth(container, selector) {
    const item = container.querySelector(selector);
    return item ? item.offsetWidth + 20 : 0; // Add margin or padding
}

/**
 * Helper function to scroll a container by a specified width.
 */
function scrollContainer(container, width) {
    container.scrollBy({
        left: width,
        behavior: 'smooth'
    });
}

/**
 * Update the visibility of scroll buttons based on container's scroll position.
 */
function updateScrollButtons(container, btnPrev, btnNext) {
    const { scrollLeft, scrollWidth, clientWidth } = container;
    btnPrev.style.display = scrollLeft === 0 ? 'none' : 'block';
    btnNext.style.display = scrollLeft + clientWidth >= scrollWidth ? 'none' : 'block';
}

/**
 * Toggle 'See All' functionality for a container.
 */
function toggleSeeAll(container, btnSeeAll, updateButtonsCallback) {
    container.classList.toggle('expanded');
    if (container.classList.contains('expanded')) {
        btnSeeAll.textContent = 'Show Less';
        btnSeeAll.previousElementSibling.style.display = 'none';
        btnSeeAll.nextElementSibling.style.display = 'none';
    } else {
        btnSeeAll.textContent = 'See All';
        updateButtonsCallback();
    }
}

/**
 * Show a popup container by adding 'show' class.
 */
function showPopup(popupId) {
    document.getElementById(popupId).classList.add('show');
}

/**
 * Hide a popup container by removing 'show' class.
 */
function hidePopup(popupId) {
    document.getElementById(popupId).classList.remove('show');
}

/**
 * Submit the demo form data.
 */
async function submitForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const countryCode = document.getElementById('country-code').value;
    const mobile = document.getElementById('phone-number').value;
    const babyStage = document.getElementById('child-stage').value;

    const formData = {
        name,
        email,
        phone: `${countryCode} ${mobile}`,
        babyStage
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
        hidePopup('popup-container');
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Error submitting form. Please try again.');
    }
}
