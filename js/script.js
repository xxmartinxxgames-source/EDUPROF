const formulario = document.getElementById('formulario');

formulario.addEventListener('submit', (e)=> {
    e.preventDefault();
    const user = document.getElementById('userName').value.trim();
    const comentario = document.getElementById('feedbackMessage').value;

        let feedbackObject = {
            nombreUsuario: user,
            comentario: comentario
        }
    feedbackEnviar(feedbackObject);
    formulario.reset();
})


    async function feedbackEnviar(feedbackObject){
        const URL = "http://localhost:8080/feedback/crear";  

        try {
          const respuesta = await fetch (URL,{
                                 method: "POST",
                                    headers: {
                                    "Content-Type" : "application/json"
                                    },
                                    body: JSON.stringify(feedbackObject)
                                })
        } catch (error) {
                console.log("Ocurrio un error: "+ error);
        }
    }


    async function crearTarjetaFeed(){
        const URL = "http://localhost:8080/feedback/leer";
        const listaUl = document.getElementById('lista');
        try {
            const respuesta = await fetch(URL);
            const comentarios = await respuesta.json();

            if(!Array.isArray(comentarios) || comentarios.length===0){
                listaUl.innerHTML = '<li class = "noComents">No hay comentarios recientes</li>'
                return;
            }
            
                const actuales = comentarios.toReversed();
                actuales.forEach(feedback => {
                    const li = document.createElement('li');
                    li.classList.add('review-block');

                    li.innerHTML = `
                        <p class="review-meta"><strong>${feedback.nombreUsuario}</strong> · <span class="review-date">${feedback.fecha}</span></p>
                        <p class="review-text">${feedback.comentario}</p>
                    `;

                    listaUl.appendChild(li);
            
                });
             
        } catch (error) {
            console.error("Hubo un problema con la operación fetch:", error);

            listaUl.innerHTML = '<li>Error al cargar los comentarios</li>';
        }
    }


document.addEventListener('DOMContentLoaded', crearTarjetaFeed);