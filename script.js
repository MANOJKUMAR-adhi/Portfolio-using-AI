
// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        // For now, we'll just log it and show a success message
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Clear form
        contactForm.reset();
    });
}

// Add active class to nav links on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Animate skill cards on scroll
const skillCards = document.querySelectorAll('.skill-card');

const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

skillCards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    observer.observe(card);
});

// Chatbot functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatBotIcon = document.getElementById('chatBotIcon');
    const chatBox = document.getElementById('chatBox');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const sendMessageBtn = document.getElementById('sendMessage');
    const userInput = document.getElementById('userInput');
    const chatMessages = document.getElementById('chatMessages');

    // Toggle chat box
    chatBotIcon.addEventListener('click', () => {
        chatBox.classList.toggle('active');
        if (chatBox.classList.contains('active')) {
            userInput.focus();
        }
    });

    // Close chat box
    closeChatBtn.addEventListener('click', () => {
        chatBox.classList.remove('active');
    });

    // Send message function
    function sendMessage() {
        const message = userInput.value.trim();
        if (message !== '') {
            // Add user message
            addMessage('user', message);
            
            // Get bot response
            const response = getBotResponse(message);
            
            // Add bot response with typing animation
            setTimeout(() => {
                addMessage('bot', response);
            }, 1000);

            // Clear input
            userInput.value = '';
            userInput.focus();
        }
    }

    // Send message on button click
    sendMessageBtn.addEventListener('click', sendMessage);

    // Send message on Enter key
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Add message to chat
    function addMessage(type, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Get bot response based on user input
    function getBotResponse(input) {
        input = input.toLowerCase();
        
        // Basic responses
        const responses = {
            'hello': 'Hello! How can I assist you today?',
            'hi': 'Hi there! How can I help you?',
            'how are you': 'I\'m functioning perfectly! How can I help you?',
            'who are you': 'I\'m Manoj\'s AI Assistant, powered by the Mangekyo Sharingan! I\'m here to help you navigate through the portfolio.',
            'what can you do': 'I can help you navigate the portfolio, provide information about Manoj\'s skills, projects, experience, and education. Just ask!',
            'bye': 'Goodbye! Feel free to return if you need any assistance.',
            'thank you': 'You\'re welcome! Is there anything else I can help you with?',
            'thanks': 'You\'re welcome! Need help with anything else?'
        };

        // Check for specific keywords
        if (input.includes('education') || input.includes('college') || input.includes('university')) {
            return 'Manoj is currently pursuing his Bachelor of Engineering (B.E) in Electrical and Electronics Engineering at SSM Institute of Engineering and Technology, Dindigul, Tamil Nadu. He maintains a CGPA of 7.7/10 with no history of arrears. His expected graduation year is 2025. Would you like to know more about his academic achievements or other aspects?';
        }
        if (input.includes('academic') || input.includes('cgpa') || input.includes('grade')) {
            return 'Manoj has maintained a strong academic record with a CGPA of 7.7/10 throughout his engineering program, demonstrating consistent performance with no history of arrears. This showcases his dedication to academic excellence while balancing various technical projects and skill development.';
        }
        if (input.includes('skills') || input.includes('technologies')) {
            return 'Manoj is proficient in Java, Spring, Hibernate, HTML, CSS, JavaScript, and MySQL. Would you like to know more about any specific skill?';
        }
        if (input.includes('contact') || input.includes('email')) {
            return 'You can contact Manoj through the contact form above, or directly via email at manojkumaradhi369@gmail.com';
        }
        if (input.includes('project') || input.includes('work')) {
            return 'Manoj has worked on various projects including this AI-assisted portfolio. Would you like to know more about specific projects?';
        }
        if (input.includes('experience') || input.includes('internship')) {
            return 'Manoj completed a Java Fullstack Web Development internship at TAP Academy, gaining hands-on experience with various technologies. Would you like more details?';
        }

        // Check for exact matches
        for (let key in responses) {
            if (input.includes(key)) {
                return responses[key];
            }
        }

        // Default response
        return 'I\'m not sure about that. Would you like to know about Manoj\'s skills, projects, or how to get in contact?';
    }
}); 
