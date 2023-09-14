const contenedor = document.getElementById("contenedor-tarjeta");
const btnCrear = document.getElementById("btn-crear");
const myModal = new bootstrap.Modal(document.getElementById('myModal'));
const btnPublicar = document.getElementById("btn-publicar");
const formulario = document.getElementById("formulario");

let html = ''
let option = ''
let idForm = ''

const inputTitulo = document.getElementById("inputTitulo")
const inputContenido = document.getElementById("imputContenido")
const inputEnlace = document.getElementById("inputUrl")

btnCrear.addEventListener("click", () => {
    option = "new"
    btnPublicar.textContent = "Publicar"
    inputTitulo.value = ""
    inputContenido.value = ""
    inputEnlace.value = ""
    myModal.show()
})

document.addEventListener("click", (event) => {
    if (event.target.matches("#btnEliminar")) {
        const article = event.target.closest(".tg")
        const idArticle =  article.dataset.id

         
    Swal.fire({
        title: '¿Estás seguro que quieres eliminar?',
        text: "No podrás revertir esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`http://localhost:3000/api/tasks/${idArticle}`, {
            method: "DELETE"
        }).then(res => {
            if (res.ok) {
                article.remove()
            }
        }).catch(err => {
            console.error(err)
        })    
        Swal.fire(
            'Eliminado!',
            'Se eliminó tu publicación.',
            'success'
        )
        }
    })  
    }
})


/*document.addEventListener("click", (event) => {
    if (event.target.matches("#btnEliminar")) {
        const article = event.target.closest(".tg");
        const idArticle =  article.dataset.id
        
        fetch(`http://localhost:3000/api/tasks/${idArticle}`, {
        method: "DELETE"
    }).then(res => {
        if (res.ok) {
            article.remove()
        }
    }).catch(err => {
        console.error(err)
    })
    }
})*/


document.addEventListener("click", (event) => {
    if (event.target.matches("#btnEditar")) {
        const article = event.target.closest(".tg");
        //console.log(article)
      
        const idArticle =  article.dataset.id;
        const urlEnlaceEdit = article.children[0].children[0].children[0].src;
        const tituloEdit = article.children[0].children[1].children[0].children[0].textContent;
        const contenidoEdit = article.children[0].children[1].children[0].children[1].textContent;
        
        idForm = idArticle;
        inputEnlace.value = urlEnlaceEdit;
        inputTitulo.value = tituloEdit;
        inputContenido.value = contenidoEdit;
        option = "edit";
        btnPublicar.textContent = "Editar Publicación";
        myModal.show();        
    }
})

formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    if(option === "new") {
        const nuevaPublicacion = {
            titulo: inputTitulo.value,
            contenido: inputContenido.value,
            enlace: inputEnlace.value,
        };

        fetch('http://localhost:3000/api/tasks', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevaPublicacion)
        }).then(res => {
            if(res.ok){
                alert("Publicación creada");
                myModal.hide();
                location.reload();
            }
        })
        .catch((err) => {
            console.error(err)
        });

    }

    if(option === "edit") {
        const nuevaPublicacion = {
            titulo: inputTitulo.value,
            contenido: inputContenido.value,
            enlace: inputEnlace.value,
        };
        console.log(nuevaPublicacion);
    
        fetch(`http://localhost:3000/api/tasks/${idForm}`, {
            method: "PUT",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(nuevaPublicacion)
        }).then(res => {
            if(res.ok){
                alert("La publicación ha sido editada")
                myModal.hide();
                location.reload();
            }

        })

    }
});


fetch('http://localhost:3000/api/tasks')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        data.forEach(task => {
            html += `
            <article class="tg card text mb-3 d-flex justify-content-center" data-id="${task.id}">
                <div class="row g-0" id="contenedor-tarjeta">
                    <div class="col-md-4 d-flex align-items-center justify-content-center">
                        <img src="${task.enlace}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${task.titulo}</h5>
                            <p class="card-text">${task.contenido}</p>
                            <p class="card-text text-end"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                            <div class="text-end">
                                <a class="btn btn-secondary" id="btnEditar">Editar publicación</a>
                                <a class="btn btn-danger" id="btnEliminar">eliminar publicación</a>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
            `
            contenedor.innerHTML = html;
            
        });
    })
    