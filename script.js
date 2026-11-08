// ==========================================
// Register ScrollTrigger
// ==========================================
gsap.registerPlugin(ScrollTrigger);

// ==========================================
// Mobile Menu
// ==========================================
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
let menuOpen = false;

menuToggle.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('active', menuOpen);
    const spans = menuToggle.querySelectorAll('span');
    if (menuOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuOpen = false;
        mobileMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ==========================================
// Intro Screen Logic (GSAP Cinematic)
// ==========================================
const introScreen = document.getElementById('intro-screen');
const page = document.getElementById('page');
const introText = document.querySelector('.intro-text');

setTimeout(() => {
    gsap.to(introText, {
        scale: 3,
        filter: "blur(20px)",
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: () => {
            introScreen.style.display = 'none';
            page.classList.add('on');
            
            gsap.from('.hero-subtitle', { opacity: 0, y: 30, duration: 0.8, delay: 0.2 });
            gsap.from('.hero-title', { opacity: 0, y: 50, duration: 1, delay: 0.4 });
            gsap.from('.countdown-wrapper', { opacity: 0, y: 30, duration: 0.8, delay: 0.6 });
            gsap.from('.btn-primary', { opacity: 0, y: 20, duration: 0.8, delay: 0.8 });
            
            initScrollReveal();
        }
    });
}, 2000);

// ==========================================
// Scroll Reveal (GSAP ScrollTrigger)
// ==========================================
function initScrollReveal() {
    gsap.utils.toArray('.section-label, .section-title').forEach(el => {
        gsap.from(el, {
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
            opacity: 0, y: 40, duration: 1, ease: "power3.out"
        });
    });

    gsap.utils.toArray('.section-desc').forEach(el => {
        gsap.from(el, {
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
            opacity: 0, y: 30, duration: 1, delay: 0.2, ease: "power3.out"
        });
    });

    const aboutImg = document.querySelector('.about-image img');
    if (aboutImg) {
        gsap.from(aboutImg, {
            scrollTrigger: { trigger: '.about-image', start: "top 80%", toggleActions: "play none none none" },
            opacity: 0, scale: 0.9, duration: 1.2, ease: "power3.out"
        });
        gsap.to(aboutImg, {
            scrollTrigger: { trigger: '.about-image', start: "top bottom", end: "bottom top", scrub: 1 },
            y: -50, ease: "none"
        });
    }

    gsap.from('.plan-card', {
        scrollTrigger: { trigger: '.plans-grid', start: "top 80%", toggleActions: "play none none none" },
        opacity: 0, y: 80, duration: 1, stagger: 0.2, ease: "power3.out"
    });

    gsap.from('.branch-card', {
        scrollTrigger: { trigger: '.branches-grid', start: "top 80%", toggleActions: "play none none none" },
        opacity: 0, y: 40, duration: 0.8, stagger: 0.15, ease: "power3.out"
    });

    gsap.from('.cta-title', {
        scrollTrigger: { trigger: '.cta-section', start: "top 70%", toggleActions: "play none none none" },
        opacity: 0, scale: 0.8, duration: 1.2, ease: "power3.out"
    });
    
    gsap.from('.cta-section .btn-primary', {
        scrollTrigger: { trigger: '.cta-section', start: "top 60%", toggleActions: "play none none none" },
        opacity: 0, y: 30, duration: 1, delay: 0.3, ease: "power3.out"
    });

    gsap.from('.contact-info', {
        scrollTrigger: { trigger: '.contact-wrapper', start: "top 80%", toggleActions: "play none none none" },
        opacity: 0, x: -50, duration: 1, ease: "power3.out"
    });
    
    gsap.from('.contact-form', {
        scrollTrigger: { trigger: '.contact-wrapper', start: "top 80%", toggleActions: "play none none none" },
        opacity: 0, x: 50, duration: 1, delay: 0.2, ease: "power3.out"
    });
}

// ==========================================
// Countdown Timer
// ==========================================
const endDate = new Date();
endDate.setDate(endDate.getDate() + 3);

function updateCountdown() {
    const now = new Date().getTime();
    const distance = endDate - now;
    
    if (distance < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ==========================================
// Contact Form (واتساب)
// ==========================================
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const branch = this.querySelector('select').value;
    const message = this.querySelector('textarea').value;
    
    const whatsappNumber = '201212322222'; 
    const whatsappMessage = `New Inquiry!%0A%0AName: ${name}%0AEmail: ${email}%0APhone: ${phone}%0ABranch: ${branch}%0AMessage: ${message}`;
    
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
    
    this.reset();
});

// ==========================================
// Chat Widget Logic (Premium)
// ==========================================
const chatBtn = document.getElementById('chat-btn');
const chatWindow = document.getElementById('chat-window');
const chatClose = document.getElementById('chat-close');
const chatBody = document.getElementById('chat-body');
const chatOptions = document.getElementById('chat-options');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');

let chatOpened = false;

// فتح الشات بـ GSAP
chatBtn.addEventListener('click', () => {
    if (!chatOpened) {
        chatWindow.style.pointerEvents = 'auto';
        gsap.to(chatWindow, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.4)",
            onComplete: () => {
                const firstMsg = chatBody.querySelector('.chat-message');
                if (firstMsg) {
                    gsap.to(firstMsg, { opacity: 1, y: 0, duration: 0.5 });
                }
            }
        });
        chatOpened = true;
    } else {
        closeChat();
    }
});

