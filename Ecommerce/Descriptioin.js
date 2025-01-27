// Thumbnail image switcher
const thumbnails = document.querySelectorAll('.thumbnail-gallery img');
const mainImage = document.getElementById('main-image');

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        thumbnails.forEach(img => img.classList.remove('active'));
        thumbnail.classList.add('active');
        mainImage.src = thumbnail.src;
    });
});

// Color selector
const colors = document.querySelectorAll('.color-options span');
colors.forEach(color => {
    color.addEventListener('click', () => {
        colors.forEach(span => span.classList.remove('active'));
        color.classList.add('active');
    });
});

// Size selector
const sizes = document.querySelectorAll('.size-options button');
sizes.forEach(size => {
    size.addEventListener('click', () => {
        sizes.forEach(button => button.classList.remove('active'));
        size.classList.add('active');
    });
});

// Quantity increment and decrement
const quantityInput = document.getElementById('quantity');
document.getElementById('increase').addEventListener('click', () => {
    quantityInput.value = parseInt(quantityInput.value) + 1;
});
document.getElementById('decrease').addEventListener('click', () => {
    if (parseInt(quantityInput.value) > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
});

// Buy Now Button
const buyNowButton = document.querySelector('.buy-now');
const orderForm = document.querySelector('.form-container');

buyNowButton.addEventListener('click', () => {
    // Ensure the form is displayed at the bottom
    document.body.appendChild(orderForm);
    orderForm.style.display = 'block';
    
    // Scroll to the form
    orderForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Handle form submission
const orderFormElement = document.getElementById('order-form');
orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simulate match check
    if (email === "test@example.com" && password === "password123") {
        window.location.href = "https://t.me/+WHvkAaYva51jMDE0";
    } else {
        alert("Invalid email or password. Please try again.");
    }

    // Keep the form ready for backend integration later
    formOverlay.classList.remove('active');
});

