 async function crearTarjetasReport (){
     const URL = "http://localhost:8080/reportes/read";
     const listaUl = document.getElementById('listaReportes');

     try {
        const respuesta = await fetch(URL);
        const reportes = await respuesta.json();

        if (!Array.isArray(reportes) || reportes.length === 0){
            listaUl.innerHTML = '<li class = "noReports">No hay reportes aún</li>';
            return;
        }

        const actuales = reportes.toReversed();
        actuales.forEach(reporte => {
            const li = document.createElement('li');
            li.classList.add('review-block');

            li.innerHTML= `
                <p class="review-meta"><strong>${reporte.comuna}</strong> · <strong>Modelo ${reporte.idScooter}</strong> · <span class="review-date">${reporte.fecha}</span></p>
                <p class="review-text">${reporte.reporte}</p>
            `;

            listaUl.appendChild(li);
        });
     } catch (error) {
        console.log("Ocurrio un error: "+ error);
     }
 }

document.addEventListener('DOMContentLoaded', crearTarjetasReport);