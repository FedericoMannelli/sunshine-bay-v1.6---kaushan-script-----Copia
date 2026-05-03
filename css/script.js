// Registrazione dei plugin GSAP necessari
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/**
 * runHomeEntrance()
 * Gestisce l'animazione iniziale quando si accede alla pagina o si chiude il menu.
 * Anima le immagini della hero e "disegna" il titolo SVG.
 */
function runHomeEntrance() {
  const heroImages = document.querySelectorAll(".hero-img");

  // RESET: Riporta gli elementi allo stato iniziale (invisibili/spostati) 
  // prima di far partire l'animazione. Necessario per la ripetizione al toggle del menu.
  gsap.set(".hero-img", { y: -80, opacity: 0 });
  gsap.set(".hero-title-container", { opacity: 0, y: -40 });
  gsap.set(".title-line-1, .title-line-2", { opacity: 0, y: -30 });

  // Creazione della Timeline principale per sincronizzare gli ingressi
  const tl = gsap.timeline();

  // 1. Ingresso immagini: se esistono, le facciamo apparire
  if (heroImages.length > 0) {
    tl.to(heroImages, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.1,
      ease: "power3.out",
      onStart: () => console.log("Animazione immagini partita")
    }, 0.3);
  }
  // 2. Apparizione contenitore titolo
  tl.to(".hero-title-container", { 
    opacity: 1, 
    y: 0,
    duration: 1.2,
    ease: "power3.out"
  }, 0.3)
  // 3. Animazione delle nuove righe di testo
  .to(".title-line-1, .title-line-2", {
    opacity: 1,
    y: 0,
    duration: 1.2,
    stagger: 0.2, // Fa apparire la seconda riga poco dopo la prima
    ease: "power3.out"
  }, 0.3); // Inizia insieme alle immagini e al contenitore
}

// Avvia l'animazione non appena il DOM è pronto
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", runHomeEntrance);
} else {
  runHomeEntrance();
}

// --- EFFETTI PARALLAX ALLO SCROLL ---
// Ogni immagine si muove a una velocità diversa rispetto allo scroll (scrub)
gsap.to(".hero-title-container", {
  y: -150, // Il titolo sale in modo fluido durante lo scroll
  scrollTrigger: { trigger: ".hero", start: "top top", scrub: 1 },
});

gsap.to(".hero-img-1", {
  y: -60,
  scrollTrigger: { trigger: ".hero", start: "top top", scrub: 1 },
});
gsap.to(".hero-img-2", {
  y: -120, // Più veloce della 1
  scrollTrigger: { trigger: ".hero", start: "top top", scrub: 1 },
});
gsap.to(".hero-img-3", {
  y: -220, // La più veloce
  scrollTrigger: { trigger: ".hero", start: "top top", scrub: 1 },
});

// --- DISSOLVENZA IMMAGINI ---
// Man mano che scendi, le immagini della hero diventano quasi trasparenti 
// per dare enfasi ai contenuti successivi.
gsap.to(".hero-images-container", {
  opacity: 0.2,
  scrollTrigger: {
    trigger: ".hero",
    start: "center center",
    end: "bottom top",
    scrub: true,
  },
});

// --- ANIMAZIONE TESTO STORYTELLING ---
// Il testo "L'Anima della Baia" sale e appare quando entra nella visuale (80% della finestra)
gsap.fromTo(".story-text", 
  { opacity: 0, y: -40 },
  {
    opacity: 1,
    y: 0,
    duration: 1.2,
    scrollTrigger: {
      trigger: ".storytelling",
      start: "top 80%",
    },
});

// --- ANIMAZIONE SEZIONE COLAZIONE ---
gsap.fromTo("#breakfast .breakfast-content, #breakfast .breakfast-image", 
  { opacity: 0, y: -30 },
  {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#breakfast",
      start: "top 85%", // Inizia un po' prima
    }
  }
);

// --- ANIMAZIONE NUOVE SEZIONI (ROOMS & TERRITORY) ---
// Animazione per le card delle camere
gsap.fromTo(".room-card", 
  { opacity: 0, y: -50 },
  {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#rooms",
      start: "top 90%", // Trigger più sensibile
    }
  }
);

// Animazione per le card del territorio
gsap.fromTo(".territory-card", 
  { opacity: 0, y: -50 },
  {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#territory",
      start: "top 90%",
    }
  }
);

/**
 * animateSectionEntrance(id)
 * Funzione di utilità per rieseguire l'animazione top-down 
 * quando si naviga tramite menu.
 */
function animateSectionEntrance(id) {
  const section = document.querySelector(id);
  if (!section) return;

  let targetElements;
  if (id === "#territory") targetElements = ".territory-card";
  else if (id === "#rooms") targetElements = ".room-card";
  else if (id === "#breakfast") targetElements = "#breakfast .breakfast-content, #breakfast .breakfast-image";
  else if (id === "#storytelling") targetElements = ".story-text";
  else if (id === "#contact") targetElements = ".footer-container > *";
  else if (id === ".hero") { runHomeEntrance(); return; }

  if (targetElements) {
    gsap.fromTo(targetElements, 
      { opacity: 0, y: -50 }, 
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" }
    );
  }
}

// --- Gestione Menu Overlay Full-screen ---
// Gestisce l'apertura del menu e l'animazione del tasto hamburger
const menuToggle = document.querySelector('.sb-nav-hamburger');
const bodyElement = document.body;

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    // Controlla se il menu si sta aprendo o chiudendo
    const isOpening = !bodyElement.classList.contains('sb-menu-open');
    
    // Attiva le classi CSS per le animazioni (hamburger e overlay)
    menuToggle.classList.toggle('sb-is-active');
    bodyElement.classList.toggle('sb-menu-open');

    if (isOpening) {
      // Animazione di entrata per le voci del menu (stagger)
      gsap.fromTo(".sb-menu-item", 
        { opacity: 0, y: -20 }, 
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out", delay: 0.3 }
      );
    }

    // Se chiudiamo il menu, resettiamo l'animazione della hero per un effetto "fresco"
    if (!isOpening) {
      // Piccolo delay per permettere la transizione di chiusura prima di nascondere con display: none
      setTimeout(() => {
        runHomeEntrance();
      }, 400);
    }
  });

  // Gestione click sui link del menu
  document.querySelectorAll('.sb-menu-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('href');
      
      // Chiude il menu dopo il click
      menuToggle.classList.remove('sb-is-active');
      bodyElement.classList.remove('sb-menu-open');

      // GSAP Smooth Scroll
      gsap.to(window, {
        duration: 1.2,
        scrollTo: target,
        ease: "power3.inOut",
        onComplete: () => {
          animateSectionEntrance(target);
        }
      });
    });
  });
}