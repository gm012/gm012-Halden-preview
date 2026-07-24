// ================================================================
// ===== NAVIGATION =====
// ================================================================

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navbar = document.getElementById('navbar');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

// ================================================================
// ===== OPTIMIZED SCROLL HANDLING =====
// ================================================================

const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a:not(.nav-cta)');
const backToTop = document.getElementById('backToTop');
const heroVideo = document.querySelector('#bgVideo');

let lastScrollY = window.scrollY;
let ticking = false;

function handleScroll() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 120) {
        if (currentScrollY > lastScrollY) {
            navbar.classList.add('nav-hidden');
        } else {
            navbar.classList.remove('nav-hidden');
        }
    } else {
        navbar.classList.remove('nav-hidden');
    }
    
    lastScrollY = currentScrollY;

    if (sections.length > 0) {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.id;
            }
        });

        navAnchors.forEach(anchor => {
            anchor.classList.remove('active');
            if (anchor.href.includes(current)) {
                anchor.classList.add('active');
            }
        });
    }

    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }

    if (heroVideo) {
        const scroll = window.scrollY;
        heroVideo.style.transform = `translateY(${scroll * 0.15}px) scale(1.1)`;
    }
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
        });
        ticking = true;
    }
});

// ================================================================
// ===== BACK TO TOP =====
// ================================================================

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ================================================================
// ===== LUXURY SERVICE CLICK - HOME PAGE =====
// ================================================================

document.querySelectorAll('.luxury-service').forEach(service => {
    const link = service.querySelector('.service-arrow');
    if (link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#' && href !== '') {
                return;
            }
            e.preventDefault();
            const serviceId = this.getAttribute('data-service');
            alert(`🔍 Service ${serviceId} detail page coming soon!\n\nThis will lead to a dedicated page with full service details.`);
        });
    }
    
    service.addEventListener('click', function(e) {
        if (e.target.closest('.service-arrow')) return;
        const link = this.querySelector('.service-arrow');
        if (link) {
            const href = link.getAttribute('href');
            if (href && href !== '#' && href !== '') {
                window.location.href = href;
                return;
            }
            const serviceId = this.getAttribute('data-service');
            alert(`🔍 Service ${serviceId} detail page coming soon!`);
        }
    });
});

// ================================================================
// ===== SERVICE CARD CLICK - SERVICES PAGE =====
// ================================================================

document.querySelectorAll('.service-card-full .btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href !== '#' && href !== '') {
            return;
        }
        e.preventDefault();
        console.log('🔍 Service card clicked');
    });
});

// ================================================================
// ===== CONTACT FORM =====
// ================================================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            alert('⚠️ Please fill in all required fields.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('⚠️ Please enter a valid email address.');
            return;
        }

        alert(`✅ Thanks ${name}! Your message has been sent.\n\nWe'll get back to you within 24 hours.`);
        contactForm.reset();
    });
}

// ================================================================
// ===== SMOOTH SCROLL =====
// ================================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            navbar.classList.remove('nav-hidden');
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ================================================================
// ===== SCROLL REVEAL ANIMATIONS =====
// ================================================================

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.why-item').forEach(el => {
    observer.observe(el);
});

document.querySelectorAll('.timeline-item').forEach(el => {
    observer.observe(el);
});

// ================================================================
// ===== CONTACT PAGE - AUTO-FILL DATE =====
// ================================================================

const dateElement = document.getElementById('currentDate');
if (dateElement) {
    const now = new Date();
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    dateElement.textContent = now.toLocaleDateString('en-ZA', options);
}

// ================================================================
// ===== PROJECTS PAGE - FILTER SYSTEM =====
// ================================================================

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// ================================================================
// ===== PROJECTS PAGE - STATISTICS COUNTER ANIMATION =====
// ================================================================

const statNumbers = document.querySelectorAll('.stat-number');

