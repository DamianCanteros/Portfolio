// Var and elements of DOM
const toggleTheme = document.getElementById('toggle-theme');
const toggleIcon = document.querySelector('#toggle-theme svg use');
const toggleText = document.getElementById('toggle-text');

const filterContainer = document.querySelector(".categories");
const galleryItems = document.querySelectorAll(".card");

/* ------- Dark Mode -------- */
toggleTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  
  if (toggleIcon.getAttribute('xlink:href') === '#moon') {
    toggleIcon.setAttribute('xlink:href', '#sun');
    toggleText.textContent = 'Light';
  } else {
    toggleIcon.setAttribute('xlink:href', '#moon');
    toggleText.textContent = 'Dark';
  }
});

/* ------- UP Button -------- */
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}

/* ------- Up Section -------- */
window.addEventListener('scroll', function() {
  var upSections = document.querySelectorAll('.up-section'); // Selecionamos todas las secciones

  for (var i = 0; i < upSections.length; i++) {
    var upSectionPosition = upSections[i].getBoundingClientRect().top;
    var screenPosition = window.innerHeight / 1.3;

    if (upSectionPosition < screenPosition) {
      upSections[i].style.opacity = "1";
      upSections[i].style.transform = "translateY(0)";
    }
  }
});

/* ------- Scroll To Section -------- */
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  section.scrollIntoView({ behavior: 'smooth' });
}

/* ------- Typing Effect -------- */
const typing = document.querySelector('#typing');
const typing2 = document.querySelector('#typing2');
let write; // variable para el intervalo de escritura
let write2; // variable para el intervalo de escritura de typing2

// Crear un nuevo IntersectionObserver para typing
const observer = new IntersectionObserver(entries => {
  // Si el elemento "typing" es visible
  if (entries[0].isIntersecting) {
    // Si el contenido del elemento "typing" está vacío, llamar a la función writeText para escribir en él
    if (typing.innerHTML === '') {
      writeText('Hi, I am a Full Stack', 80, typing);
    }
  } else {
    // Si el elemento "typing" ya no es visible, borrar su contenido y quitar la clase "typing-finished"
    typing.innerHTML = '';
    typing.classList.remove('typing-finished');
  }
});

// Observar el elemento "typing"
observer.observe(typing);

// Crear un nuevo IntersectionObserver para typing2
const observer2 = new IntersectionObserver(entries => {
  // Si el elemento "typing2" es visible
  if (entries[0].isIntersecting) {
    // Si el contenido del elemento "typing2" está vacío y el contenido del elemento "typing" ya está completo, llamar a la función writeText para escribir en él
    if (typing2.innerHTML === '' && typing.classList.contains('typing-finished')) {
      writeText('Developer', 150, typing2);
    }
  } else {
    // Si el elemento "typing2" ya no es visible, borrar su contenido y quitar la clase "typing-finished"
    typing2.innerHTML = '';
    typing2.classList.remove('typing-finished');
  }
});

// Observar el elemento "typing2"
observer2.observe(typing2);

// Función writeText que escribe en un solo elemento
function writeText(text = '', time = 80, label = '') {
  const array = text.split('');
  let i = 0;

  // Comprobar si el elemento ya ha sido completado antes de borrar su contenido
  if (label.classList.contains('typing-finished')) {
    label.innerHTML = '';
    label.classList.remove('typing-finished');
  }

  write = setInterval(() => {
    label.innerHTML += array[i];
    i++;

    if (i === array.length) {
      clearInterval(write);

      // Agregar clase typing-finished
      label.classList.add('typing-finished');

      // Si el elemento actual es "typing", llamar a la función writeText para escribir en "typing2"
      if (label === typing) {
        writeText('Developer', 150, typing2);
      }
    }
  }, time);

  // Si el elemento actual es "typing2", asignar el intervalo de escritura a la variable write2
  if (label === typing2) {
    write2 = write;
  }
}

/* ------- Animated Bar -------- */
const upSections = document.querySelectorAll('.up-section');
const bars = document.querySelectorAll('.cont__bar:not(.invisible)');

function resetProgressBar(bar) {
  const percentNumber = bar.querySelector('.percent-number');
  percentNumber.innerText = '0%';
  bar.querySelector('.bar').style.setProperty('--bar-length', '0');
}

function animateProgressBar(bar) {
  const percentNumber = bar.querySelector('.percent-number');
  const barLength = parseInt(bar.querySelector('.bar').classList[1].slice(5));
  let percent = 0;
  const animationDuration = 2000;
  const startTime = performance.now();
  const interval = setInterval(() => {
    const currentTime = performance.now();
    const elapsedTime = currentTime - startTime;
    percent = Math.min(barLength, Math.floor((elapsedTime / animationDuration) * barLength));
    percentNumber.innerText = `${percent}%`;
    bar.querySelector('.bar').style.setProperty('--bar-length', `${percent}%`);
    if (percent >= barLength) {
      clearInterval(interval);
    }
  }, 16);
}

function handleScroll() {
  for (let i = 0; i < upSections.length; i++) {
    const upSectionPosition = upSections[i].getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    const contBars = upSections[i].querySelectorAll('.cont__bar');
    if (upSectionPosition < screenPosition) {
      upSections[i].style.opacity = '1';
      upSections[i].style.transform = 'translateY(0)';
      for (let j = 0; j < contBars.length; j++) {
        if (contBars[j].classList.contains('invisible')) {
          contBars[j].classList.remove('invisible');
          resetProgressBar(contBars[j]);
          animateProgressBar(contBars[j]);
        }
      }
    } else {
      for (let j = 0; j < contBars.length; j++) {
        if (!contBars[j].classList.contains('invisible')) {
          contBars[j].classList.add('invisible');
        }
      }
    }
  }
}

window.addEventListener('scroll', handleScroll);
handleScroll();

// Counter Porcent Bar
bars.forEach(bar => {
  const percentNumber = bar.querySelector('.percent-number');
  const barEl = bar.querySelector('.bar');
  const barLength = parseInt(barEl.classList[1].slice(5));
  let percent = 0;
  const animationDuration = 2000; // Duración de la animación en milisegundos
  const interval = setInterval(() => {
    const transform = window.getComputedStyle(barEl).getPropertyValue('transform');
    const match = transform.match(/matrix\((.*)\)/);
    const matrixValues = match ? match[1].split(', ') : [1, 0, 0, 1, 0, 0];
    const scaleX = parseFloat(matrixValues[0]);
    percent = Math.min(barLength, Math.round(scaleX * barLength));
    percentNumber.innerText = `${percent}%`;
    barEl.style.setProperty('--bar-lenght', `${percent}%`);
    if (percent >= barLength) {
      clearInterval(interval);
    }
  }, animationDuration / 60); // Intervalo de actualización en milisegundos (aproximadamente 60 fps)
});

/* ------- Portfolio Filter -------- */

filterContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("filter-item")) {
        filterContainer.querySelector(".active").classList.remove("active");
        event.target.classList.add("active")
        const filterValue = event.target.getAttribute("data-filter")
        galleryItems.forEach(item => {
            if (item.classList.contains(filterValue) || filterValue === "all") {
                item.classList.remove("hide")
                item.classList.add("show")
            } else {
                item.classList.remove("show")
                item.classList.add("hide")
            }
        })
    }
})
