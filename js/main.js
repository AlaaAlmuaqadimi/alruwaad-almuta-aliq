
 
    // تفعيل القائمة في الجوال
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle) {
      menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('open');
      });
    }

    // تفعيل حالة الرابط النشط عند التمرير
    const navLinks = document.querySelectorAll('#mainNav a[href^="#"]');
    const sections = [...navLinks].map(link => document.querySelector(link.getAttribute('href')));

    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY + 120;
      sections.forEach((section, idx) => {
        if (!section) return;
        if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
          navLinks.forEach(a => a.classList.remove('active'));
          navLinks[idx].classList.add('active');
        }
      });
    }); 