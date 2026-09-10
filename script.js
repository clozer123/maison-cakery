/**
 * Maison Cakery - Interactive JavaScript
 * Luxury Patisserie Landing Page
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initCategoryFilter();
  initOrderDatePicker();
  initKeyboardEvents();
});

/* -------------------- HEADER SCROLL EFFECT -------------------- */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* -------------------- MOBILE MENU TOGGLE -------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when clicking nav links
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* -------------------- CATEGORY FILTER -------------------- */
function initCategoryFilter() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const productItems = document.querySelectorAll('.product-item');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      productItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filter === 'all' || itemCategory === filter) {
          item.style.display = 'flex';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 20);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(15px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

// Global category filter trigger from other sections
window.filterCategory = function(category) {
  const targetBtn = document.querySelector(`.tab-btn[data-filter="${category}"]`);
  if (targetBtn) {
    targetBtn.click();
    const featuredSection = document.getElementById('featured');
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

/* -------------------- ONLINE ORDER MODAL -------------------- */
function initOrderDatePicker() {
  const dateInput = document.getElementById('orderDate');
  if (!dateInput) return;

  // Set minimum date to tomorrow for artisanal preparation
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yyyy = tomorrow.getFullYear();
  const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const dd = String(tomorrow.getDate()).padStart(2, '0');
  dateInput.min = `${yyyy}-${mm}-${dd}`;
  dateInput.value = `${yyyy}-${mm}-${dd}`;
}

window.openOrderModal = function(cakeName) {
  const modal = document.getElementById('orderModal');
  const cakeSelect = document.getElementById('cakeType');
  
  if (cakeName && cakeSelect) {
    // Try to find matching option or set first closest
    for (let i = 0; i < cakeSelect.options.length; i++) {
      if (cakeSelect.options[i].text.toLowerCase().includes(cakeName.toLowerCase()) || 
          cakeSelect.options[i].value.toLowerCase().includes(cakeName.toLowerCase())) {
        cakeSelect.selectedIndex = i;
        break;
      }
    }
  }

  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
};

window.closeOrderModal = function() {
  const modal = document.getElementById('orderModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
};

window.handleOrderSubmit = function(event) {
  event.preventDefault();
  
  const cakeType = document.getElementById('cakeType').value;
  const custName = document.getElementById('custName').value;
  const custPhone = document.getElementById('custPhone').value;
  const orderDate = document.getElementById('orderDate').value;

  showToast(`✨ Cảm ơn quý khách ${custName}! Đơn đặt bánh "${cakeType}" đã được ghi nhận. Maison Cakery sẽ liên hệ hotline ${custPhone} để xác nhận trong ít phút.`);

  closeOrderModal();
  document.getElementById('orderForm').reset();
  initOrderDatePicker();
};

/* -------------------- GALLERY LIGHTBOX -------------------- */
window.openLightbox = function(src, caption) {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');

  if (modal && img) {
    img.src = src;
    img.alt = caption || 'Maison Cakery Artwork';
    if (cap) cap.textContent = caption || '';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
};

window.closeLightbox = function() {
  const modal = document.getElementById('lightboxModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
};

/* -------------------- KEYBOARD ACCESSIBILITY -------------------- */
function initKeyboardEvents() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeOrderModal();
      closeLightbox();
    }
  });

  // Close modals on backdrop click
  const orderModal = document.getElementById('orderModal');
  if (orderModal) {
    orderModal.addEventListener('click', (e) => {
      if (e.target === orderModal) closeOrderModal();
    });
  }
}

/* -------------------- TOAST NOTIFICATION -------------------- */
function showToast(message, duration = 5000) {
  let toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}
