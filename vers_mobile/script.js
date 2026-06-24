// ===== Dynamic year =====
document.getElementById("ano").textContent = new Date().getFullYear();

// ===== Bottom nav active state =====
const navItems = document.querySelectorAll(".bottom-nav__item");
const sections = document.querySelectorAll("section[id]");

const updateActiveNav = () => {
  const scrollY = window.scrollY + 100;
  let current = "home";

  sections.forEach((sec) => {
    const top = sec.offsetTop;
    const bottom = top + sec.offsetHeight;
    if (scrollY >= top && scrollY < bottom) {
      current = sec.id;
    }
  });

  navItems.forEach((item) => {
    const target = item.getAttribute("data-section");
    item.classList.toggle("bottom-nav__item--active", target === current);
  });
};

if (navItems.length && sections.length) {
  updateActiveNav();
  window.addEventListener("scroll", updateActiveNav, { passive: true });
}

// ===== Contact form =====
const form = document.getElementById("contactForm");
if (form) {
  const WHATSAPP = "5551996040806";
  const EMAIL = "angelagrubelbandeira@gmail.com";
  const errorEl = document.getElementById("cfError");
  let channel = "whatsapp";

  form.querySelectorAll("button[data-channel]").forEach((btn) => {
    btn.addEventListener("click", () => { channel = btn.dataset.channel; });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const mensagem = form.mensagem.value.trim();

    if (!nome || !mensagem) {
      errorEl.hidden = false;
      (!nome ? form.nome : form.mensagem).focus();
      return;
    }
    errorEl.hidden = true;

    if (channel === "email") {
      const assunto = `Contato pelo site — ${nome}`;
      const corpo = `Nome: ${nome}\nE-mail: ${email || "não informado"}\n\n${mensagem}`;
      window.location.href =
        `mailto:${EMAIL}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
    } else {
      const texto = `Olá, Ângela! Meu nome é ${nome}.\n${mensagem}` +
        (email ? `\n\nMeu e-mail: ${email}` : "");
      window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`, "_blank", "noopener");
    }
  });
}

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll(".section, .card, .content-tile, .hero__content, .cta-band, .contact-form");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "none";
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
  );
  revealEls.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    el.style.transition = "opacity .5s var(--ease, ease), transform .5s var(--ease, ease)";
    io.observe(el);
  });

  setTimeout(() => {
    revealEls.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) {
        el.style.opacity = "1";
        el.style.transform = "none";
      }
    });
  }, 1200);
} else {
  revealEls.forEach((el) => {
    el.style.opacity = "1";
    el.style.transform = "none";
  });
}

// ===== Haptic feedback on nav tap (iOS) =====
navItems.forEach((el) => {
  el.addEventListener("touchstart", () => {
    if (navigator.vibrate) navigator.vibrate(6);
  });
});
