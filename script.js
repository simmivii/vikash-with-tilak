// Open Invitation Function
function openInvitation() {
    const cover = document.getElementById('invitation-cover');
    const mainContent = document.getElementById('main-content');
    const celebration = document.getElementById('celebration-container');
    
    // Add fade-out effect to cover
    cover.classList.add('fade-out');
    
    // Show main content after transition
    setTimeout(() => {
        cover.style.display = 'none';
        mainContent.classList.remove('hidden');
        
        // Start celebration effect
        celebration.classList.add('celebrate');
        
        // Remove celebration effect after 4 seconds
        setTimeout(() => {
            celebration.classList.remove('celebrate');
        }, 4000);
        
        // Start background music if available
        const music = document.getElementById('backgroundMusic');
        if (music) {
            music.play().catch(e => console.log('Auto-play blocked:', e));
        }
    }, 800);
}

// Wedding Countdown
const weddingDate = new Date("April 25, 2026 18:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const diff = weddingDate - now;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    document.getElementById('days').textContent = d;
    document.getElementById('hours').textContent = h;
    document.getElementById('minutes').textContent = m;
    document.getElementById('seconds').textContent = s;
}

setInterval(() => {
    const now = new Date().getTime();
    const diff = weddingDate - now;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    document.getElementById("timer").innerHTML =
        `${d} Days ${h} Hours ${m} Minutes ${s} Seconds`;
}, 1000);

// Music Control - Multiple Methods
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('backgroundMusic');
    let musicStarted = false;
    
    // Set volume
    audio.volume = 0.4;
    
    // Method 1: Try to play immediately
    function tryPlayMusic() {
        if (musicStarted) return;
        
        audio.play().then(() => {
            console.log('🎵 Music playing!');
            musicStarted = true;
        }).catch(() => {
            // If autoplay fails, try other methods
            console.log('Autoplay blocked, waiting for user interaction...');
        });
    }
    
    // Method 2: Play on any user interaction
    function playOnInteraction() {
        if (musicStarted) return;
        
        audio.play().then(() => {
            console.log('🎵 Music started on interaction!');
            musicStarted = true;
        }).catch(console.log);
    }
    
    // Method 3: Use Intersection Observer to detect when user scrolls
    function setupScrollDetection() {
        const observer = new IntersectionObserver((entries) => {
            if (!musicStarted) {
                playOnInteraction();
            }
        });
        
        // Observe the countdown section
        const countdown = document.querySelector('.countdown');
        if (countdown) {
            observer.observe(countdown);
        }
    }
    
    // Try immediate play
    tryPlayMusic();
    
    // Set up scroll detection
    setupScrollDetection();
    
    // Fallback event listeners
    ['click', 'scroll', 'touchstart', 'mousemove', 'keydown'].forEach(event => {
        document.addEventListener(event, playOnInteraction, { once: true });
    });
    
    // Force play after any delay
    setTimeout(() => {
        if (!musicStarted) {
            tryPlayMusic();
        }
    }, 1000);
});

// RSVP Function
function sendRSVP(status) {
    if (status === 'not-attending') {
        // Show guilt-inducing message first
        const confirmMessage = "WAIT! Are you really sure you can't make it to our MOST IMPORTANT DAY?\n\n" +
                             "This is a ONCE IN A LIFETIME moment that we'll never get back...\n\n" +
                             "We've been planning this day dreaming of celebrating with YOU!\n\n" +
                             "Your empty chair will be noticed... Your absence will be felt...\n\n" +
                             "Are you ABSOLUTELY sure you can't rearrange your plans? Even just for a few hours?\n\n" +
                             "Click OK if you're really, truly, heartbreakingly sure you can't attend...";
        
        if (!confirm(confirmMessage)) {
            return; // Don't send RSVP if they cancel
        }
        
        // If they still choose not to attend, show final guilt message
        alert("We understand life happens... but honestly, we're heartbroken\n\n" +
              "We'll miss you terribly on our special day!\n\n" +
              "Every photo, every laugh, every moment will remind us that you weren't there...\n\n" +
              "We hope whatever is keeping you away is really, REALLY important!");
    }
    
    const message = status === 'attending' 
        ? "Hello! I will be attending Vikash & Simpel's wedding on April 25, 2026. Looking forward to celebrating with you!"
        : "Hello! I am absolutely heartbroken that I won't be able to attend Vikash & Simpel's wedding on April 25, 2026. I feel terrible missing your most special day. Please know that I'll be thinking of you both and sending all my love from afar. I hope you can forgive me for not being there to celebrate with you...";
    
    const whatsappURL = `https://wa.me/919835959489?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}