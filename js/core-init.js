// Questo file contiene la logica di inizializzazione legacy spostata per evitare conflitti
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function runHomeEntrance() {
  const heroImages = document.querySelectorAll(".hero-img");
  gsap.set(".hero-img", { y: -80, opacity: 0 });
  gsap.set(".hero-title-container", { opacity: 0, y: -40 });
  gsap.set(".title-line-1, .title-line-2", { opacity: 0, y: -30 });

  const tl = gsap.timeline();
  if (heroImages.length > 0) {
    tl.to(heroImages, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.1,
      ease: "power3.out"
    }, 0.3);
  }
  tl.to(".hero-title-container", { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, 0.3)
    .to(".title-line-1, .title-line-2", { opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: "power3.out" }, 0.3);
}