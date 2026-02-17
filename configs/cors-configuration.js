const corsOptions = {
    // permite que cualquier origen acceda a la API
    origin: true,
    // Permite que la API envie y reciba cookies
    credentials: true,
    // Establece los metodos permitidos en la API 
    methods: "GET, POST, PUT, DELETE",
    // define los headers que el cliente puede enviar
    allowedHeaders: "Content-Type, Authorization"
}

export { corsOptions }