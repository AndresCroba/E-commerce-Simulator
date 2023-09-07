let listaCompras = [];

//-------------ACTUALIZA LOS TOTALES ----------------------//
const actualizarCarrito = (listaCompras)=>{
    const totalCantidad = listaCompras.reduce((acc, item) => acc + item.cantidad,0)
    const totalCompra = listaCompras.reduce((acc,item) => acc +(item.precio* item.cantidad), 0);

    pintarTotal (totalCantidad,totalCompra);
}
 const pintarTotal=(totalCantidad,totalCompra)=>{
    const total = document.getElementById('precio-total');
    total.innerText = `El total es de $` +totalCompra;
 }
 //------------------ FUNCION QUE VALIDA QUE EL PRODUCTO NO ESTE REPETIDO-----------------//

const validarProductoCarrito = (elId)=>{
    if (localStorage.getItem("carrito")) {
        listaCompras = obtenerCarritoStorage();
    };

    const productoRepetido  = listaCompras.find(productos => productos.id === elId);
        if(productoRepetido){
            productoRepetido.cantidad++;
            const cantidadProducto = document.getElementById(`cantidad${productoRepetido.id}`);
            cantidadProducto.innerHTML= `Cantidad: ${productoRepetido.cantidad}`
            actualizarCarrito(listaCompras);
        }else{
            agregarAlCarrito(elId);
        }
        guardarListaCompraStorage(listaCompras);
}

//------- ESTA FUNCION AGREGAR LOS PRODUCTOS AL CARRITO -----//
//pushea los objetos al array

const agregarAlCarrito = (elId)=>{
    const producto = productos.find(producto => producto.id === elId);
    listaCompras.push(producto);
    mostrarCarrito(listaCompras);
    actualizarCarrito(listaCompras);
}
//----------- ESTA FUNCION RENDERIIZA LOS PRODUCTOS COMPRADOS----//
// muestra un div que contiene el precio , la cantidad los totales de compra
// tambien contiene los botones de cancelar compra y de comprar

const mostrarCarrito = (listaCompras)=>{
    const contenedor = document.getElementById('carritoContenedor');
    contenedor.innerHTML= '';
    listaCompras.forEach(producto => {
        const div = document.createElement('div')
        div.classList.add('productoEnCarrito');
        div.innerHTML =  `<p>${producto.nombre}</p>
                          <p>Precio: ${producto.precio}</p>
                          <p id =cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
                          <button id=eliminar${producto.id} class='btn waves-effect waves-light boton-eliminar' value ='${producto.id}'>X</button>
                          `;
            contenedor.appendChild(div);
        
    });
}
// funciones que utilizo para la funcion de comprar
//esta funcion hace que el array se vacie y te lleva a la pantalla de finalizacion de compra

const compraValida=()=>{
    listaCompras =[];
    localStorage.clear();
    window.location.href='pantallaDeCompra.html';
}

//esta funcion si es invalida la compra osea si no hay ningun objetos en el array
//muestra un alert diciendo que la compra es invalida porque el carrito esta vacio

const compraInvalida=()=>{
    Swal.fire({
        icon: 'warning',
        titleText:'Su carrito esta vacio',
        timer:1500,
        showConfirmButton: false,
    });
}
//Listener de boton de comprar
const botonComprar = document.getElementById('botonComprar')

botonComprar.addEventListener('click',( event)=>{
    event.preventDefault();
    listaCompras.length == 0 ? compraInvalida() : compraValida();
})

// Eliminar lista de compras
//boton de cancelar compra

const botonEliminar = document.getElementById('deleteCompra');

botonEliminar.addEventListener('click',(event)=>{
    event.preventDefault();
    Swal.fire({
        icon:'error',
        titleText:'Su compra ha sido cancelada',
        timer:1500,
        showConfirmButton:false,
    })
    listaCompras =[];
    localStorage.clear();
    document.location.reload();
})


// ELIMINAR PRODUCTO DEL CARRITO
//funcion que elimina el producto por su id

 const eliminarProductoCarrito = (elId) => {
    
    const carritoStorage = obtenerCarritoStorage();
    const carritoActualizado = carritoStorage.filter(producto => producto.id !== Number(elId));
    listaCompras = carritoActualizado;
    
    guardarListaCompraStorage(listaCompras);
    actualizarCarrito(listaCompras);
    mostrarCarrito(listaCompras);
 }


 // LISTENER PARA ELIMINAR UN PRODUCTO DEL CARRITO
// funcion que tambien muestra el alert de que el producto ha sido eliminado

const eliminarProducto = document.getElementById('carritoContenedor')

eliminarProducto.addEventListener('click',(event)=>{
    event.stopPropagation();
    event.preventDefault();
   if (event.target.classList.contains('boton-eliminar')){
    eliminarProductoCarrito(event.target.value);
    Toastify({

        text: "El producto ha sido eliminado del carrito",
        
        duration: 3000
        
        }).showToast();
   }
});

//------------------------------------------LOCAL STORAGE---------------------------//

//Aca se guarda en el localStorage
const guardarListaCompraStorage = (listaCompras)=>{
    localStorage.setItem('carrito', JSON.stringify(listaCompras));
}
//Esta funcion obtiene el array
const obtenerCarritoStorage = ()=>{
    const listaCompraStorage = JSON.parse(localStorage.getItem('carrito'));
    return listaCompraStorage;
}

// esta lo muestra en el dom 
document.addEventListener('DOMContentLoaded', () => {

    if (localStorage.getItem("carrito")) {
        listaCompras = obtenerCarritoStorage();
        mostrarCarrito(listaCompras);
        actualizarCarrito(listaCompras);
    };
});