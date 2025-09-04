// ===================================================================================
// == IMAGE DATABASE: This is the ONLY place you need to edit your image paths. ==
// ===================================================================================
const imageData = {
    banners: [
        "img-src/banner-1.png", "img-src/banner-2.png",
        "img-src/banner-3.png", "img-src/banner-4.png"
    ],
    headerSlider: {
        before: "img-src/image-31.png",
        after: "img-src/image-32.png"
    },
    boringToBright: {
        before: "img-src/image-1.png",
        after: [
            "img-src/image-2.png", "img-src/image-3.png", "img-src/image-4.png",
            "img-src/image-5.png", "img-src/image-6.png"
        ]
    },
    consistencyCarousel: [
        "img-src/image-7.png", "img-src/image-8.png", "img-src/image-9.png", "img-src/image-10.png",
        "img-src/image-11.png", "img-src/image-12.png", "img-src/image-13.png", "img-src/image-14.png"
    ],
    qualityCarousel: [
        "img-src/image-15.png", "img-src/image-16.png", "img-src/image-17.png", "img-src/image-18.png",
        "img-src/image-19.png", "img-src/image-20.png", "img-src/image-21.png", "img-src/image-22.png"
    ],
    posesCarousel: [
        "img-src/image-23.png", "img-src/image-24.png", "img-src/image-25.png", "img-src/image-26.png",
        "img-src/image-27.png", "img-src/image-28.png", "img-src/image-29.png", "img-src/image-30.png"
    ]
};

