document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault(); 

    const username = document.getElementById("user").value;
    const password = document.getElementById("pass").value;

    console.log("Usuario:", username);
    console.log("Contraseña:", password);

    fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  .then(res => res.json())
  .then(data => {
    console.log("Respuesta del servidor:", data);
    // Aquí puedes redirigir o mostrar mensaje
  })
  .catch(err => console.error(err));
  }); // <- ¡OJO! esta llave y este paréntesis son necesarios