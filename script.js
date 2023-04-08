// Var and elements of DOM
const toggleTheme = document.getElementById('toggle-theme');
const toggleIcon = document.querySelector('#toggle-theme svg use');
const toggleText = document.getElementById('toggle-text');

let write2;
const typing = document.getElementById('typing');
const typing2 = document.getElementById('typing2');

const filterContainer = document.querySelector(".categories");
const galleryItems = document.querySelectorAll(".card");

//Dark Mode
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

// Mostramos el botón cuando se desplaza hacia abajo
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}

//Up Section
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

//Scroll To Section
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  section.scrollIntoView({ behavior: 'smooth' });
}

//Typing Effect
function typingEffect(text = '', time = 150, label = '') {
  const array = text.split('');
  label.innerHTML = '';
  let i = 0;

  const write = setInterval(() => {
    label.innerHTML += array[i];
    i++;

    if (i === array.length) {
      clearInterval(write);
    
      // Agregar clase typing-finished
      label.classList.add('typing-finished');
    
      // Cuando se completa la primera escritura, iniciar la segunda
      if (label === typing) {
        setTimeout(() => {
          typingEffect('Developer', 150, typing2);
        }, 500); // Espera 500 ms antes de iniciar la segunda escritura
      } else {
        clearInterval(write2);
        // Agregar clase typing-finished
        label.classList.add('typing-finished');
      }
    }
  }, time);

  if (label === typing2) {
    write2 = write;
  }
}

typingEffect('Hi, I am a Full Stack', 150, typing);

// Portfolio Filter 
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

