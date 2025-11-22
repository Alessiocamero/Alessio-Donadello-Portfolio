// Theme toggle
(function(){
  const themeBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const saved = localStorage.getItem('theme') || 'light';
  root.setAttribute('data-theme', saved);
  themeBtn.addEventListener('click', ()=>{
    const current = root.getAttribute('data-theme');
    const next = current==='light'?'dark':'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
})();

// Mobile nav toggle
(function(){
  const btn = document.getElementById('menu-toggle');
  const nav = document.querySelector('.main-nav');
  btn.addEventListener('click', ()=>{
    nav.classList.toggle('open');
  });
})();

// Typing effect with variable speed
(function(){
  const el = document.getElementById('typing');
  if(!el) return;
  const words = el.dataset.words.split(',').map(w=>w.trim());
  let i=0,j=0,forward=true;
  function step(){
    const word = words[i];
    el.textContent = word.slice(0,j);
    let speed = forward ? 100 + Math.random()*50 : 40 + Math.random()*20;
    if(forward){
      if(j<word.length) j++; else {forward=false; setTimeout(step,900); return;}
    }else{
      if(j>0) j--; else {forward=true; i=(i+1)%words.length;}
    }
    setTimeout(step, speed);
  }
  step();
})();

// Reveal on scroll with scale and opacity
(function(){
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('visible');
      }
    });
  },{threshold:0.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
})();

// Animate skill bars on reveal
(function(){
  const skillBars = document.querySelectorAll('.skill .bar div');
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.style.width = entry.target.style.width || entry.target.getAttribute('style');
      }
    });
  },{threshold:0.3});
  skillBars.forEach(bar=>observer.observe(bar));
})();

// Contact form simulation
(function(){
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if(!form) return;
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const data = new FormData(form);
    if(!data.get('name')||!data.get('email')||!data.get('message')){
      status.textContent='Compila tutti i campi';
      return;
    }
    status.textContent='Invio in corso...';
    setTimeout(()=>{
      status.textContent='Messaggio inviato (simulazione)';
      form.reset();
    },1200);
  });
})();

// Set year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Extra animations: count-up numbers for stats
(function(){
  const stats = document.querySelectorAll('.stats li strong');
  stats.forEach(el => {
    const final = parseInt(el.textContent.replace('+','')) || 0;
    let current = 0;
    const increment = Math.ceil(final / 60);
    const timer = setInterval(()=>{
      current += increment;
      if(current >= final){
        current = final;
        clearInterval(timer);
      }
      el.textContent = current + (el.textContent.includes('+')?'+':'');
    }, 30);
  });
})();

// Extra animations: button bounce effect
(function(){
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      btn.style.transform = 'scale(0.9)';
      setTimeout(()=>{btn.style.transform='scale(1)';},150);
    });
  });
})();