// ============================================ //
// HALDEN — SHARED JAVASCRIPT (DEFENSIVE)      //
// ============================================ //

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    // ========================================== //
    // NAVIGATION — HIDE/SHOW ON SCROLL          //
    // ========================================== //
    const navbar = document.getElementById("navbar");
    let lastScrollY = window.scrollY;

    if (navbar) {
        window.addEventListener("scroll", function () {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 80) {
                navbar.classList.add("hidden");
            } else {
                navbar.classList.remove("hidden");
            }
            lastScrollY = currentScrollY;
        });
    }

    // ========================================== //
    // BACK TO TOP BUTTON                         //
    // ========================================== //
    const backToTop = document.getElementById("backToTop");

    if (backToTop) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 500) {
                backToTop.classList.add("visible");
            } else {
                backToTop.classList.remove("visible");
            }
        });

        backToTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // ========================================== //
    // HAMBURGER MENU                             //
    // ========================================== //
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", function () {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
        });
    }

    // ========================================== //
    // SERVICE METHODOLOGY BUTTONS                //
    // ========================================== //
    const methodologyBtns = document.querySelectorAll(".methodology-btn");
    const methodContents = document.querySelectorAll(".method-content");

    if (methodologyBtns.length > 0 && methodContents.length > 0) {
        methodologyBtns.forEach(function (btn) {
            btn.addEventListener("click", function () {
                methodologyBtns.forEach(function (b) {
                    b.classList.remove("active");
                    b.setAttribute("aria-selected", "false");
                });
                this.classList.add("active");
                this.setAttribute("aria-selected", "true");

                const targetId = this.getAttribute("data-method");
                if (targetId) {
                    methodContents.forEach(function (content) {
                        content.classList.remove("active");
                    });
                    const activeContent = document.getElementById("method-" + targetId);
                    if (activeContent) {
                        activeContent.classList.add("active");
                    }
                }
            });
        });
    }

    // ========================================== //
    // CONTACT FORM                               //
    // ========================================== //
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = document.getElementById("name");
            const email = document.getElementById("email");
            const message = document.getElementById("message");

            if (name && email && message) {
                if (name.value.trim() && email.value.trim() && message.value.trim()) {
                    alert("Thank you for your message! We'll get back to you soon.");
                    contactForm.reset();
                } else {
                    alert("Please fill in all required fields.");
                }
            } else {
                alert("Please fill in all required fields.");
            }
        });
    }

    // ========================================== //
    // LUXURY SERVICES — HOVER ANIMATION          //
    // ========================================== //
    const luxuryServices = document.querySelectorAll(".luxury-service");

    if (luxuryServices.length > 0) {
        luxuryServices.forEach(function (service) {
            service.addEventListener("mouseenter", function () {
                const number = this.querySelector(".service-number");
                if (number) number.style.color = "#A8793F";
                const content = this.querySelector(".service-content h3");
                if (content) content.style.color = "#A8793F";
                const arrow = this.querySelector(".service-arrow");
                if (arrow) {
                    arrow.style.color = "#A8793F";
                    arrow.style.transform = "translateX(8px)";
                }
            });

            service.addEventListener("mouseleave", function () {
                const number = this.querySelector(".service-number");
                if (number) number.style.color = "";
                const content = this.querySelector(".service-content h3");
                if (content) content.style.color = "";
                const arrow = this.querySelector(".service-arrow");
                if (arrow) {
                    arrow.style.color = "";
                    arrow.style.transform = "";
                }
            });
        });
    }

    // ========================================== //
    // PROJECT CARDS — CLICK INTERACTION          //
    // ========================================== //
    const projectCards = document.querySelectorAll(".project-card");

    if (projectCards.length > 0) {
        projectCards.forEach(function (card) {
            card.addEventListener("click", function () {
                const projectId = this.getAttribute("data-project");
                if (projectId) {
                    console.log("Project clicked:", projectId);
                }
            });
        });
    }

    // ========================================== //
    // SMOOTH SCROLL FOR INTERNAL LINKS           //
    // ========================================== //
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    if (internalLinks.length > 0) {
        internalLinks.forEach(function (link) {
            link.addEventListener("click", function (e) {
                const targetId = this.getAttribute("href");
                if (targetId && targetId !== "#") {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        e.preventDefault();
                        targetElement.scrollIntoView({ behavior: "smooth" });
                    }
                }
            });
        });
    }

    // ========================================== //
    // ANIMATED COUNTER                           //
    // ========================================== //
    const statNumbers = document.querySelectorAll(".stat-number");

    if (statNumbers.length > 0) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.textContent, 10) || 0;
                    let current = 0;
                    const increment = Math.ceil(target / 40);
                    const timer = setInterval(function () {
                        current += increment;
                        if (current >= target) {
                            el.textContent = target + (el.textContent.includes("+") ? "+" : "");
                            clearInterval(timer);
                        } else {
                            el.textContent = current + (el.textContent.includes("+") ? "+" : "");
                        }
                    }, 30);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(function (stat) {
            observer.observe(stat);
        });
    }

    // ========================================== //
    // LUXURY SERVICES — ARROW HOVER              //
    // ========================================== //
    const serviceArrows = document.querySelectorAll(".service-arrow");

    if (serviceArrows.length > 0) {
        serviceArrows.forEach(function (arrow) {
            arrow.addEventListener("mouseenter", function () {
                const icon = this.querySelector("i");
                if (icon) {
                    icon.style.transform = "translateX(4px)";
                    icon.style.transition = "transform 0.3s ease";
                }
            });

            arrow.addEventListener("mouseleave", function () {
                const icon = this.querySelector("i");
                if (icon) {
                    icon.style.transform = "translateX(0)";
                }
            });
        });
    }

    // ========================================== //
    // SCROLL PROGRESS INDICATOR                  //
    // ========================================== //
    const scrollLine = document.querySelector(".hero-scroll-progress");

    if (scrollLine) {
        window.addEventListener("scroll", function () {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollLine.style.height = scrollPercent + "%";
        });
    }

    console.log("Halden — Script loaded successfully (defensive mode)");
});