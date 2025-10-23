/* =================================
   Main JavaScript - LTC Portal
   ================================= */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('LTC Portal Initialized');
    
    // Initialize all modules
    initializeApp();
});

/**
 * Initialize Application
 */
function initializeApp() {
    // Initialize components
    initializeNavigation();
    initializeSmoothScroll();
    initializeBackToTop();
    initializeLazyLoading();
    initializeTooltips();
    initializeModals();
    initializeTabs();
    initializeAccordions();
    initializeForms();
    initializeAnimations();
    
    // Check for page-specific initializations
    initializePageSpecific();
    
    // Initialize analytics if needed
    initializeAnalytics();
}

/**
 * Initialize Navigation
 */
function initializeNavigation() {
    // Navigation is handled by navigation.js component
    console.log('Navigation initialized');
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Back to Top Button
 */
function initializeBackToTop() {
    // Create back to top button if it doesn't exist
    let backToTopBtn = document.querySelector('.back-to-top');
    if (!backToTopBtn) {
        backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '↑';
        backToTopBtn.setAttribute('aria-label', 'חזרה למעלה');
        document.body.appendChild(backToTopBtn);
    }
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top on click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Lazy Loading for Images
 */
function initializeLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-lazy]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.lazy;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.lazy;
        });
    }
}

/**
 * Initialize Tooltips
 */
function initializeTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltipText = this.dataset.tooltip;
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            tooltip.style.left = rect.left + (rect.width - tooltip.offsetWidth) / 2 + 'px';
            
            this._tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                this._tooltip.remove();
                delete this._tooltip;
            }
        });
    });
}

/**
 * Initialize Modals
 */
function initializeModals() {
    // Modal triggers
    document.querySelectorAll('[data-modal-trigger]').forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.dataset.modalTrigger;
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Modal close buttons
    document.querySelectorAll('.modal-close, [data-modal-close]').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close on backdrop click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                activeModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
}

/**
 * Initialize Tabs
 */
function initializeTabs() {
    const tabContainers = document.querySelectorAll('.tabs');
    
    tabContainers.forEach(container => {
        const tabButtons = container.querySelectorAll('.tab-button');
        const tabPanes = container.querySelectorAll('.tab-pane');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Add active class to clicked
                this.classList.add('active');
                const tabId = this.dataset.tab;
                const targetPane = container.querySelector(`#tab-${tabId}`);
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    });
}

/**
 * Initialize Accordions
 */
function initializeAccordions() {
    const accordions = document.querySelectorAll('.accordion');
    
    accordions.forEach(accordion => {
        const headers = accordion.querySelectorAll('.accordion-header');
        
        headers.forEach(header => {
            header.addEventListener('click', function() {
                const item = this.parentElement;
                const content = item.querySelector('.accordion-content');
                const isActive = item.classList.contains('active');
                
                // Close all items in this accordion
                accordion.querySelectorAll('.accordion-item').forEach(accItem => {
                    accItem.classList.remove('active');
                    const accContent = accItem.querySelector('.accordion-content');
                    if (accContent) {
                        accContent.style.maxHeight = '0';
                    }
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                    if (content) {
                        content.style.maxHeight = content.scrollHeight + 'px';
                    }
                }
            });
        });
    });
}

/**
 * Initialize Forms
 */
function initializeForms() {
    // Form validation
    const forms = document.querySelectorAll('.needs-validation');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });
    
    // Input animations
    const inputs = document.querySelectorAll('.form-control, .form-select');
    
    inputs.forEach(input => {
        // Add filled class if has value
        if (input.value) {
            input.classList.add('filled');
        }
        
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            if (this.value) {
                this.classList.add('filled');
            } else {
                this.classList.remove('filled');
            }
        });
    });
}

/**
 * Initialize Animations
 */
function initializeAnimations() {
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('[data-animate]');
    
    if ('IntersectionObserver' in window) {
        const animateObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animation = element.dataset.animate;
                    element.classList.add('animated', animation);
                    animateObserver.unobserve(element);
                }
            });
        }, {
            threshold: 0.1
        });
        
        animateElements.forEach(element => animateObserver.observe(element));
    }
}

/**
 * Initialize Page Specific Scripts
 */
function initializePageSpecific() {
    const body = document.body;
    
    // Home page
    if (body.classList.contains('page-home')) {
        initializeHomePage();
    }
    
    // Market Status page
    if (body.classList.contains('page-market')) {
        initializeMarketPage();
    }
    
    // Reform page
    if (body.classList.contains('page-reform')) {
        initializeReformPage();
    }
    
    // Tools page
    if (body.classList.contains('page-tools')) {
        initializeToolsPage();
    }
    
    // Decision Trees page
    if (body.classList.contains('page-trees')) {
        initializeTreesPage();
    }
}

/**
 * Initialize Home Page
 */
function initializeHomePage() {
    console.log('Home page initialized');
    // Add home page specific scripts
}

/**
 * Initialize Market Page
 */
function initializeMarketPage() {
    console.log('Market page initialized');
    // Add market page specific scripts
}

/**
 * Initialize Reform Page
 */
function initializeReformPage() {
    console.log('Reform page initialized');
    // Add reform page specific scripts
}

/**
 * Initialize Tools Page
 */
function initializeToolsPage() {
    console.log('Tools page initialized');
    // Add tools page specific scripts
}

/**
 * Initialize Trees Page
 */
function initializeTreesPage() {
    console.log('Trees page initialized');
    // Add decision trees specific scripts
}

/**
 * Initialize Analytics
 */
function initializeAnalytics() {
    // Add analytics code if needed
    console.log('Analytics initialized');
}

/**
 * Utility Functions
 */
const utils = {
    // Debounce function
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function
    throttle: function(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Format number
    formatNumber: function(num) {
        return new Intl.NumberFormat('he-IL').format(num);
    },
    
    // Format currency
    formatCurrency: function(num) {
        return new Intl.NumberFormat('he-IL', {
            style: 'currency',
            currency: 'ILS'
        }).format(num);
    },
    
    // Get query parameter
    getQueryParam: function(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    },
    
    // Set cookie
    setCookie: function(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = '; expires=' + date.toUTCString();
        document.cookie = name + '=' + value + expires + '; path=/';
    },
    
    // Get cookie
    getCookie: function(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
};

// Export utilities for global use
window.LTCPortal = {
    utils: utils
};