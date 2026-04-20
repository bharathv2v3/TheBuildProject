// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if(navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Navbar shrink on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Cost Estimator Logic
const estimatorForm = document.getElementById('estimatorForm');
const estimatorResult = document.getElementById('estimatorResult');
const totalCostEl = document.getElementById('totalCost');

if(estimatorForm) {
  estimatorForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const area = parseFloat(document.getElementById('area').value);
    const packageType = document.getElementById('package').value;
    const floors = parseInt(document.getElementById('floors').value);
    
    let costPerSqFt = 0;
    
    switch(packageType) {
      case 'essential':
        costPerSqFt = 2200;
        break;
      case 'premium':
        costPerSqFt = 2800;
        break;
      case 'luxury':
        costPerSqFt = 3200;
        break;
    }
    
    // Simple calculation: Area * Cost per SqFt * Floors
    const total = area * costPerSqFt * floors;
    
    // Format to Indian Rupees
    const formatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    });
    
    totalCostEl.textContent = formatter.format(total);
    estimatorResult.style.display = 'block';
  });
}

// Set active link in nav based on current URL
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksList = document.querySelectorAll('.nav-links a');
    
    navLinksList.forEach(link => {
        const href = link.getAttribute('href');
        if(href === currentPage) {
            link.classList.add('active');
        }
    });
});
