document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));

    if (target) {
      e.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});


/* ==========================================
   FORMULARIO DE ACCESO ANTICIPADO
   ========================================== */

const accessForm = document.getElementById("access-form");
const accessMessage = document.getElementById("access-message");
const accessSubmit = document.getElementById("access-submit");

if (accessForm) {
  accessForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    accessMessage.textContent = "";
    accessMessage.className = "access-message";

    accessSubmit.disabled = true;
    accessSubmit.innerHTML = "Enviando...";

    try {
      const response = await fetch(accessForm.action, {
        method: "POST",
        body: new FormData(accessForm),
        headers: {
          "Accept": "application/json"
        }
      });

      if (response.ok) {
        accessForm.reset();

        accessMessage.textContent =
          "✓ ¡Listo! Te avisaremos cuando MotivAppte esté disponible.";

        accessMessage.classList.add("success");

        accessSubmit.innerHTML = "¡Apuntado! ✓";

      } else {
        throw new Error("Error al enviar el formulario");
      }

    } catch (error) {

      accessMessage.textContent =
        "Ha ocurrido un error. Inténtalo de nuevo.";

      accessMessage.classList.add("error");

      accessSubmit.innerHTML = "Intentar de nuevo →";

    } finally {

      setTimeout(() => {
        accessSubmit.disabled = false;

        if (!accessMessage.classList.contains("success")) {
          accessSubmit.innerHTML = "Apuntarme →";
        }
      }, 3000);
    }
  });
}
