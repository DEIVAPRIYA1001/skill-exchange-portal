/* ============================================
   SKILL EXCHANGE PORTAL - COMPLETE JAVASCRIPT
   Assignment 1 & 2 Combined
   ============================================ */

// ========== DASHBOARD COUNTERS ==========
const stats = {
    users: 1500,
    activeUsers: 950,
    skills: 2200,
    requests: 1800,
    sessions: 500,
    tasks: 75
};

function animateCounter(id, target) {
    let count = 0;
    const increment = Math.ceil(target / 100);

    const interval = setInterval(() => {
        count += increment;

        if (count >= target) {
            count = target;
            clearInterval(interval);
        }

        const element = document.getElementById(id);
        if (element) {
            element.innerText = count.toLocaleString();
        }
    }, 20);
}

window.addEventListener("load", () => {
    animateCounter("users", stats.users);
    animateCounter("activeUsers", stats.activeUsers);
    animateCounter("skills", stats.skills);
    animateCounter("requests", stats.requests);
    animateCounter("sessions", stats.sessions);
    animateCounter("tasks", stats.tasks);
});

// ========== DATE AND TIME ==========
function updateClock() {
    const clock = document.getElementById("clock");

    if (clock) {
        const now = new Date();

        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        };

        clock.innerHTML = now.toLocaleString("en-IN", options);
    }
}

updateClock();
setInterval(updateClock, 1000);

// ========== DARK MODE ==========
const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {
    // Load saved theme
    const savedTheme = localStorage.getItem("theme") || "light";
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeBtn.innerHTML = "☀️ Light Mode";
    }

    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            themeBtn.innerHTML = "☀️ Light Mode";
            localStorage.setItem("theme", "dark");
        } else {
            themeBtn.innerHTML = "🌙 Dark Mode";
            localStorage.setItem("theme", "light");
        }
    });
}

// ========== NOTIFICATION PANEL ==========
function toggleNotification() {
    const notificationBox = document.getElementById("notificationBox");

    if (notificationBox) {
        notificationBox.classList.toggle("hidden");
    }
}

// Auto-hide notifications after 10 seconds
setTimeout(() => {
    const notificationBox = document.getElementById("notificationBox");
    if (notificationBox && !notificationBox.classList.contains("hidden")) {
        notificationBox.classList.add("hidden");
    }
}, 10000);

// ========== FORM VALIDATION ==========
const form = document.getElementById("registerForm");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Clear previous errors
        document.querySelectorAll(".error-msg").forEach(msg => msg.classList.remove("show"));
        document.querySelectorAll(".form-group").forEach(group => group.classList.remove("error"));

        // Get values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();
        const dob = document.getElementById("dob").value;
        const address = document.getElementById("address").value.trim();
        const gender = document.querySelector('input[name="gender"]:checked');

        // Patterns
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^[0-9]{10}$/;
        const namePattern = /^[a-zA-Z\s]{3,}$/;

        let isValid = true;

        // Name validation
        if (!namePattern.test(name)) {
            showError("nameError", "Name must contain at least 3 characters (letters only)");
            isValid = false;
        }

        // Email validation
        if (!emailPattern.test(email)) {
            showError("emailError", "Please enter a valid email address");
            isValid = false;
        }

        // Phone validation
        if (!phonePattern.test(phone)) {
            showError("phoneError", "Phone number must contain exactly 10 digits");
            isValid = false;
        }

        // Password validation
        if (password.length < 6) {
            showError("passwordError", "Password must contain at least 6 characters");
            isValid = false;
        }

        // Confirm password validation
        if (password !== confirmPassword) {
            showError("confirmPasswordError", "Passwords do not match");
            isValid = false;
        }

        // DOB validation
        if (dob === "") {
            showError("dobError", "Please select your date of birth");
            isValid = false;
        }

        // Address validation
        if (address.length < 10) {
            showError("addressError", "Address must be at least 10 characters");
            isValid = false;
        }

        // Gender validation
        if (!gender) {
            showError("genderError", "Please select your gender");
            isValid = false;
        }

        if (isValid) {
            showSuccessAlert("Registration Successful! Welcome to Skill Exchange Portal");
            form.reset();
            setTimeout(() => {
                location.reload();
            }, 2000);
        }
    });
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add("show");
        errorElement.parentElement.classList.add("error");
    }
}

