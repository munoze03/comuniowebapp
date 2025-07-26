document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault(); // <- esta línea está perfectamente bien

    const username = document.getElementById("user").value;
    const password = document.getElementById("pass").value;

    console.log("Usuario:", username);
    console.log("Contraseña:", password);

    fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ username, password })
  })
  .then(res => res.text())
  .then(data => {
    console.log("Respuesta del servidor:", data);
    // Aquí puedes redirigir o mostrar mensaje
  })
  .catch(err => console.error(err));
  }); // <- ¡OJO! esta llave y este paréntesis son necesarios