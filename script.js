// ===== Ano dinâmico no rodapé =====
document.getElementById("ano").textContent = new Date().getFullYear();

// ===== Header com sombra ao rolar =====
const header = document.querySelector(".header");
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// ===== Menu mobile =====
const toggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

const closeNav = () => {
  nav.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Abrir menu");
};

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
});

// Fecha o menu ao clicar em um link
nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeNav));

// Fecha com ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeNav();
});

// ===== Formulário de contato (sem back-end: monta WhatsApp ou e-mail) =====
const form = document.getElementById("contactForm");
if (form) {
  const WHATSAPP = "5551996040806";
  const EMAIL = "angelagrubelbandeira@gmail.com";
  const errorEl = document.getElementById("cfError");
  let channel = "whatsapp";

  // Captura qual botão foi usado para enviar
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

// ===== Reveal on scroll =====
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => io.observe(el));

  // Rede de segurança: garante que nada fique invisível caso o
  // IntersectionObserver não dispare (alguns ambientes/headless).
  setTimeout(() => {
    revealEls.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) el.classList.add("is-visible");
    });
  }, 1200);
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}
