/* =================================
   Navigation Component
   ================================= */

class Navigation {
    constructor() {
        this.header = document.querySelector('.site-header');
        this.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        this.mainNav = document.querySelector('.main-nav');
        this.navItems = document.querySelectorAll('.nav-item.has-dropdown');
        this.searchBtn = document.querySelector('.search-btn');
        
        this.init();
    }
    
    init() {
        if (!this.header) return;
        
        this.setupScrollEffect();
        this.setupMobileMenu();
        this.setupDropdowns();
        this.setupKeyboardNavigation();
        this.highlightCurrentPage();
    }
    
    // Header scroll effect
    setupScrollEffect() {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
            
            // Hide/show header on scroll (optional)
            if (currentScroll > lastScroll && currentScroll > 100) {
                // Scrolling down
                // this.header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                // this.header.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
    }
    
    // Mobile menu toggle
    setupMobileMenu() {
        if (!this.mobileMenuBtn || !this.mainNav) return;
        
        this.mobileMenuBtn.addEventListener('click', () => {
            const isActive = this.mainNav.classList.contains('active');
            
            if (isActive) {
                this.closeMobileMenu();
            } else {
                this.openMobileMenu();
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.header.contains(e.target) && this.mainNav.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.mainNav.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
    }
    
    openMobileMenu() {
        this.mainNav.classList.add('active');
        this.mobileMenuBtn.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Animate menu items
        const navItems = this.mainNav.querySelectorAll('.nav-item');
        navItems.forEach((item, index) => {
            item.style.animation = `slideInFromRight 0.3s ease ${index * 0.05}s forwards`;
        });
    }
    
    closeMobileMenu() {
        this.mainNav.classList.remove('active');
        this.mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset animations
        const navItems = this.mainNav.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.style.animation = '';
        });
    }
    
    // Dropdown menus
    setupDropdowns() {
        if (!this.navItems.length) return;
        
        // Desktop hover behavior is handled by CSS
        
        // Mobile click behavior
        this.navItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            const arrow = link.querySelector('.dropdown-arrow');
            
            if (arrow) {
                arrow.addEventListener('click', (e) => {
                    if (window.innerWidth <= 1024) {
                        e.preventDefault();
                        e.stopPropagation();
                        this.toggleMobileDropdown(item);
                    }
                });
            }
        });
    }
    
    toggleMobileDropdown(item) {
        const isExpanded = item.classList.contains('expanded');
        
        // Close all other dropdowns
        this.navItems.forEach(navItem => {
            if (navItem !== item) {
                navItem.classList.remove('expanded');
            }
        });
        
        // Toggle current dropdown
        if (isExpanded) {
            item.classList.remove('expanded');
        } else {
            item.classList.add('expanded');
        }
    }
    
    // Keyboard navigation
    setupKeyboardNavigation() {
        const focusableElements = this.header.querySelectorAll(
            'a, button, [tabindex]:not([tabindex="-1"])'
        );
        
        focusableElements.forEach(element => {
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    if (element.classList.contains('nav-link') && 
                        element.parentElement.classList.contains('has-dropdown')) {
                        e.preventDefault();
                        const megaMenu = element.nextElementSibling;
                        if (megaMenu) {
                            const firstLink = megaMenu.querySelector('a');
                            if (firstLink) firstLink.focus();
                        }
                    }
                }
            });
        });
    }
    
    // Highlight current page in navigation
    highlightCurrentPage() {
        const currentPath = window.location.pathname;
        const navLinks = this.header.querySelectorAll('.nav-link');
        
        // Remove all active states
        navLinks.forEach(link => {
            link.parentElement.classList.remove('active');
        });
        
        // Add active state to current page
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath || 
                (currentPath !== '/' && href !== '/' && currentPath.startsWith(href))) {
                link.parentElement.classList.add('active');
            }
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.navigation = new Navigation();
    });
} else {
    window.navigation = new Navigation();
}