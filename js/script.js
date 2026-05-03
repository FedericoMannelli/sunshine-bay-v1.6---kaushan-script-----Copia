// Inizializzazione GSAP e ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Animazione Titolo (Fade-in ritardato)
gsap.to(".hero-title", {
  opacity: 1,
  y: 0,
  duration: 1.5,
  delay: 0.5,
  ease: "power4.out",
});

// Effetto Parallax: Movimento differenziato (da lenta a veloce)
gsap.to(".hero-img-1", {
  y: -60,
  scrollTrigger: { trigger: ".hero", start: "top top", scrub: 1 },
});
gsap.to(".hero-img-2", {
  y: -120,
  scrollTrigger: { trigger: ".hero", start: "top top", scrub: 1 },
});
gsap.to(".hero-img-3", {
  y: -220,
  scrollTrigger: { trigger: ".hero", start: "top top", scrub: 1 },
});

// Effetto scomparsa immagini allo scroll (Reveal)
gsap.to(".hero-images-container", {
  opacity: 0.2,
  scrollTrigger: {
    trigger: ".hero",
    start: "center center",
    end: "bottom top",
    scrub: true,
  },
});

// Sezione 2: Animazione Smooth-Reveal
gsap.to(".story-text", {
  opacity: 1,
  y: 0,
  duration: 1.2,
  scrollTrigger: {
    trigger: ".storytelling",
    start: "top 80%",
  },
});