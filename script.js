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

// Quote Request Logic
const sendQuoteBtn = document.getElementById('sendQuoteBtn');
if (sendQuoteBtn) {
    sendQuoteBtn.addEventListener('click', () => {
        const name = document.getElementById('quoteName').value.trim();
        const phone = document.getElementById('quotePhone').value.trim();
        const details = document.getElementById('quoteDetails').value.trim();
        
        if (!name || !phone) {
            alert('Please enter your name and phone number.');
            return;
        }

        const area = document.getElementById('area').value;
        const packageSelect = document.getElementById('package');
        const packageType = packageSelect.options[packageSelect.selectedIndex].text;
        const floors = document.getElementById('floors').value;
        const totalEstimate = document.getElementById('totalCost').innerText;

        const subject = encodeURIComponent(`Detailed Quote Request - ${name}`);
        const body = encodeURIComponent(`Hello The Build Project Team,

I would like to request a detailed quote for my construction project.

Here are my preliminary estimate details:
- Package: ${packageType}
- Built-up Area: ${area} sq.ft
- Floors: ${floors}
- Preliminary Estimated Cost: ${totalEstimate}

My Contact Details:
- Name: ${name}
- Phone: ${phone}

Additional Details:
${details || 'None provided'}

Please get in touch with me to discuss further.

Thank you.`);

        window.location.href = `mailto:info@thebuildproject.com?subject=${subject}&body=${body}`;
    });
}
