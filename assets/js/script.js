let areaEncriptar = document.getElementById("areaEncriptar");
const btnEncriptar = document.querySelector(".btn__encriptar");
const btnDesencriptar = document.querySelector(".btn__desencriptar");
const elements = document.querySelectorAll(".elements");
const btnCopiar = document.querySelector(".boton__aside");
const copied_text_message = document.querySelector(".copied-text-message");
let textEncriptado = document.querySelector(".tex_encriptado");

const frame = document.getElementById('frame')
const card = document.getElementById('card')
const light = document.getElementById('light')

const btnSwitch = document.querySelector("#switch-mode");
let { x, y, width, height } = frame.getBoundingClientRect()

const ocultarElementos = () => {
  elements.forEach((elemento) => elemento.classList.add("ocultar"));
  btnCopiar.classList.remove("ocultar");
  textEncriptado.classList.remove("ocultar");
};

const encriptar = () => {
  let texto = areaEncriptar.value;
  texto = texto
    .replaceAll(/e/gi, "enter")
    .replaceAll(/i/gi, "imes")
    .replaceAll(/o/gi, "ober")
    .replaceAll(/a/gi, "ai")
    .replaceAll(/u/gi, "ufat");
  textEncriptado.value = texto;
  areaEncriptar.value = "";
};

const desenCriptar = () => {
  let texto = areaEncriptar.value;
  texto = texto
    .replaceAll(/enter/gi, "e")
    .replaceAll(/imes/gi, "i")
    .replaceAll(/ober/gi, "o")
    .replaceAll(/ai/gi, "a")
    .replaceAll(/ufat/gi, "u");
  textEncriptado.value = texto;
  areaEncriptar.value = "";
};

const comprobarVacios = () => {
  if (areaEncriptar.value.trim() == "") {   
    Swal.fire({
      title: 'Error!',
      text: '¡Debes ingresar un texto!',
      icon: 'error',
      confirmButtonText: 'Okey',
    }).then((result) => {
      if (result.value) {
        location.reload();
      }
      else {} 
    });
  }
};

areaEncriptar.addEventListener("keyup", (event) => {
  if (event.getModifierState("CapsLock")) {
    Swal.fire({
      title: 'Error!',
      text: '¡Solo se puede escribir en letra minúscula!',
      icon: 'error',
      confirmButtonText: 'Okey',
    }).then((result) => {
      if (result.value) {
        location.reload();
      }
      else {
      }
    });
  }
});

btnEncriptar.addEventListener("click", () => {
  comprobarVacios();
  ocultarElementos();
  encriptar();
});

btnDesencriptar.addEventListener("click", () => {
  comprobarVacios();
  ocultarElementos();
  desenCriptar();
});

btnCopiar.addEventListener("click", () => {
  textEncriptado.select();
  textEncriptado.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(textEncriptado.value);
  copied_text_message.classList.remove("ocultar");
  setTimeout(() => {
    copied_text_message.classList.add("ocultar");
  }, 1000);
});

function mouseMove(e) {
  const left = e.clientX - x
  const top = e.clientY - y
  const centerX = left - width / 2
  const centerY = top - height / 2
  const d = Math.sqrt(centerX**2 + centerY**2)

  card.style.boxShadow = `
    ${-centerX / 5}px ${-centerY / 10}px 10px rgba(0, 0, 0, 0.2)
  `

  card.style.transform = `
    rotate3d(${-centerY / 100}, ${centerX / 100}, 0, ${d / 15}deg)
  `

  light.style.backgroundImage = `
    radial-gradient(circle at ${left}px ${top}px, #00000040, #ffffff00, #ffffff99)
    `
}

frame.addEventListener('mouseenter', () => {
  frame.addEventListener('mousemove', mouseMove)
})

frame.addEventListener('mouseleave', () => {
  frame.removeEventListener('mousemove', mouseMove)
  card.style.boxShadow = ''
  card.style.transform = ''
  light.style.backgroundImage = ''
})

window.addEventListener('resize', () => {
  rect = frame.getBoundingClientRect()
  x = rect.x
  y = rect.y
  width = rect.width
  height = rect.height
})

btnSwitch.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  btnSwitch.classList.toggle("active");
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("darkMode", "true");
  } else {
    localStorage.setItem("darkMode", "false");
  }
});
