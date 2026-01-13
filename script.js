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
                hiddenItems.forEach(item => item.classList.remove('d-none'));
                this.textContent = `View Less ${categoryName}`;
                this.classList.replace('btn-primary', 'btn-outline-primary');
            } else {
                // Hide items
                hiddenItems.forEach(item => item.classList.add('d-none'));
                this.textContent = `View More ${categoryName}`;
                this.classList.replace('btn-outline-primary', 'btn-primary');

                // Smooth scroll back up to the section header
                this.closest('.category-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // 2. Contact Form Validation & Submission
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!contactForm.checkValidity()) {
                e.stopPropagation();
                contactForm.classList.add('was-validated');
                return;
            }

            // If valid, simulate submission
            contactForm.reset();
            contactForm.classList.remove('was-validated');

            // Handle success message
            if (formStatus) {
                formStatus.classList.remove('d-none');
                setTimeout(() => {
                    formStatus.classList.add('d-none');
                }, 4000);
            } else {
                // Fallback alert if status div is missing
                alert('Thank you! Your message has been sent.');
            }
        });
    }
});