function showSuccessAlert(message) {
    const alert = document.createElement("div");
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981, #06b6d4);
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideUpAnimation 0.3s ease;
    `;
    alert.innerText = "✓ " + message;
    document.body.appendChild(alert);

    setTimeout(() => {
        alert.remove();
    }, 3000);
}

// ========== SCROLL TO TOP BUTTON ==========
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
    if (topBtn) {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            topBtn.classList.add("show");
        } else {
            topBtn.classList.remove("show");
        }
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// ========== NAVIGATION ACTIVE STATE ==========
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {
    link.addEventListener("click", function () {
        navLinks.forEach(item => item.classList.remove("active"));
        this.classList.add("active");

        // Close mobile menu
        const navMenu = document.querySelector(".nav-menu");
        if (navMenu) {
            navMenu.classList.remove("active");
        }
    });
});

// ========== MOBILE MENU TOGGLE ==========
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger) {
    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
}

// ========== IMAGE SLIDER ==========
let currentSlideIndex = 0;

function changeSlide(n) {
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    currentSlideIndex += n;

    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }

    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slides[currentSlideIndex].classList.add("active");
    dots[currentSlideIndex].classList.add("active");
}

function currentSlide(n) {
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    currentSlideIndex = n;

    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slides[currentSlideIndex].classList.add("active");
    dots[currentSlideIndex].classList.add("active");
}

// Auto-advance slider every 5 seconds
setInterval(() => {
    changeSlide(1);
}, 5000);

// ========== SMOOTH SCROLL FOR NAVIGATION ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ========== FORM INPUT ANIMATIONS ==========
const formInputs = document.querySelectorAll("input, textarea");

formInputs.forEach(input => {
    input.addEventListener("focus", function () {
        this.parentElement.style.transform = "translateY(-2px)";
    });

    input.addEventListener("blur", function () {
        this.parentElement.style.transform = "translateY(0)";
    });
});

// ========== INTERSECTION OBSERVER FOR ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = "none";
            entry.target.offsetHeight; // Trigger reflow
            
            if (entry.target.classList.contains("zoom-in")) {
                entry.target.style.animation = "zoom-in 0.6s ease";
            } else if (entry.target.classList.contains("bounce-animation")) {
                entry.target.style.animation = "bounce-animation 1s ease-in-out";
            } else if (entry.target.classList.contains("pulse-animation")) {
                entry.target.style.animation = "pulse-animation 2s ease-in-out infinite";
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe animated elements
document.querySelectorAll(".card, .features-list li, .services-list li").forEach(el => {
    observer.observe(el);
});

// ========== PAGE PERFORMANCE MONITORING ==========
window.addEventListener("load", () => {
    const perfData = performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log("Page Load Time: " + pageLoadTime + "ms");
});

// ========== CONSOLE WELCOME MESSAGE ==========
console.log("%c🎓 Skill Exchange Portal", "font-size: 20px; font-weight: bold; color: #2563eb;");
console.log("%cAssignment 1 & 2 - Full Stack Development", "font-size: 14px; color: #7c3aed;");
console.log("%c✓ All features loaded successfully!", "color: #10b981; font-weight: bold;");

// ========== ACCESSIBILITY FEATURES ==========
// Add keyboard navigation for cards
document.querySelectorAll(".card").forEach((card, index) => {
    card.setAttribute("tabindex", index);

    card.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            this.click();
        }
    });
});

// ========== RESPONSIVE IMAGE HANDLING ==========
function handleResponsiveImages() {
    const images = document.querySelectorAll("img");
    images.forEach(img => {
        img.addEventListener("load", function () {
            this.style.transition = "0.3s ease";
        });
    });
}

handleResponsiveImages();

// ========== STORAGE FUNCTIONALITY ==========
// Save user preferences
function saveUserPreference(key, value) {
    localStorage.setItem(key, value);
}

function getUserPreference(key) {
    return localStorage.getItem(key);
}

// ========== INITIALIZATION ==========
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM Content Loaded - Initializing application...");
    
    // Initialize all features
    updateClock();
    
    // Check for saved preferences
    const theme = getUserPreference("theme");
    if (theme === "dark") {
        document.body.classList.add("dark-mode");
        if (themeBtn) themeBtn.innerHTML = "☀️ Light Mode";
    }
});