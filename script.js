// Improved form validation and error handling
const validateForm = (form) => {
  const inputs = form.querySelectorAll('input, select, textarea');
  let isValid = true;
  
  inputs.forEach(input => {
    const formGroup = input.closest('.form-group');
    const errorContainer = formGroup.querySelector('.error-message');
    
    if (errorContainer) {
      errorContainer.remove();
    }
    
    if (!input.checkValidity()) {
      isValid = false;
      const errorMsg = document.createElement('div');
      errorMsg.className = 'error-message';
      errorMsg.textContent = getValidationMessage(input);
      formGroup.appendChild(errorMsg);
      formGroup.classList.add('has-error');
    } else {
      formGroup.classList.remove('has-error');
    }
  });
  
  return isValid;
};

const getValidationMessage = (input) => {
  if (input.validity.valueMissing) {
    return 'Este campo es requerido';
  }
  if (input.validity.typeMismatch) {
    return 'Por favor ingrese un valor válido';
  }
  return input.validationMessage;
};

// Enhanced testimonials data
const testimonials = [
  {
    text: "El servicio superó todas mis expectativas. La atención fue rápida y profesional.",
    name: "Carlos R.",
    role: "Empresario",
    rating: 5
  },
  {
    text: "Proceso rápido y eficiente. El equipo de soporte es excepcional.",
    name: "Maria L.",
    role: "Gerente Comercial",
    rating: 5
  },
  {
    text: "La mejor inversión que he hecho. Resultados garantizados y soporte 24/7.",
    name: "Juan P.",
    role: "Emprendedor",
    rating: 5
  }
];

// Improved testimonial loading
const loadTestimonials = () => {
  const testimonialGrid = document.querySelector('.testimonial-grid');
  if (!testimonialGrid) return;

  testimonials.forEach(testimonial => {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    card.innerHTML = `
      <div class="testimonial-rating">
        ${Array(testimonial.rating).fill('★').join('')}
      </div>
      <p>${testimonial.text}</p>
      <div class="client-info">
        <div class="client-avatar">${testimonial.name[0]}</div>
        <div>
          <strong>${testimonial.name}</strong>
          <div class="client-role">${testimonial.role}</div>
        </div>
      </div>
    `;
    testimonialGrid.appendChild(card);
  });
};

// Enhanced mobile menu functionality
const initMobileMenu = () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('nav ul');
  
  if (menuToggle && navMenu) {
    menuToggle.innerHTML = `
      <span></span>
      <span></span>
      <span></span>
    `;
    
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('nav')) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });

    // Close menu when clicking on a link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
};

// Enhanced scroll animations
const initScrollAnimations = () => {
  const options = {
    threshold: 0.1,
    rootMargin: '50px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fadeInUp');
        observer.unobserve(entry.target);
      }
    });
  }, options);
  
  const elements = document.querySelectorAll(
    '.card, .benefit-item, .step, .testimonial-card, .faq-item'
  );
  
  elements.forEach(element => observer.observe(element));
};

// Enhanced Loading Animation
const showLoadingAnimation = () => {
  const loader = document.querySelector('.loading-overlay');
  if (loader) {
    loader.style.display = 'flex';
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }, 1500);
  }
};

