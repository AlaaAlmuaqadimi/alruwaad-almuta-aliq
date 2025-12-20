
 
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
  
function showToast() {
  const t = document.getElementById("toastCenter");
  if (!t) { console.error("toastCenter not found"); return; }

  // كسر أي display:none جاي من CSS/JS آخر
  t.style.display = "grid";     // لأن CSS عندك display:grid
  t.classList.add("show");

  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    t.classList.remove("show");
    // اختياري: ما ترجعش display none، خليه ثابت وسيختفي بالـ opacity/visibility
    // t.style.display = "";
  }, 3000);
}



  async function submitForm() {
    const form = document.getElementById("contactForm");
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;

    try {
      const res = await fetch("/send_email.php", {
        method: "POST",
        body: new FormData(form)
      });

      const data = await res.json();

      if (data.ok) {
        showToast();
        form.reset();
      } else {
        alert(data.error || "صار خطأ أثناء الإرسال");
      }
    } catch (e) {
      alert("تعذر الاتصال بالسيرفر.");
    } finally {
      btn.disabled = false;
    }
  } 

  document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    submitForm();
  });
});