// ===================================================================================
// == MAIN SCRIPT: This code automatically builds and animates the page. ==
// ===================================================================================
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. POPULATE ALL IMAGES FROM THE DATABASE ---
    function populateImages() {
        const bannerContainer = document.querySelector('#header-slideshow .slides-container');
        if (bannerContainer) { imageData.banners.forEach(src => {
            const slide = document.createElement('div'); slide.className = 'slide';
            slide.innerHTML = `<img src="${src}" alt="Promotional Banner">`;
            bannerContainer.appendChild(slide); });
        }
        document.querySelector('[data-img-id="header-slider-before"]')?.setAttribute('src', imageData.headerSlider.before);
        document.querySelector('[data-img-id="header-slider-after"]')?.setAttribute('src', imageData.headerSlider.after);
        document.querySelector('[data-img-id="btob-before"]')?.setAttribute('src', imageData.boringToBright.before);
        const btobAfterCatalog = document.querySelector('[data-catalog-id="btob-after"]');
        if (btobAfterCatalog) { imageData.boringToBright.after.forEach((src, index) => {
            const img = document.createElement('img'); img.src = src;
            if (index === 0) img.className = 'active';
            btobAfterCatalog.appendChild(img); });
        }
        function createCarouselItems(carouselId, imageArray) {
            const carousel = document.querySelector(`[data-carousel-id="${carouselId}"]`);
            if (!carousel || imageArray.length === 0) return;
            const itemsHtml = [];
            for (let i = 0; i < imageArray.length; i += 2) {
                const img1 = imageArray[i]; const img2 = imageArray[i + 1] || img1;
                itemsHtml.push(`<div class="catalog"><img src="${img1}" class="active" alt="${carouselId} image"><img src="${img2}" alt="${carouselId} image"></div>`);
            }
            carousel.innerHTML = itemsHtml.join('') + itemsHtml.join('');
        }
        createCarouselItems('consistency', imageData.consistencyCarousel);
        createCarouselItems('quality', imageData.qualityCarousel);
        createCarouselItems('poses', imageData.posesCarousel);
    }
    populateImages();

    // --- 2. INITIALIZE BANNER SLIDESHOW ---
    const slideshow = document.getElementById('header-slideshow');
    if (slideshow) {
        const slidesContainer = slideshow.querySelector('.slides-container'); const slides = slideshow.querySelectorAll('.slide');
        const dotsContainer = slideshow.querySelector('.nav-dots'); const prevBtn = slideshow.querySelector('.prev');
        const nextBtn = slideshow.querySelector('.next'); let currentIndex = 0; let slideInterval;
        if (slides.length > 0) {
             slides.forEach((_, index) => {
                const dot = document.createElement('div'); dot.classList.add('dot'); if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => { showSlide(index); resetInterval(); });
                dotsContainer.appendChild(dot);
            });
            const dots = dotsContainer.querySelectorAll('.dot');
            function showSlide(index) {
                slidesContainer.style.transform = `translateX(-${index * 100}%)`;
                dots[currentIndex]?.classList.remove('active'); currentIndex = index; dots[currentIndex]?.classList.add('active');
            }
            function nextSlide() { showSlide((currentIndex + 1) % slides.length); }
            function prevSlide() { showSlide((currentIndex - 1 + slides.length) % slides.length); }
            function startInterval() { slideInterval = setInterval(nextSlide, 4000); }
            function resetInterval() { clearInterval(slideInterval); startInterval(); }
            nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
            prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });
            startInterval();
        }
    }

    // --- 3. INITIALIZE HEADER COMPARISON SLIDER ---
    const comparisonSlider = document.getElementById('header-comparison-slider');
    if (comparisonSlider) {
        const afterImage = comparisonSlider.querySelector('.comparison-after');
        const handle = comparisonSlider.querySelector('.slider-handle'); let isDragging = false;
        const startDrag = (e) => { e.preventDefault(); isDragging = true; };
        const stopDrag = () => { isDragging = false; };
        const onDrag = (e) => {
            if (!isDragging) return;
            const clientX = e.clientX || (e.touches && e.touches[0].clientX); if (clientX === undefined) return;
            const rect = comparisonSlider.getBoundingClientRect();
            let width = Math.max(0, Math.min(clientX - rect.left, rect.width));
            let percentage = (width / rect.width) * 100;
            handle.style.left = `${percentage}%`; afterImage.style.clipPath = `inset(0 0 0 ${percentage}%)`;
        };
        handle.addEventListener('mousedown', startDrag); document.addEventListener('mouseup', stopDrag); document.addEventListener('mousemove', onDrag);
        handle.addEventListener('touchstart', startDrag); document.addEventListener('touchend', stopDrag); document.addEventListener('touchmove', onDrag);
    }

    // --- 4. INITIALIZE LOOPING IMAGES INSIDE CATALOG BOXES ---
    document.querySelectorAll('.catalog').forEach(catalog => {
        const images = catalog.querySelectorAll('img'); if (images.length <= 1) return; let current = 0;
        setInterval(() => {
            images[current].classList.remove('active'); current = (current + 1) % images.length; images[current].classList.add('active');
        }, 2500);
    });
    
    // --- 5. INITIALIZE FADE-IN ON SCROLL ANIMATION ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in-section').forEach(section => { observer.observe(section); });


    // ===================================================================================
    // == NETLIFY FORMS INTEGRATION: New code for form submission ==
    // ===================================================================================

    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage'); // For in-form messages
    const submissionPopup = document.getElementById('submission-popup'); // For the pop-up

    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevents default form submission to handle it via fetch

            formMessage.textContent = 'Sending...';
            formMessage.style.color = 'blue';

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Basic client-side validation
            if (!name || !email || !message) {
                formMessage.textContent = 'Please fill in all fields.';
                formMessage.style.color = 'red';
                return;
            }

            // Create FormData object from the form
            const formData = new FormData(contactForm);

            try {
                // Submit the form data to Netlify Forms endpoint using fetch
                // The URL '/' tells Netlify to process the form on the current page
                const response = await fetch('/', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    console.log('Form submitted successfully to Netlify.');
                    formMessage.textContent = ''; // Clear in-form message for pop-up clarity
                    contactForm.reset(); // Clear the form on successful submission

                    // Show the success pop-up
                    if (submissionPopup) {
                        submissionPopup.textContent = 'Message sent successfully!';
                        submissionPopup.style.backgroundColor = '#28a745'; // Green for success
                        submissionPopup.style.opacity = '1';
                        submissionPopup.style.visibility = 'visible';

                        setTimeout(() => {
                            submissionPopup.style.opacity = '0';
                            submissionPopup.style.visibility = 'hidden';
                        }, 2000); // Hide after 2 seconds
                    }
                } else {
                    const errorText = await response.text(); // Try to get more detailed error
                    console.error('Netlify Form submission error:', response.status, errorText);
                    formMessage.textContent = `Error submitting form. Status: ${response.status}. Please try again.`;
                    formMessage.style.color = 'red';

                    // Show error pop-up
                    if (submissionPopup) {
                        submissionPopup.textContent = `Error: ${response.status}. Please try again.`;
                        submissionPopup.style.backgroundColor = '#dc3545'; // Red for error
                        submissionPopup.style.opacity = '1';
                        submissionPopup.style.visibility = 'visible';
                        setTimeout(() => {
                            submissionPopup.style.opacity = '0';
                            submissionPopup.style.visibility = 'hidden';
                        }, 3000); // Keep error messages a bit longer
                    }
                }
            } catch (error) {
                console.error('Network or unexpected error during submission:', error);
                formMessage.textContent = 'An unexpected error occurred. Check your network connection.';
                formMessage.style.color = 'red';

                // Also show unexpected error in pop-up
                if (submissionPopup) {
                    submissionPopup.textContent = 'An unexpected error occurred!';
                    submissionPopup.style.backgroundColor = '#dc3545'; // Red for error
                    submissionPopup.style.opacity = '1';
                    submissionPopup.style.visibility = 'visible';
                    setTimeout(() => {
                        submissionPopup.style.opacity = '0';
                        submissionPopup.style.visibility = 'hidden';
                    }, 3000); // Keep error messages a bit longer
                }
            }
        });
    } else {
        console.error("Form with ID 'contactForm' not found, Netlify Forms integration aborted.");
    }
});