if (statNumbers.length > 0) {
    const statsObserverOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.getAttribute('data-count'));
                let current = 0;
                const increment = Math.ceil(count / 40);
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= count) {
                        target.textContent = count + '+';
                        clearInterval(timer);
                    } else {
                        target.textContent = current + '+';
                    }
                }, 30);
                
                statsObserver.unobserve(target);
            }
        });
    }, statsObserverOptions);

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// ================================================================
// ===== PROJECT MAP - IMAGE BASED =====
// ================================================================

const projectData = {
    johannesburg: {
        title: "Commercial Office Development",
        location: "Johannesburg, Gauteng",
        number: "01",
        services: ["Documentation", "Compliance", "Council Approval"],
        year: "2025",
        client: "Private Developer",
        link: "project-commercial-office.html"
    },
    pretoria: {
        title: "Industrial Warehousing Facility",
        location: "Pretoria, Gauteng",
        number: "02",
        services: ["Documentation", "Council Approval", "Consultancy"],
        year: "2025",
        client: "Logistics Group",
        link: "project-industrial-warehouse.html"
    },
    durban: {
        title: "Retail Shopping Centre",
        location: "Durban, KwaZulu-Natal",
        number: "03",
        services: ["Documentation", "Compliance", "Fit-Out"],
        year: "2024",
        client: "Retail Investment Trust",
        link: "project-retail-centre.html"
    },
    capetown: {
        title: "Luxury Residential Estate",
        location: "Cape Town, Western Cape",
        number: "04",
        services: ["Documentation", "Compliance", "Consultancy"],
        year: "2024",
        client: "Private Developer",
        link: "project-residential-estate.html"
    },
    gqeberha: {
        title: "Documentation Recovery & Compliance",
        location: "Gqeberha, Eastern Cape",
        number: "05",
        services: ["Documentation Recovery", "Compliance", "Consultancy"],
        year: "2023",
        client: "Industrial Property Fund",
        link: "project-compliance-recovery.html"
    },
    bloemfontein: {
        title: "Boutique Hotel & Spa",
        location: "Bloemfontein, Free State",
        number: "06",
        services: ["Documentation", "Compliance", "Consultancy"],
        year: "2023",
        client: "Hospitality Investment Group",
        link: "project-boutique-hotel.html"
    }
};

// Map DOM Elements
const mapDots = document.querySelectorAll('.map-dot');
const projectPanel = document.getElementById('projectPanel');
const panelClose = document.getElementById('panelClose');
const panelNumber = document.getElementById('panelNumber');
const panelLocation = document.getElementById('panelLocation');
const panelTitle = document.getElementById('panelTitle');
const panelYear = document.getElementById('panelYear');
const panelClient = document.getElementById('panelClient');
const panelServices = document.getElementById('panelServices');
const panelLink = document.getElementById('panelLink');
const panelLoading = document.getElementById('panelLoading');
const panelData = document.getElementById('panelData');
const dimOverlay = document.getElementById('mapDimOverlay');

// Load project data function
function loadProject(projectKey) {
    const data = projectData[projectKey];
    
    if (!data) return;
    
    panelLoading.style.display = 'flex';
    panelData.style.display = 'none';
    projectPanel.classList.add('active');
    if (dimOverlay) dimOverlay.classList.add('active');
    
    mapDots.forEach(d => d.classList.remove('active'));
    const activeDot = document.querySelector(`.map-dot[data-project="${projectKey}"]`);
    if (activeDot) activeDot.classList.add('active');
    
    setTimeout(() => {
        panelNumber.textContent = data.number;
        panelLocation.textContent = data.location;
        panelTitle.textContent = data.title;
        panelYear.textContent = data.year;
        panelClient.textContent = data.client;
        
        panelServices.innerHTML = '';
        data.services.forEach(service => {
            const span = document.createElement('span');
            span.textContent = service;
            panelServices.appendChild(span);
        });
        
        panelLink.href = data.link;
        
        panelLoading.style.display = 'none';
        panelData.style.display = 'block';
    }, 400);
}

// Map dot click handlers
if (mapDots.length > 0) {
    mapDots.forEach(dot => {
        dot.addEventListener('click', function(e) {
            e.stopPropagation();
            const location = this.getAttribute('data-project');
            loadProject(location);
        });
    });
}

