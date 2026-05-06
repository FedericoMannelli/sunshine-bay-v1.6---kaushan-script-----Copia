// Registrazione dei plugin GSAP necessari
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/**
 * runHomeEntrance()
 * Gestisce l'animazione iniziale quando si accede alla pagina o si chiude il menu.
 * Anima le immagini della hero e "disegna" il titolo SVG.
 */
function runHomeEntrance() {
  const heroImages = document.querySelectorAll(".hero-img");
  const titleContainer = document.querySelector(".hero-title-container");
  const titleLines = document.querySelectorAll(".title-line-1, .title-line-2");

  if (!heroImages.length && !titleContainer && !titleLines.length) return;

  // RESET: Riporta gli elementi allo stato iniziale (invisibili/spostati) 
  // prima di far partire l'animazione. Necessario per la ripetizione al toggle del menu.
  if (heroImages.length) gsap.set(heroImages, { y: -80, opacity: 0 });
  if (titleContainer) gsap.set(titleContainer, { opacity: 0, y: -40 });
  if (titleLines.length) gsap.set(titleLines, { opacity: 0, y: -30 });

  // Creazione della Timeline principale per sincronizzare gli ingressi
  const tl = gsap.timeline();

  // 1. Ingresso immagini
  if (heroImages.length > 0) {
    tl.to(heroImages, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.1,
      ease: "power3.out",
    }, 0.3);
  }

  // 2. Apparizione contenitore titolo
  if (titleContainer) {
    tl.to(titleContainer, {
      opacity: 1, 
      y: 0,
      duration: 1.2,
      ease: "power3.out"
    }, 0.3);
  }

  // 3. Animazione righe di testo
  if (titleLines.length > 0) {
    tl.to(titleLines, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    }, "-=0.8");
  }
}

// Avvia l'animazione non appena il DOM è pronto
document.addEventListener("DOMContentLoaded", runHomeEntrance);

// --- EFFETTI PARALLAX ALLO SCROLL ---
// Ogni immagine si muove a una velocità diversa rispetto allo scroll (scrub)
if (document.querySelector(".hero")) {
  gsap.to(".hero-title-container", {
    y: -150, // Il titolo sale in modo fluido durante lo scroll
    scrollTrigger: { trigger: ".hero", start: "top top", scrub: 1 },
  });

  // Configurazione Parallax Asimmetrico: Senior Refactoring
  const parallaxConfigs = [
    { sel: ".hero-img-1", y: -60 },
    { sel: ".hero-img-2", y: -120 },
    { sel: ".hero-img-3", y: -220 }
  ];

  parallaxConfigs.forEach(config => {
    const el = document.querySelector(config.sel);
    if (el) {
      gsap.to(el, {
        y: config.y,
        scrollTrigger: { trigger: ".hero", start: "top top", scrub: 1 },
      });
    }
  });

  // --- DISSOLVENZA IMMAGINI ---
  gsap.to(".hero-images-container", {
    opacity: 0.2,
    scrollTrigger: { trigger: ".hero", start: "center center", end: "bottom top", scrub: true },
  });
}

// --- ANIMAZIONE TESTO STORYTELLING ---
// Il testo "L'Anima della Baia" sale e appare quando entra nella visuale (80% della finestra)
const storyText = document.querySelector(".story-text");
const storytellingSection = document.querySelector(".storytelling");

if (storyText) {
  // Se siamo nella Home (esiste .storytelling)
  if (storytellingSection) {
    gsap.fromTo(storyText, 
      { opacity: 0, y: -50 }, 
      {
        opacity: 1,
        y: 0, 
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: storytellingSection,
          start: "top 85%",
        },
    });

    // Dinamismo Storytelling (Parallax)
    gsap.to(storyText, {
      y: -80,
      scrollTrigger: {
        trigger: storytellingSection,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5
      }
    });
  } else {
    // Se siamo in una pagina stanza (non esiste .storytelling), lo facciamo apparire subito
    gsap.to(storyText, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.5
    });
  }
}


// --- ANIMAZIONE SEZIONE COLAZIONE ---
const breakfastSection = document.querySelector("#breakfast");
if (breakfastSection) {
  const bElements = breakfastSection.querySelectorAll(".breakfast-content, .breakfast-image");
  if (bElements.length > 0) {
    gsap.fromTo(bElements, 
      { opacity: 0, y: -80 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: breakfastSection,
          start: "top 85%",
        }
      }
    );
  }

  const bImageContainer = breakfastSection.querySelector(".breakfast-image");
  const bImage = bImageContainer?.querySelector("img");
  if (bImage) {
    gsap.to(bImage, {
      y: -50, // Movimento interno più contenuto
      scale: 1.1, // Leggero zoom per non mostrare i bordi durante il movimento
      scrollTrigger: {
        trigger: bImageContainer,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5
      }
    });
  }
}

// --- ANIMAZIONE NUOVE SEZIONI (ROOMS & TERRITORY) ---

/**
 * initCardsAnimations(selector, triggerId)
 * Inizializza le animazioni delle card: Entrance (laterale su mobile), Parallax e comparsa testo.
 */