chatClose.addEventListener('click', closeChat);

function closeChat() {
    gsap.to(chatWindow, {
        opacity: 0,
        y: 30,
        scale: 0.95,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
            chatWindow.style.pointerEvents = 'none';
        }
    });
    chatOpened = false;
}

// الردود
const responses = {
    'free pass': 'Great! To get your free pass, please fill in your details on the Contact form, or contact us on WhatsApp: +20 121 232 2222. We will get back to you shortly!',
    'plans': 'We offer two plans:\n\n• ULTIMATE:\n9 Guest Invitations, 2 Months Freeze, 2 Fitness Sessions, 1 MMA Session, 1 Nutrition Session, 2 Body Assessments.\n\n• CHAMPION:\n15 Guest Invitations, 3 Months Freeze, Hydro-Massage Pool & Therapy (Zayed), 3 Fitness Sessions, 1 MMA Session, 1 Nutrition Session, 2 Body Assessments.\n\nFor pricing, contact us.',
    'branches': 'We have 4 branches:\n\n• Zayed: Trivium Zayed, Building B, Floor 1\n• Palm Hills\n• One Kattameya\n• The Club, Sheikh Zayed',
    'contact': 'You can reach us at:\n\n📞 +20 121 232 2222\n📧 info@ufcgymegy.com\n📍 Trivium Zayed, Building B, Floor 1, Office B115',
    'default': 'Thank you for your message! Our team will contact you shortly. For immediate assistance, call us at +20 121 232 2222 or WhatsApp us.'
};

// إضافة رسالة بـ GSAP
function addMessage(text, sender) {
    const msg = document.createElement('div');
    msg.className = 'chat-message ' + sender;
    msg.textContent = text;
    chatBody.appendChild(msg);
    
    gsap.to(msg, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
    });
    
    chatBody.scrollTop = chatBody.scrollHeight;
}

// مؤشر الكتابة
function showTyping() {
    const typing = document.createElement('div');
    typing.className = 'typing-indicator';
    typing.id = 'typing-indicator';
    typing.innerHTML = '<span></span><span></span><span></span>';
    chatBody.appendChild(typing);
    chatBody.scrollTop = chatBody.scrollHeight;
    return typing;
}

function removeTyping() {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
}

// رد البوت (مع تايبينج + كتابة حرف حرف)
function botReply(text) {
    const typing = showTyping();
    
    setTimeout(() => {
        removeTyping();
        const msg = document.createElement('div');
        msg.className = 'chat-message bot';
        msg.textContent = '';
        msg.style.opacity = '1';
        msg.style.transform = 'translateY(0)';
        chatBody.appendChild(msg);
        
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                msg.textContent += text.charAt(i);
                i++;
                chatBody.scrollTop = chatBody.scrollHeight;
            } else {
                clearInterval(interval);
            }
        }, 15);
        
    }, 1200);
}

// زراير الاختيارات
chatOptions.querySelectorAll('.chat-option').forEach(btn => {
    btn.addEventListener('click', () => {
        const q = btn.dataset.q;
        addMessage(btn.textContent, 'user');
        setTimeout(() => {
            botReply(responses[q] || responses['default']);
        }, 300);
    });
});

// الكتابة اليدوية
function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    chatInput.value = '';
    
    setTimeout(() => {
        const lower = text.toLowerCase();
        let reply = responses['default'];
        for (const key in responses) {
            if (lower.includes(key)) {
                reply = responses[key];
                break;
            }
        }
        botReply(reply);
    }, 300);
}

chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});