// Close panel
if (panelClose) {
    panelClose.addEventListener('click', function() {
        projectPanel.classList.remove('active');
        if (dimOverlay) dimOverlay.classList.remove('active');
        mapDots.forEach(d => d.classList.remove('active'));
        panelData.style.display = 'none';
        panelLoading.style.display = 'flex';
    });
}

// Close panel on outside click
document.addEventListener('click', function(e) {
    if (projectPanel && projectPanel.classList.contains('active')) {
        const isDot = e.target.closest('.map-dot');
        const isPanel = e.target.closest('.project-panel');
        const isClose = e.target.closest('.panel-close');
        if (!isDot && !isPanel && !isClose) {
            projectPanel.classList.remove('active');
            if (dimOverlay) dimOverlay.classList.remove('active');
            mapDots.forEach(d => d.classList.remove('active'));
            panelData.style.display = 'none';
            panelLoading.style.display = 'flex';
        }
    }
});

// Escape key to close panel
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (projectPanel) {
            projectPanel.classList.remove('active');
            if (dimOverlay) dimOverlay.classList.remove('active');
            mapDots.forEach(d => d.classList.remove('active'));
            panelData.style.display = 'none';
            panelLoading.style.display = 'flex';
        }
    }
});

// ================================================================
// ===== PROJECT CARD MODAL (FIXED - NO CLONING) =====
// ================================================================

const projectModalData = {
    'commercial-office': {
        number: '01',
        tag: 'Commercial',
        title: 'Commercial Office Development',
        location: 'Johannesburg, Gauteng',
        video: 'images/Commercial Office Development.mp4',
        description: 'A commercial redevelopment requiring full documentation coordination, municipal submission support and construction compliance.',
        services: ['Documentation', 'Compliance', 'Council Approval'],
        link: 'project-commercial-office.html'
    },
    'residential-estate': {
        number: '02',
        tag: 'Residential',
        title: 'Luxury Residential Estate',
        location: 'Cape Town, Western Cape',
        video: 'images/Luxury Residential Estate.mp4',
        description: 'A luxury residential estate development requiring comprehensive documentation and compliance support for phased construction.',
        services: ['Documentation', 'Compliance', 'Consultancy'],
        link: 'project-residential-estate.html'
    },
    'retail-centre': {
        number: '03',
        tag: 'Retail',
        title: 'Retail Shopping Centre',
        location: 'Durban, KwaZulu-Natal',
        video: 'images/Retail Shopping Centre.mp4',
        description: 'A retail shopping centre development requiring fit-out documentation and compliance verification.',
        services: ['Documentation', 'Compliance', 'Fit-Out'],
        link: 'project-retail-centre.html'
    },
    'industrial-warehouse': {
        number: '04',
        tag: 'Industrial',
        title: 'Industrial Warehousing Facility',
        location: 'Pretoria, Gauteng',
        video: 'images/Industrial Warehousing Facility.mp4',
        description: 'An industrial warehousing facility requiring council approval support and technical documentation.',
        services: ['Documentation', 'Council Approval', 'Consultancy'],
        link: 'project-industrial-warehouse.html'
    },
    'boutique-hotel': {
        number: '05',
        tag: 'Hospitality',
        title: 'Boutique Hotel & Spa',
        location: 'Stellenbosch, Western Cape',
        video: 'images/Boutique Hotel & Spa.mp4',
        description: 'A boutique hotel and spa development requiring consultancy and compliance support.',
        services: ['Documentation', 'Compliance', 'Consultancy'],
        link: 'project-boutique-hotel.html'
    },
    'compliance-recovery': {
        number: '06',
        tag: 'Compliance',
        title: 'Documentation Recovery & Compliance',
        location: 'Multiple Locations',
        video: 'images/Documentation Recovery & Compliance.mp4',
        description: 'A documentation recovery and compliance project across multiple locations requiring comprehensive record reconstruction.',
        services: ['Documentation Recovery', 'Compliance', 'Consultancy'],
        link: 'project-compliance-recovery.html'
    }
};

