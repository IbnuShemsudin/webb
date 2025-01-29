// animation.js

// 1. Header and Menu
const menuIcon = document.querySelector('.menu-icon');
const hiddenMenu = document.querySelector('.hidden-menu');

if (menuIcon && hiddenMenu) {
    menuIcon.addEventListener('click', () => {
        hiddenMenu.style.display = hiddenMenu.style.display === 'block' ? 'none' : 'block';
    });

    window.addEventListener('click', (event) => {
        if (hiddenMenu.style.display === 'block' && !menuIcon.contains(event.target) && !hiddenMenu.contains(event.target)) {
            hiddenMenu.style.display = 'none';
        }
    });
}

// 2. Smooth Scrolling to Top
const backToTop = document.querySelector('.back-to-top a');

if (backToTop) {
    backToTop.addEventListener('click', (event) => {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 3. Reveal Elements on Scroll and Load
function revealElementsOnScroll() {
    const elements = document.querySelectorAll('.hero, .promotion-heading, .product, .numbers, .about-delivery');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight * 0.8) {
            element.classList.add('visible');
        } else {
            element.classList.remove('visible'); // Optional: Remove if you don't want elements to hide
        }
    });
}

window.addEventListener('scroll', revealElementsOnScroll);
window.addEventListener('load', revealElementsOnScroll);

// 4. Product Data and Display
const productData = [
    // ... your product data (must include image, name, price, oldPrice)
];

function populateProductElement(product, productElement) {
    const img = productElement.querySelector('img');
    const h5 = productElement.querySelector('h5');
    const price = productElement.querySelector('.price');
    const span = price.querySelector('span');

    if (img && h5 && price && span) {
        img.src = product.image;
        img.alt = product.name;
        h5.textContent = product.name;
        price.textContent = product.price;
        span.textContent = product.oldPrice;
    }
}

const sectionData = [
    // ... your section data (must include title and an array of product indexes)
];

sectionData.forEach(section => {
    const sectionElement = document.querySelector(`.product-container .section:nth-child(${sectionData.indexOf(section) + 1})`);

    if (sectionElement) {
        const productsContainer = sectionElement.querySelector('.products');

        if (productsContainer) {
            const productElements = productsContainer.querySelectorAll('.product');

            section.products.forEach((productIndex, index) => {
                if (productData[productIndex] && productElements[index]) {
                    populateProductElement(productData[productIndex], productElements[index]);
                } else {
                    console.error("Product data or element not found for index:", productIndex, "in section:", section.title);
                }
            });
        } else {
            console.error("Products container not found in section:", section.title);
        }
    } else {
        console.error("Section element not found:", section.title);
    }
});

// 5. Numbers Section with Counting Animation
const numbersData = [
    { value: 90, description: 'Open job position' },
    { value: 95, description: 'Open job position' },
    { value: 92, description: 'Success Stories' }
];

numbersData.forEach(item => {
    const numberDiv = document.createElement('div');
    numberDiv.classList.add('number');
    numberDiv.innerHTML = `<p class="num">0%</p><p class="numDiscc">${item.description}</p><canvas></canvas>`;
    document.querySelector('.numbers').appendChild(numberDiv);

    const numElement = numberDiv.querySelector('.num');
    const canvas = numberDiv.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    let currentNumber = 0;
    const targetNumber = item.value;

    canvas.width = 100;
    canvas.height = 100;
    numElement.style.fontSize = "50px";

    function animateNumber() {
        if (currentNumber <= targetNumber) {
            numElement.textContent = currentNumber + "%";

            const progress = currentNumber / targetNumber;
            const endAngle = (Math.PI * 2 * progress) - Math.PI / 2;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, 40, -Math.PI / 2, endAngle);
            ctx.strokeStyle = 'orange';
            ctx.lineWidth = 10;
            ctx.stroke();

            currentNumber++;
            requestAnimationFrame(animateNumber);
        }
    }

    let observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber();
                observer.unobserve(numberDiv);
            }
        });
    });

    observer.observe(numberDiv);
});

// 6. About Delivery Section
const aboutDeliverySection = document.querySelector('.about-delivery');
const deliveryData = [
    { image: "./photos/delivery.png", title: "FREE AND FAST DELIVERY", description: "Free delivery for all orders over $140" },
    { image: "./photos/30-days.png", title: "24/7 CUSTOMER SERVICE", description: "friendly 24/7 Customer Support" },
    { image: "./photos/check-box.png", title: "MONEY BACK GUARANTEE", description: "reurn money within 30 days" }
];

deliveryData.forEach(delivery => {
    const deliveryDiv = document.createElement('div');
    deliveryDiv.classList.add('service');
    deliveryDiv.innerHTML = `
    <img src="${delivery.image}" alt="">
    <h4>${delivery.title}</h4>
    <p>${delivery.description}</p>
    `;
    if (aboutDeliverySection) {
        aboutDeliverySection.appendChild(deliveryDiv);
    }
});

// 7. Footer (No JavaScript needed for static footer content)