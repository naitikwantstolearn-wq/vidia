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
            slide.innerHTML = `<img src="${src}" alt="Promotional Banner" style="width: 100%; height: auto; display: block;">`;
            bannerContainer.appendChild(slide); });
        }
        document.querySelector('[data-img-id="header-slider-before"]')?.setAttribute('src', imageData.headerSlider.before);
        document.querySelector('[data-img-id="header-slider-before"]')?.style.setProperty('width', '100%');
        document.querySelector('[data-img-id="header-slider-before"]')?.style.setProperty('height', 'auto');
        document.querySelector('[data-img-id="header-slider-before"]')?.style.setProperty('display', 'block');

        document.querySelector('[data-img-id="header-slider-after"]')?.setAttribute('src', imageData.headerSlider.after);
        document.querySelector('[data-img-id="header-slider-after"]')?.style.setProperty('width', '100%');
        document.querySelector('[data-img-id="header-slider-after"]')?.style.setProperty('height', 'auto');
        document.querySelector('[data-img-id="header-slider-after"]')?.style.setProperty('display', 'block');

        document.querySelector('[data-img-id="btob-before"]')?.setAttribute('src', imageData.boringToBright.before);
        document.querySelector('[data-img-id="btob-before"]')?.style.setProperty('width', '100%');
        document.querySelector('[data-img-id="btob-before"]')?.style.setProperty('height', 'auto');
        document.querySelector('[data-img-id="btob-before"]')?.style.setProperty('display', 'block');

        const btobAfterCatalog = document.querySelector('[data-catalog-id="btob-after"]');
        if (btobAfterCatalog) { imageData.boringToBright.after.forEach((src, index) => {
            const img = document.createElement('img'); img.src = src;
            img.style.width = '100%';
            img.style.height = 'auto';
            img.style.display = 'block';
            if (index === 0) img.className = 'active';
            btobAfterCatalog.appendChild(img); });
        }
        function createCarouselItems(carouselId, imageArray) {
            const carousel = document.querySelector(`[data-carousel-id="${carouselId}"]`);
            if (!carousel || imageArray.length === 0) return;
            const itemsHtml = [];
            for (let i = 0; i < imageArray.length; i += 2) {
                const img1 = imageArray[i]; const img2 = imageArray[i + 1] || img1;
                itemsHtml.push(`<div class="catalog"><img src="${img1}" class="active" alt="${carouselId} image" style="width: 100%; height: auto; display: block;"><img src="${img2}" alt="${carouselId} image" style="width: 100%; height: auto; display: block;"></div>`);
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
    // == SUPABASE INTEGRATION: Form submission handler (NEW) ==
    // ===================================================================================

    // !!! IMPORTANT: Your actual Supabase Project URL and Anon Key are now inserted here !!!
    const SUPABASE_URL = 'https://avjeorytrrfnctkeetap.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2amVvcnl0cnJmbmN0a2VldGFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwMDI2MzAsImV4cCI6MjA3MjU3ODYzMH0.-3feKl1AefFW2A-Qi_sB0BoNyCvhyomIXt6031Ni0dg';
    const SUPABASE_TABLE_NAME = 'contact_messages'; // Make sure this table exists in your Supabase DB with 'name', 'email', 'message' columns.

    const { createClient } = supabase;
    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    document.addEventListener("DOMContentLoaded", () => {
        const contactForm = document.getElementById("contactForm");
        const formMessage = document.getElementById("formMessage"); // Inline feedback
        const submissionPopup = document.getElementById("submission-popup"); // Pop-up message

        if (contactForm) {
            contactForm.addEventListener("submit", async (event) => {
                event.preventDefault(); // Prevent default form submission

                formMessage.textContent = "Sending...";
                formMessage.style.color = "blue";

                const name = document.getElementById("name").value.trim();
                const email = document.getElementById("email").value.trim();
                const message = document.getElementById("message").value.trim();

                // Basic client-side validation
                if (!name || !email || !message) {
                    formMessage.textContent = "Please fill in all fields.";
                    formMessage.style.color = "red";
                    return;
                }

                try {
                    const { error } = await supabaseClient
                        .from(SUPABASE_TABLE_NAME)
                        .insert([
                            { name: name, email: email, message: message }
                        ]);

                    if (error) {
                        console.error("Supabase submission error:", error.message);
                        formMessage.textContent = `Error: ${error.message}`;
                        formMessage.style.color = "red";

                        if (submissionPopup) {
                            submissionPopup.textContent = `Error: ${error.message}`;
                            submissionPopup.style.backgroundColor = "#dc3545"; // Red
                            submissionPopup.style.opacity = "1";
                            submissionPopup.style.visibility = "visible";
                            setTimeout(() => {
                                submissionPopup.style.opacity = "0";
                                submissionPopup.style.visibility = "hidden";
                            }, 3000);
                        }
                    } else {
                        console.log("Form submitted successfully to Supabase.");
                        formMessage.textContent = ""; // Clear inline text
                        contactForm.reset(); // Reset the form

                        if (submissionPopup) {
                            submissionPopup.textContent = "Message sent successfully!";
                            submissionPopup.style.backgroundColor = "#28a745"; // Green
                            submissionPopup.style.opacity = "1";
                            submissionPopup.style.visibility = "visible";

                            setTimeout(() => {
                                submissionPopup.style.opacity = "0";
                                submissionPopup.style.visibility = "hidden";
                            }, 2000);
                        }
                    }
                } catch (error) {
                    console.error("Network error during submission:", error);
                    formMessage.textContent = "Network error. Please try again.";
                    formMessage.style.color = "red";

                    if (submissionPopup) {
                        submissionPopup.textContent = "Network error!";
                        submissionPopup.style.backgroundColor = "#dc3545"; // Red
                        submissionPopup.style.opacity = "1";
                        submissionPopup.style.visibility = "visible";
                        setTimeout(() => {
                            submissionPopup.style.opacity = "0";
                            submissionPopup.style.visibility = "hidden";
                        }, 3000);
                    }
                }
            });
        } else {
            console.error("Form with ID 'contactForm' not found, Supabase integration aborted.");
        }
    });
});
