


 

       


  $.getScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js", function() {
    $.getScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js", function() {
      gsap.registerPlugin(ScrollTrigger); 


      
// Header Text H1
document.querySelectorAll(".animOne").forEach(el => {
  let text = el.textContent;
  el.innerHTML = text
    .split("")
    .map(char => `<span class="char">${char}</span>`)
    .join("");

  gsap.from(el.querySelectorAll(".char"), {
    y: (i) => Math.sin(i * 0.5) * 120,
    opacity: 0,
    duration: 1.2,
    ease: "elastic.out(1, 0.4)", // 🔥 key part
    stagger: {
      each: 0.05
    },
    scrollTrigger: {
      trigger: el,
      start: "top 80%",
      end: "bottom 10%",
      toggleActions: "play reverse play reverse"
    }
  });
});

       const header1 = gsap.timeline({
  scrollTrigger: {
    trigger: ".firstSection",
    start: "top 50%",
    end: "+=10%",  
  }
});

       
      /* fade-up elements */
header1.from(".fade-up", {
  y: 60,
  opacity: 0,
  duration: 0.5,
  stagger: 0.2,
  ease: "power2.out"
});


gsap.utils.toArray([
  ".tomotoImgOne",
  ".tomotoImgTwo",
  ".leftImg",
  ".rightImg"
]).forEach((el) => {

  function float() {
    gsap.to(el, {
      y: "random(-20, 20)",
      x: "random(-10, 10)",
      rotate: "random(-4, 4)",
      duration: "random(1.8, 3)",
      ease: "sine.inOut",
      onComplete: float // loop organically
    });
  }

  float();
});

const items = document.querySelectorAll(
  ".tomotoImgOne, .tomotoImgTwo, .leftImg, .rightImg, .heroImg"
);

document.addEventListener("mousemove", (e) => {
  let x = (e.clientX / window.innerWidth - 0.5) * 2;
  let y = (e.clientY / window.innerHeight - 0.5) * 2;

  items.forEach((el, i) => {
    let depth = (i + 1) * 10; // different depth per item

    gsap.to(el, {
      x: x * depth,
      y: y * depth,
      duration: 1.2,
      ease: "power3.out"
    });
  });
});
 

/* ── SIDE IMAGES (sync with early words) ── */
header1.from(".leftImg, .rightImg", {
  scale: 0.6,
  y: 60,
  opacity: 0,
  duration: 0.7,
  ease: "power2.out",
  stagger: 0.2
}, "+=0.2"); // 👈 overlaps with text

/* ── TOMATO POP (mid-wave accent) ── */
header1.from(".tomotoImgOne, .tomotoImgTwo", {
  scale: 0,
  opacity: 0,
  duration: 0.5,
  ease: "back.out(2)",
  stagger: 0.15
}, "-=0.5");

/* ── HERO IMAGE (lands with last word) ── */
header1.from(".heroImg", {
  scale: 0.7,
  y: 50,
  opacity: 0,
  duration: 1,
  ease: "power4.out"
}, "-=0.4");

/* ── BUTTON (final touch) ── */
header1.from(".orderBtn", {
  y: 30,
  opacity: 0,
  duration: 0.5,
  ease: "power2.out"
}, "-=0.3");

gsap.utils.toArray(".heart").forEach((el, i) => {

  // random values for natural feel
  let yMove = gsap.utils.random(15, 35);
  let xMove = gsap.utils.random(5, 15);
  let duration = gsap.utils.random(2.5, 4);

  // vertical float
  gsap.to(el, {
    y: `+=${yMove}`,
    duration: duration,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: i * 0.1
  });

  // slight horizontal drift
  gsap.to(el, {
    x: `+=${xMove}`,
    duration: duration + 1,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

});

// Wraps Section 

let mm = gsap.matchMedia();

/* ───────── DESKTOP ───────── */
mm.add("(min-width: 1500px)", () => {

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".wrapsSection",
      start: "top 20%",
      end: "+=1200",
      scrub: 2,
      pin: true
    }
  });

  /* Image animation */
  tl.to(".wrapsImg", {
    left: 250,
    top: 450,
    rotate: 0,
    duration: 1.4,
    ease: "power3.inOut"
  }, 0);

  /* Content */
  tl.from(".servicesContent", {
    x: 150,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
  }, "+=0.3");


  /* Content */
  tl.from(".wrapsSection h2", {
    x: 150,
    opacity: 0,
    duration: 0.9,
    ease: "power2.out"
  }, "+=0.3");
 

  /* Hearts */
  tl.fromTo(".heart",
    { opacity: 0, scale: 0.6 },
    {
      opacity: 1,
      scale: 1.1,
      duration: 0.6,
      ease: "power3.out",
      stagger: {
        each: 0.12,
        from: "center"
      }
    }
  )
  .to(".heart", {
    scale: 1,
    duration: 0.4,
    ease: "sine.out"
  }, "-=0.3");



});