// Alert System
const showAlert = (message, type = 'success') => {
  const alert = document.createElement('div');
  alert.className = `alert ${type}`;
  alert.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
    <span>${message}</span>
  `;
  document.body.appendChild(alert);
  
  setTimeout(() => {
    alert.style.opacity = '0';
    setTimeout(() => alert.remove(), 300);
  }, 3000);
};

// Enhanced Form Handling
const enhanceFormHandling = () => {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.closest('.form-group').classList.add('focused');
      });
      
      input.addEventListener('blur', () => {
        if (!input.value) {
          input.closest('.form-group').classList.remove('focused');
        }
      });
    });
  });
};

// Enhanced Animations
const enhanceAnimations = () => {
  // Parallax effect for hero section
  document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    const { clientX, clientY } = e;
    const x = (clientX - window.innerWidth / 2) * 0.01;
    const y = (clientY - window.innerHeight / 2) * 0.01;
    
    hero.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
  });

  // Floating animation for stats
  const stats = document.querySelectorAll('.stat-item');
  stats.forEach((stat, index) => {
    stat.style.animation = `floating ${3 + index * 0.2}s ease-in-out infinite`;
  });
};

// Live Chat Widget
const initChatWidget = () => {
  const chatWidget = document.createElement('div');
  chatWidget.className = 'chat-widget';
  chatWidget.innerHTML = '<i class="fas fa-comments"></i>';
  
  chatWidget.addEventListener('click', () => {
    // Implement chat functionality
    showAlert('Chat en vivo disponible 24/7');
  });
  
  document.body.appendChild(chatWidget);
};

// Countdown Timer
const initCountdownTimer = () => {
  const timer = document.createElement('div');
  timer.className = 'countdown-timer';
  
  const updateTimer = () => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const diff = midnight - now;
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    timer.innerHTML = `
      <strong>Oferta especial termina en:</strong> 
      ${hours}h ${minutes}m ${seconds}s
    `;
  };
  
  setInterval(updateTimer, 1000);
  document.querySelector('.hero').prepend(timer);
};

// Enhanced Form Validation
const enhanceFormValidation = () => {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  const validateInput = (input) => {
    const value = input.value.trim();
    const type = input.type;
    
    switch(type) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'tel':
        return /^\+?[\d\s-]{8,}$/.test(value);
      default:
        return value.length > 0;
    }
  };
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    
    form.querySelectorAll('input, textarea').forEach(input => {
      if (!validateInput(input)) {
        isValid = false;
        input.classList.add('error');
      } else {
        input.classList.remove('error');
      }
    });
    
    if (isValid) {
      showAlert('Formulario enviado con éxito', 'success');
      form.reset();
    }
  });
};

// Success Stories Carousel
const initSuccessStories = () => {
  const stories = [
    {
      name: "Carlos Rodriguez",
      company: "Tech Solutions SA",
      text: "Increíble servicio, resultados inmediatos.",
      rating: 5
    },
    {
      name: "Maria González",
      company: "Digital Marketing Pro",
      text: "La mejor inversión para mi negocio.",
      rating: 5
    }
  ];
  
  const storiesContainer = document.createElement('div');
  storiesContainer.className = 'success-stories';
  
  stories.forEach(story => {
    const storyCard = document.createElement('div');
    storyCard.className = 'story-card';
    storyCard.innerHTML = `
      <div class="story-rating">
        ${'★'.repeat(story.rating)}
      </div>
      <p>${story.text}</p>
      <div class="story-author">
        <strong>${story.name}</strong>
        <span>${story.company}</span>
      </div>
    `;
    storiesContainer.appendChild(storyCard);
  });
  
  document.querySelector('.testimonials').appendChild(storiesContainer);
};

// Initialize all new features
document.addEventListener('DOMContentLoaded', () => {
  enhanceAnimations();
  initChatWidget();
  initCountdownTimer();
  enhanceFormValidation();
  initSuccessStories();
  
  // Initialize existing features
  initMobileMenu();
  initScrollAnimations();
  enhanceFormHandling();
  showLoadingAnimation();
  
  // Add scroll progress indicator
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });

  // Smooth scroll animation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Enhanced form handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const handleFormSubmit = (e) => {
      e.preventDefault();
      
      if (!validateForm(contactForm)) {
        return;
      }
      
      const submitButton = contactForm.querySelector('button[type="submit"]');
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
      submitButton.disabled = true;

      // Simulate form submission
      setTimeout(() => {
        submitButton.innerHTML = '<i class="fas fa-check"></i> Enviado con Éxito';
        submitButton.classList.add('success');
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
          <i class="fas fa-check-circle"></i>
          <p>Gracias por contactarnos. Nuestro equipo se pondrá en contacto en breve.</p>
        `;
        contactForm.appendChild(successMessage);
        
        contactForm.reset();
        
        setTimeout(() => {
          submitButton.innerHTML = 'Enviar Consulta <i class="fas fa-paper-plane"></i>';
          submitButton.disabled = false;
          submitButton.classList.remove('success');
          successMessage.remove();
        }, 3000);
      }, 1500);
    };
    contactForm.addEventListener('submit', handleFormSubmit);
  }
  
  // Enhanced contact function
  window.contactar = (servicio) => {
    const serviceSelect = document.getElementById('serviceSelect');
    serviceSelect.value = servicio;
    
    const contactSection = document.querySelector('#contacto');
    contactSection.scrollIntoView({ behavior: 'smooth' });
    
    const form = document.getElementById('contactForm');
    form.classList.add('highlight');
    
    setTimeout(() => {
      form.classList.remove('highlight');
      form.querySelector('input').focus();
    }, 1000);
  };

  // Add floating CTA button
  const floatingCta = document.createElement('button');
  floatingCta.className = 'btn-primary floating-cta';
  floatingCta.innerHTML = 'Contactar Ahora <i class="fas fa-arrow-right"></i>';
  floatingCta.addEventListener('click', () => {
    document.querySelector('#contacto').scrollIntoView({ behavior: 'smooth' });
  });
  document.body.appendChild(floatingCta);
  
  // Scroll animations with intersection observer
  const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(animateOnScroll, {
    threshold: 0.1,
    rootMargin: '50px'
  });

  document.querySelectorAll(
    '.card, .hero-content, h2, .contact-container, .benefit-item, .step, .stat-item'
  ).forEach(element => {
    element.classList.add('animate-element');
    observer.observe(element);
  });

  // Dynamic navbar transparency
  const header = document.querySelector('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    if (currentScroll < 50) {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });

  // FAQ Functionality
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      faqItem.classList.toggle('active');
    });
  });

  // Loading Animation
  window.addEventListener('load', () => {
    const loader = document.querySelector('.loading-overlay');
    loader.style.opacity = '0';
    setTimeout(() => loader.style.display = 'none', 500);
  });

  // Load testimonials
  loadTestimonials();
});

// Performance Optimization
document.addEventListener('DOMContentLoaded', () => {
  // Lazy load images
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
  
  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Add smooth parallax effect
window.addEventListener('scroll', () => {
  const parallaxElements = document.querySelectorAll('.parallax');
  parallaxElements.forEach(element => {
    const speed = element.dataset.speed || 0.5;
    const yPos = -(window.pageYOffset * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });
});