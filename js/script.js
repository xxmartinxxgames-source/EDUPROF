//Aquí como funcionaría la parte de la lista de scooters, es un JS generado por gemini, para que te guies tantito, no incluí la lista de reseñas de usuarios
//Dime que piensas y vee mis comentarios

// ¿Cómo se haría esto con JavaScript (Ejemplo de la Estructura)?
// Para responder a tu pregunta sobre cómo se aplicaría JavaScript para que aparezca la lista, aquí te muestro la estructura básica que tu equipo de desarrollo seguiría.
// El JavaScript tomaría los datos de una fuente (ej: un archivo JSON o una API) y los convertiría en el HTML que se inyectará en el contenedor (id="scooter-list-content").

//1. Datos de Ejemplo (Simulando un JSON)
//El desarrollador tendría un conjunto de datos como este, que cambiaría al hacer clic en una comuna:


// Datos que simulan los scooters de Santiago
const scootersSantiago = [
    {
        id: 'A753',
        modelo: 'VoltMax Pro',
        foto: 'img/scooter_pro.jpg',
        estado: 'En línea',
        ubicacion: 'Calle Huérfanos con Ahumada',
        bateria: 85
    },
    {
        id: 'B109',
        modelo: 'ZeepLite',
        foto: 'img/scooter_lite.jpg',
        estado: 'Cargando',
        ubicacion: 'Estación de carga Plaza de Armas',
        bateria: 15
    }
    // ... más scooters
];

// 2. La Función de Generación de HTML
// El corazón del JS sería una función que itere sobre esos datos y construya tu estructura de rectángulos:


function mostrarScooters(comuna) {
    // 1. Obtener los datos (ej. scootersSantiago, scootersProvidencia)
    const datos = obtenerDatosPorComuna(comuna); // Esta función traería los datos reales

    // 2. Obtener el contenedor
    const contenedor = document.getElementById('scooter-list-content');
    contenedor.innerHTML = ''; // Limpiar cualquier contenido anterior

    let htmlContenido = '';

    datos.forEach(scooter => {
        // 3. Crear el HTML para cada "rectángulo de información"
        htmlContenido += `
            <div class="scooter-info-card">
                <img src="${scooter.foto}" alt="Scooter ${scooter.modelo}">
                
                <div class="scooter-details">
                    <h4>ID: ${scooter.id} (${scooter.modelo})</h4>
                    <p>Estado: 
                        <span class="status status-${scooter.estado.toLowerCase().replace(/ /g, '-')}">
                            ${scooter.estado} (${scooter.bateria}%)
                        </span>
                    </p>
                    <p>Última Ubicación: <strong>${scooter.ubicacion}</strong></p>
                </div>
                
                <div class="scooter-report">
                    <textarea placeholder="Reportar problema con scooter ${scooter.id}..."></textarea>
                    <button class="btn btn-danger">Reportar</button>
                </div>
            </div>
        `;
    });

    // 4. Inyectar todo el HTML de la lista en el div de destino
    contenedor.innerHTML = htmlContenido;
    document.getElementById('display-title').textContent = `Scooters Disponibles en ${comuna}`;
}

// 3. El Evento Click (En scooters.html)
//Finalmente, se agregaría el listener a tus tarjetas de comuna:


// Este código iría al final de scooters.html, dentro de una etiqueta <script>
document.querySelectorAll('.comuna-card').forEach(card => {
    card.addEventListener('click', () => {
        const comunaSeleccionada = card.getAttribute('data-comuna');
        // Llama a la función que generará y mostrará la lista
        mostrarScooters(comunaSeleccionada); 
    });
});