function initCardsAnimations(selector, triggerId) {
  gsap.utils.toArray(selector).forEach((card, i) => {
    const cardContent = card.querySelector(".card-content");

    // 1. Animazione di Entrata Laterale (Sinistra/Destra alternata)
    gsap.fromTo(card, 
      { 
        opacity: 0, 
        y: 0,
        x: i % 2 === 0 ? -150 : 150 
      },
      {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
        }
      }
    );

    // 2. Animazione del testo interno (Appare dopo la card)
    if (cardContent) {
      gsap.fromTo(cardContent,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          }
        }
      );
    }

    // 3. Dinamismo Parallax (Sempre attivo allo scroll)
    const parallaxY = selector === ".room-card" ? (-80 - (i * 25)) : (-60 - (i * 15));
    gsap.to(card, {
      y: parallaxY,
      scrollTrigger: {
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });
  });
}

// Inizializzazione per Camere e Territorio
initCardsAnimations(".room-card", "#rooms");
initCardsAnimations(".territory-card", "#territory");

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
    // Applichiamo l'entrata laterale alternata anche al click per Camere e Territorio
    if (id === "#territory" || id === "#rooms") {
      gsap.utils.toArray(targetElements).forEach((el, i) => {
        gsap.fromTo(el, 
          { opacity: 0, x: i % 2 === 0 ? -150 : 150, y: 0 }, 
          { opacity: 1, x: 0, y: 0, duration: 1, ease: "power3.out", delay: i * 0.1 }
        );
      });
    } else {
      gsap.fromTo(targetElements, 
        { opacity: 0, y: -50 }, // Allineato alla nuova animazione
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" }
      );
    }

    // Animazione specifica per i testi interni alle card al click
    if (id === "#territory" || id === "#rooms") {
      const contents = section.querySelectorAll(".card-content");
      if (contents.length > 0) {
        gsap.fromTo(contents, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.8, delay: 0.5, stagger: 0.1 }
      );
      }
    }
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
      const menuItems = document.querySelectorAll(".sb-menu-item");
      if (menuItems.length > 0) {
        gsap.fromTo(menuItems, 
          { opacity: 0, y: -20 }, 
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out", delay: 0.3 }
        );
      }
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
      const target = link.getAttribute('href');
      
      // Se il link è un'ancora locale (ID o Classe) sulla stessa pagina
      if (target.startsWith('#') || target.startsWith('.')) {
        const targetElement = document.querySelector(target);
        if (targetElement) {
          e.preventDefault();
          
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
        }
      }
      // Altrimenti (es. link a ../index.html) lasciamo che il browser navighi normalmente
    });
  });
}

/**
 * initRoomDetailPageAnimations()
 * Gestisce l'effetto Mirror Gallery: foto sinistra da sinistra, foto destra da destra.
 */
function initRoomDetailPageAnimations() {
  if (!document.querySelector('.room-hero')) return;

  // Hero Entrance
  gsap.from(".room-hero h1", { opacity: 0, y: 100, duration: 1.5, ease: "power4.out" });
  
  // Mirror Gallery Entrance
  const galleryRows = document.querySelectorAll(".room-gallery-row");
  galleryRows.forEach(row => {
    const left = row.querySelector(".photo-left");
    const right = row.querySelector(".photo-right");
    const info = row.querySelector(".room-tech-info") || row.querySelector(".room-info");

    if (left || right || info) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: "top 80%",
        }
      });

      if (left) tl.from(left, { x: -200, opacity: 0, duration: 1.2, ease: "power3.out" });
      if (right) tl.from(right, { x: 200, opacity: 0, duration: 1.2, ease: "power3.out" }, left ? "-=1" : 0);
      if (info) tl.from(info, { opacity: 0, scale: 0.95, duration: 0.8, ease: "power2.out" }, "-=0.5");
    }
  });

  // Animazione icone navigazione altre stanze
  const otherRoomsItems = document.querySelectorAll(".sb-room-nav-item");
  if (otherRoomsItems.length > 0) {
    // 1. Animazione di Entrata (Fade-in quando appaiono)
    gsap.set(otherRoomsItems, { opacity: 0, scale: 0.7 }); // Stato iniziale
    
    gsap.to(otherRoomsItems, {
      scrollTrigger: {
        trigger: ".sb-room-nav-grid",
        start: "top 95%", // Più sensibile: scatta quasi subito quando appare il bordo superiore
      },
      opacity: 1,
      scale: 1,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out",
      overwrite: "auto"
    });

    // 2. Parallax Scroll (Scrub): Ogni logo sale a velocità diversa
    otherRoomsItems.forEach((item, i) => {
      gsap.to(item, {
        y: -40 - (i * 20), // Spostamento asimmetrico
        scrollTrigger: {
          trigger: ".sb-room-nav-grid",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      });
    });
  }
  ScrollTrigger.refresh();
}

// Boot init based on page type
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector('.room-hero')) initRoomDetailPageAnimations();
});