/* ───────── TABLET / MOBILE ───────── */
mm.add("(max-width: 1499px)", () => {

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".wrapsSection",
      start: "top 25%", // 👈 slightly later trigger for mobile
      end: "+=900",     // 👈 shorter scroll distance
      scrub: 1.3,
      pin: true,
    }
  });

  /* Image animation (adjusted) */
  tl.to(".wrapsImg", {
    left: 150,
    top: 350, 
    rotate: 0,
    duration: 1.2,
    ease: "power2.inOut"
  }, 0);

  /* Content */
  tl.from(".servicesContent", {
    y: 80, // 👈 vertical instead of horizontal
    opacity: 0,
    duration: 0.7,
    ease: "power2.out"
  }, "+=0.2");

  /* Hearts (lighter animation) */
  tl.fromTo(".heart",
    { opacity: 0, scale: 0.7 },
    {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.1
    }
  );

  /* Heading */
  tl.from(".wrapsSection h2", {
    opacity: 0,
    y: 80,
    duration: 0.7,
    ease: "power2.out"
  }, "-=0.2");

});

/* ───────── TABLET / MOBILE ───────── */
mm.add("(max-width: 1199px)", () => {

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".wrapsSection",
      start: "top top", // 👈 slightly later trigger for mobile
      end: "+=400",     // 👈 shorter scroll distance2
      scrub: 1.1,
      pin: false,  
    }
  });

  /* Image animation (adjusted) */
  tl.to(".wrapsImg", {
    left: 150,
    top: 200, 
    rotate: 0,
    duration: 1.2,
    ease: "power2.inOut"
  }, 0);
  

});

mm.add("(max-width: 991px)", () => {

   const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".wrapsSection",
      start: "top 50%", // 👈 slightly later trigger for mobile
      end: "+=600",     // 👈 shorter scroll distance2
      scrub: 1.1,
      pin: false,   
    }
  });

   /* Image animation (adjusted) */
  tl.to(".wrapsImg", {
    left: 50,
    top: 350, 
    rotate: 0,
    duration: 1.2,
    ease: "power2.inOut"
  }, 0);

  
  

});
mm.add("(max-width: 767px)", () => {

   const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".wrapsSection",
      start: "top 60%", // 👈 slightly later trigger for mobile
      end: "bottom top",     // 👈 shorter scroll distance2
      scrub: 1,
      pin: false,   
      
    }
  });

   /* Image animation (adjusted) */
  tl.to(".wrapsImg", {
    x: 0,     // 👈 move LEFT
    y: -200,      // 👈 slight down movement 
    ease: "none"
  }, 0);

  
  

});

mm.add("(max-width: 575px)", () => {
 const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".wrapsSection",
      start: "top 60%", // 👈 slightly later trigger for mobile
      end: "bottom top",     // 👈 shorter scroll distance2
      scrub: 1,
      pin: false,   
      
    }
  });

   /* Image animation (adjusted) */
  tl.to(".wrapsImg", {
    x: 0,     // 👈 move LEFT
    y: -200,      // 👈 slight down movement 
    ease: "none"
  }, 0);

 
 

});



// Footer
       let mm2 = gsap.matchMedia();

/* Desktop */
mm2.add("(min-width: 1199px)", () => {

  const d1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".discoverSection",
      start: "top 80%",
      end: "bottom 40%",
      scrub: 1.5
    }
  });

  d1.to(".fillText", {
    width: "100%",
    ease: "none"
  });

  d1.from(".stroke", {  
    duration: 1
  }, 0);

});
mm2.add("(min-width: 992px)", () => {

  const d1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".discoverSection",
      start: "top 80%",
      end: "bottom 50%",
      scrub: 1.5
    }
  });

  d1.to(".fillText", {
    width: "100%",
    ease: "none"
  });

  d1.from(".stroke", {  
    duration: 1
  }, 0);

});


/* Mobile */
mm2.add("(max-width: 991px)", () => {

  const d1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".discoverSection",
      start: "top 85%",
      end: "top 20%",
      scrub: 1
    }
  });

  d1.to(".fillText", {
    width: "100%",
    ease: "none"
  });

  d1.from(".stroke", {  
    duration: 1
  }, 0);

});
     
        
    });
    return () => tl.kill();
  });
 
  $.getScript("https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js", function() {

      var lenis = new Lenis({
          duration: 1.8,
          easing: function(t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
          smoothWheel: true,
          wheelMultiplier: 0.9,
          touchMultiplier: 1.5,
      });

      function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

  }); 

ScrollTrigger.config({
  ignoreMobileResize: true
});



  window.addEventListener("load", () => {

        setTimeout(() => {

          lenis.resize();

          ScrollTrigger.refresh(true);

        }, 500);

      });

 
     
    






