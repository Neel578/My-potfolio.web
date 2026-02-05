document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scroll for Nav Links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // 2. Back to top button
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 300) backToTop.style.display = 'block';
        else backToTop.style.display = 'none';
    });
    backToTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

    // 3. Set Current Year
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // 4. RESUME MODAL LOGIC (Back Button Support)
    const resumeTrigger = document.getElementById('resume-trigger');
    const resumeModal = document.getElementById('resume-modal');
    const closeResumeBtn = document.getElementById('close-resume-btn');

    // Function to Open Resume
    function openResume() {
        resumeModal.classList.add('active'); // Start Fade In
        document.body.style.overflow = 'hidden'; // Stop background scrolling
        
        // Pushes a new state to history so "Back" button works
        history.pushState({ resumeOpen: true }, "", "#resume");
    }

    // Function to Close Resume
    function closeResume() {
        resumeModal.classList.remove('active'); // Start Fade Out
        document.body.style.overflow = 'auto'; // Restore scrolling
        
        // Remove the hash (#resume) from URL nicely if it exists
        if(window.location.hash === "#resume") {
            // If we closed it manually, we might want to go back in history 
            // to remove the hash, OR just replace state to clean URL.
            // But since the user might have clicked "Back", we let the popstate handle it usually.
            // If this was triggered by button, we force history back.
        }
    }

    // Trigger: Open to Work Badge
    if (resumeTrigger) {
        resumeTrigger.addEventListener('click', () => {
            openResume();
        });
    }

    // Trigger: Close Button (simulates back button)
    if (closeResumeBtn) {
        closeResumeBtn.addEventListener('click', () => {
            history.back(); // This triggers 'popstate' event
        });
    }

    // Event: Detect Browser/Phone Back Button
    window.addEventListener('popstate', (event) => {
        // If the modal is open, this means we just pressed "Back", so we close it.
        if (resumeModal.classList.contains('active')) {
            closeResume();
        }
    });
});