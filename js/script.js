document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // FLOATING HEADER ON SCROLL
    // ==========================================================================
    const header = document.getElementById('header');
    
    const handleScrollHeader = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScrollHeader);
    handleScrollHeader(); // Initialize on page load in case already scrolled

    // ==========================================================================
    // MOBILE MENU TOGGLE
    // ==========================================================================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const toggleMenu = () => {
        navToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
    };
    
    const closeMenu = () => {
        navToggle.classList.remove('open');
        navMenu.classList.remove('open');
    };
    
    navToggle.addEventListener('click', toggleMenu);
    
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside of the nav menu
    document.addEventListener('click', (event) => {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickInsideToggle = navToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickInsideToggle && navMenu.classList.contains('open')) {
            closeMenu();
        }
    });

    // ==========================================================================
    // ACTIVE NAVIGATION LINK HIGHLIGHTING ON SCROLL
    // ==========================================================================
    const sections = document.querySelectorAll('section');
    
    const highlightNavLink = () => {
        let scrollPosition = window.scrollY + 150; // offset for header height
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    window.addEventListener('scroll', highlightNavLink);

    // ==========================================================================
    // SCROLL REVEAL ANIMATIONS (Intersection Observer)
    // ==========================================================================
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve after showing so it only animates once
                observer.unobserve(entry.target);
            }
        });
    };
    
    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null,
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px' // triggers slightly before entering viewport
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // ==========================================================================
    // WHATSAPP PRE-FILLED FORM REDIRECTION
    // ==========================================================================
    const appointmentForm = document.getElementById('appointmentForm');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const reason = document.getElementById('reason').value.trim();
            
            // Format phone number and draft messages
            const doctorWhatsAppNumber = '5575991372233'; // 75 99137-2233
            
            const messageText = `Olá! Gostaria de agendar uma consulta com a Dra. Paula Coli.

*Nome:* ${name}
*Contato:* ${phone}
*Motivo da Consulta/Dúvida:* ${reason}`;
            
            // Encode text for URL parameters
            const encodedText = encodeURIComponent(messageText);
            const waUrl = `https://wa.me/${doctorWhatsAppNumber}?text=${encodedText}`;
            
            // Open in a new tab
            window.open(waUrl, '_blank');
        });
    }

    // ==========================================================================
    // CURRICULUM TAB SWITCHING
    // ==========================================================================
    const tabButtons = document.querySelectorAll('.cv-tab-btn');
    const tabContents = document.querySelectorAll('.cv-tab-content');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                
                // Remove active class from all buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Toggle active class on contents
                tabContents.forEach(content => {
                    if (content.getAttribute('id') === targetTab) {
                        content.classList.add('active');
                    } else {
                        content.classList.remove('active');
                    }
                });
            });
        });
    }
});
