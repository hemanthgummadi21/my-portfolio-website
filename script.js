/* === Mobile Hamburger Menu === */
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

// This check is new - it prevents errors on the V5 layout
if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });
}

// Close menu when a link is clicked
if (navLinks) {
    navLinks.forEach(link => link.addEventListener("click", () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }
    }));
}


/* === Scroll to Top Button === */
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (scrollTopBtn) {
        // Show button after scrolling 100px
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scrollTopBtn.style.display = "block";
        } else {
            scrollTopBtn.style.display = "none";
        }
    }
}

/* === Fade-in Sections on Scroll === */
const hiddenElements = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } 
        // Optional: to make it re-animate every time
        // else {
        //     entry.target.classList.remove("show");
        // }
    });
}, {
    threshold: 0.1 // Trigger when 10% of the element is visible
});

hiddenElements.forEach((el) => observer.observe(el));

/* === Active Nav Link Highlighting on Scroll === */
const sections = document.querySelectorAll(".section"); // All sections
const allNavLinks = document.querySelectorAll(".nav-menu a"); // All nav links

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Get the ID of the visible section
            const id = entry.target.getAttribute("id");
            
            // Remove 'active' from all links
            allNavLinks.forEach(link => {
                link.classList.remove("active");
            });

            // Add 'active' to the matching link
            // We use querySelector(`a[href*="${id}"]`) to find the link
            const activeLink = document.querySelector(`.nav-menu a[href*="${id}"]`);
            if (activeLink) {
                activeLink.classList.add("active");
            }
        }
    });
}, {
    rootMargin: "-20% 0px -80% 0px", // Only triggers when section is in a narrow band at the top of the viewport
    threshold: 0
});

sections.forEach(section => {
    navObserver.observe(section);
});