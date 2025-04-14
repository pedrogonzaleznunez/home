// Animación de entrada con scroll
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1
});

sections.forEach(section => {
  section.classList.add('invisible');
  observer.observe(section);
});

// Clase CSS para animación
const style = document.createElement('style');
style.innerHTML = `
  .invisible {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);
