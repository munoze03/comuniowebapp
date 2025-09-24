// JS de inicio de sesion
document.addEventListener("DOMContentLoaded", () => {
  // Al cargar la página, rellena usuario si está guardado
  const savedUsername = localStorage.getItem("savedUsername");
  if (savedUsername) {
    const userInput = document.getElementById("user");
    if (userInput) {
      userInput.value = savedUsername;
    }
    const rememberCheckbox = document.getElementById("check");
    if (rememberCheckbox) {
      rememberCheckbox.checked = true;
    }
  }

  // Al enviar el formulario, guarda o elimina el usuario según checkbox
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", () => {
      const username = document.getElementById("user").value;
      const remember = document.getElementById("check").checked;
      if (remember) {
        localStorage.setItem("savedUsername", username);
      } else {
        localStorage.removeItem("savedUsername");
      }
    });
  }
});