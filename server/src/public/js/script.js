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
        confirmButtonColor:'#D80032', 
        cancelButtonColor: '#867070',
        confirmButtonText: 'Si, eliminar!',
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`http://localhost:3000/api/posts/${idArticle}`, {
            method: "DELETE"
        }).then(res => {
            if (res.ok) {

                article.remove()
            }
        }).catch(err => {
            console.error(err)
        })    
        Swal.fire( {
            title: 'Eliminado!',
            text: 'Se eliminó tu publicación.',
            icon: 'success',
            confirmButtonColor: '#867070',
            
        },
            
            
            
        )
        }
    })  
    }
})


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

        fetch('http://localhost:3000/api/posts', {
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
    
        fetch(`http://localhost:3000/api/posts/${idForm}`, {
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
