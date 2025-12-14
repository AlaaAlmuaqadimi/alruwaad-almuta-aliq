
 
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

    
  function showToast(msg = "تم الإرسال بنجاح ✅", type = "success") {
    // إذا عندك توست جاهز في الصفحة استعمله، إذا لا شوف الكود رقم (2) تحت.
    const toast = document.getElementById("toast");
    const toastMsg = document.getElementById("toastMsg");

    if (!toast || !toastMsg) {
      console.log(msg); // fallback بدون alert
      return;
    }

    toastMsg.textContent = msg;

    // لون حسب الحالة (اختياري)
    toast.classList.remove("toast-success", "toast-error");
    toast.classList.add(type === "error" ? "toast-error" : "toast-success");

    toast.classList.add("show");
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 2500);
  }

  function submitForm() {
    const form = document.querySelector(".contact-form-card form");

    const formData = new FormData(form);

    fetch("send_email.php", {
      method: "POST",
      body: formData
    })
    .then(async (res) => {
      const text = await res.text();

      // إذا PHP رجّع خطأ (HTTP 400/500)
      if (!res.ok) throw new Error(text || "فشل الإرسال");

      // نجاح
      showToast(text || "تم إرسال طلبك بنجاح ✅", "success");
      form.reset();
    })
    .catch((err) => {
      // ❌ بدون alert — توست خطأ فقط
      showToast(err.message || "حدث خطأ أثناء الإرسال ❌", "error");
    });
  } 

