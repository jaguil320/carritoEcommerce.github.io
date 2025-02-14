
// crear los selectores

const carrito = document.querySelector('#carrito');
const listacursos = document.querySelector('#lista-cursos');
const ContenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

let articulosCarrito = []; // definir arreglo

// primero debemos llamar a la funcion que cargue los eventListener
cargarEventListener();

//definir los eventos o listener
function cargarEventListener(){

    // click al btn de agregar al carrito
    listacursos.addEventListener('click', agregarCurso);

    //elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    document.addEventListener('DOMContentLoaded',()=>{
        articulosCarrito = JSON.parse(localStorage.getItem('articulosCarrito'))
        carritoHtml();
    })


    //elimina todos cursos del carrito
    vaciarCarritoBtn.addEventListener('click',()=>{
        articulosCarrito = [];
        vaciarCarrito();
        
    
    })
}

//funciones enlazadadas alos enventos

// funcion para agregar al carrito
function agregarCurso(e){ // e en js es value que se esta definiendo para capturar el evento al momento de hacer click y evitar el salto al tocar el btn
    
    e.preventDefault(); // es para capturar ese salto al tocar el btn
    //console.log('ingrese a la funcion agregar curso');

    if(e.target.classList.contains('agregar-carrito')){
        //console.log(e.target.parentElement)
        const curso = e.target.parentElement;
        leerDatosCurso(curso);

    }
}

// funcion para crear un btn que elimine un curso del carrito
function eliminarCurso(e){
    
    e.preventDefault();
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        //console.log(cursoId);
        

        const existe = articulosCarrito.some(cursos => cursos.id === cursoId);
        
        if(existe){
            const cursos = articulosCarrito.map(cursos =>{
                //console.log(cursos.id);

                if(cursos.id === cursoId){
                    //primero verifico el id para
                    //asegurar aya el¿ncontrado el id del curso correcto o seleccionado
                    if(cursos.cantidad > 1){
                        cursos.cantidad--;
                        return cursos;

                    }else{
                        articulosCarrito = articulosCarrito.filter(cursos => cursos.id !== cursoId)
                        return cursos;
                    }
                }
            })
        }

        carritoHtml();
    }

}

//baciar todo el carrito
function vaciarCarrito(){
    //forma lenta para borrar
    //ContenedorCarrito.innerHTML=" ";

    //forma Rapida
    while(ContenedorCarrito.firstChild){
        ContenedorCarrito.removeChild(ContenedorCarrito.firstChild);
        eliminarStorage();
    }

}

function leerDatosCurso(curso){

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        Precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad:1
    }

    if(articulosCarrito.some(curso =>curso.id === infoCurso.id)){
        const cursos = articulosCarrito.map(curso =>{
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        })

        articulosCarrito = [...cursos];

    }else{

        articulosCarrito = [...articulosCarrito,infoCurso];

    }
    //console.log(articulosCarrito);
    carritoHtml();    
}

function carritoHtml(){

    vaciarCarrito();
 
    articulosCarrito.forEach(cursos =>{
        const row =document.createElement('tr');
        row.innerHTML =`
        <td>
        <img src="${cursos.imagen}" width=100>
        </td>
        <td>${cursos.titulo}</td>
        <td>${cursos.Precio}</td>
        <td>${cursos.cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${cursos.id}">X</a>
        </td>
        `
        ContenedorCarrito.appendChild(row);
    })
    sincronizarStore();
}


//agreagar los articulos al carrito con localStoarege
function sincronizarStore(){
    localStorage.setItem('articulosCarrito', JSON.stringify(articulosCarrito));   
}

function eliminarStorage(){
    localStorage.removeItem('articulosCarrito', JSON.stringify(articulosCarrito));
}