// Modal elements
const modal = document.getElementById('projectModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalVideo = document.getElementById('modalVideo');
const modalNumber = document.getElementById('modalNumber');
const modalTag = document.getElementById('modalTag');
const modalTitle = document.getElementById('modalTitle');
const modalLocation = document.getElementById('modalLocation');
const modalDescription = document.getElementById('modalDescription');
const modalServices = document.getElementById('modalServices');
const modalLink = document.getElementById('modalLink');

// Open modal function
function openProjectModal(projectKey) {
    const data = projectModalData[projectKey];
    if (!data) {
        console.log('❌ No data found for:', projectKey);
        return;
    }

    console.log('✅ Opening modal for:', projectKey);

    modalNumber.textContent = data.number;
    modalTag.textContent = data.tag;
    modalTitle.textContent = data.title;
    modalLocation.textContent = data.location;
    
    // Set video source
    const videoSource = modalVideo.querySelector('source');
    if (videoSource) {
        videoSource.src = data.video;
        modalVideo.load();
        modalVideo.play().catch(() => {});
    }
    
    modalDescription.innerHTML = `<p>${data.description}</p>`;
    
    modalServices.innerHTML = '';
    data.services.forEach(service => {
        const span = document.createElement('span');
        span.textContent = service;
        modalServices.appendChild(span);
    });
    
    modalLink.href = data.link;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal function
function closeProjectModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    modalVideo.pause();
}

// ===== FIXED: Click handlers for project cards (NO CLONING) =====
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function(e) {
        // Don't open modal if clicking on a link
        if (e.target.closest('a')) {
            console.log('🔗 Link clicked - navigating');
            return;
        }
        if (e.target.closest('.project-card-overlay')) return;
        if (e.target.closest('.project-card-link')) return;
        
        const projectKey = this.getAttribute('data-project');
        console.log('🖱️ Card clicked:', projectKey);
        
        if (projectKey && projectModalData[projectKey]) {
            openProjectModal(projectKey);
        } else {
            console.log('❌ No project data for:', projectKey);
        }
    });
});

// Close modal events
if (modalClose) modalClose.addEventListener('click', closeProjectModal);
if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
if (modalOverlay) modalOverlay.addEventListener('click', closeProjectModal);

// Escape key to close modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeProjectModal();
    }
});

// Prevent modal from closing when clicking inside content
const modalContent = document.querySelector('.project-modal-content');
if (modalContent) {
    modalContent.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

// ================================================================
// ===== CONSOLE LOG =====
// ================================================================

console.log('🚀 CDG Arc.Com - Site Loaded Successfully!');
console.log('📧 For support: info@cdg.co.za');
console.log('📍 Interactive Map Loaded with ' + mapDots.length + ' locations');
console.log('📂 Project Modal Loaded with ' + Object.keys(projectModalData).length + ' projects');
// ================================================================
// ===== SERVICE METHODOLOGY - INTERACTIVE SPLIT SCREEN =====
// ================================================================

document.addEventListener("DOMContentLoaded", () => {
    const methodButtons = document.querySelectorAll(".methodology-btn");
    const methodContents = document.querySelectorAll(".method-content");

    if (!methodButtons.length || !methodContents.length) return;

    function activateMethod(button) {
        const method = button.dataset.method;

        // Remove active states
        methodButtons.forEach(btn => {
            btn.classList.remove("active");
            btn.setAttribute("aria-selected", "false");
        });

        methodContents.forEach(content => {
            content.classList.remove("active");
        });

        // Activate selected button
        button.classList.add("active");
        button.setAttribute("aria-selected", "true");

        // Activate matching content
        const targetContent = document.getElementById(`method-${method}`);
        if (targetContent) {
            targetContent.classList.add("active");
        }
    }

    methodButtons.forEach(button => {
        button.addEventListener("click", () => {
            activateMethod(button);
        });

        // Keyboard support
        button.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                activateMethod(button);
            }
        });
    });

    // Default first item active
    if (methodButtons.length > 0) {
        activateMethod(methodButtons[0]);
    }
});