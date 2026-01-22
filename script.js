document.addEventListener('DOMContentLoaded', function () {

    // 1. Menu Toggle Logic (Show More/Less)
    const toggleButtons = document.querySelectorAll('.toggle-btn');

    toggleButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const targetClass = this.getAttribute('data-target');
            const categoryName = this.getAttribute('data-category');
            const hiddenItems = document.querySelectorAll('.' + targetClass);

            // Safety check in case elements don't exist
            if (hiddenItems.length === 0) return;

            const isCurrentlyHidden = hiddenItems[0].classList.contains('d-none');

            if (isCurrentlyHidden) {
                // Show items
                hiddenItems.forEach(item => {
                    item.classList.remove('d-none');
                    // Optional: Add a small fade-in effect
                    item.style.opacity = 0;
                    setTimeout(() => { item.style.opacity = 1; item.style.transition = 'opacity 0.4s ease'; }, 10);
                });
                
                this.textContent = `Show Less`;
                this.classList.replace('btn-primary', 'btn-outline-primary');
            } else {
                // Hide items
                hiddenItems.forEach(item => item.classList.add('d-none'));
                this.textContent = `View More ${categoryName}`;
                this.classList.replace('btn-outline-primary', 'btn-primary');

                // Smooth scroll back up to the category title so user isn't lost
                const sectionHeader = this.closest('.category-section');
                const yOffset = -100; // Adjust this to account for your fixed navbar height
                const y = sectionHeader.getBoundingClientRect().top + window.pageYOffset + yOffset;
                
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    });

    // 2. Contact Form Validation & Submission
    const contactForm = document.getElementById('contact-form');
    // Note: Ensure you have <div id="form-status" class="alert alert-success d-none mt-3">Thank you!</div> in your HTML
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!contactForm.checkValidity()) {
                e.stopPropagation();
                contactForm.classList.add('was-validated');
                return;
            }

            // Simulate loading state on button
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            // Simulate API Call / Submission Delay
            setTimeout(() => {
                contactForm.reset();
                contactForm.classList.remove('was-validated');
                
                // Restore button
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;

                // Handle success message
                if (formStatus) {
                    formStatus.classList.remove('d-none');
                    formStatus.textContent = "Success! We'll get back to you shortly.";
                    setTimeout(() => {
                        formStatus.classList.add('d-none');
                    }, 5000);
                } else {
                    alert('Thank you! Your message has been sent.');
                }
            }, 1500);
        });
    }
});
