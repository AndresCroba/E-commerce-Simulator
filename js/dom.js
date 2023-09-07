
const contenedor = document.getElementById('productosContenedor');

let productos = [];

const renderProductos = ()=>{
    
    for(let el of productos){
        let productCardContainer = document.createElement('div');
        productCardContainer.classList.add('productCardContainer');
        productCardContainer.innerHTML = `
        <div class="caja">
            <img src=${el.img}>
            <h2 id="descripcion">${el.nombre}<br>
                Precio:
                ${el.precio}
            </h2>
            <button id=boton${el.id} class="btn">Agregar a Carrito</button>
           </div> 
        `
        contenedor.appendChild(productCardContainer);
        
        const boton = document.getElementById(`boton${el.id}`);
        boton.addEventListener('click',()=>{
            validarProductoCarrito(el.id);
        })
    }
}
const limpiarPantalla = ()=>{
   const productCardContainer = document.querySelectorAll('.productCardContainer');
    for(let el of productCardContainer){
        el.remove();
    }
}
const categorias = document.querySelectorAll('.CategoriaIndividual');

for(let el of categorias){
    el.addEventListener('click', (e)=>{
        limpiarPantalla();
        renderFilteredProducts(e);
        console.log('categoria')
    })
}
const renderFilteredProducts = (e)=>{
    limpiarPantalla();
    let currentCategory = e.target.getAttribute('id');
    if(currentCategory === 'todos'){
        renderProductos();
        return;
    }
    let output = productos.filter((product)=>{
        return product.categoria === currentCategory;
    });
    
    for(let el of output){
        let productCardContainer = document.createElement('div');
        productCardContainer.classList.add('productCardContainer');
        productCardContainer.innerHTML = `
        <div class="caja">
            <img src=${el.img}>
            <h2 id="descripcion">${el.nombre}<br>
                Precio:
                ${el.precio}
            </h2>
            <button id=boton${el.id} class="btn">Agregar a Carrito</button>
           </div> 
        `
        contenedor.appendChild(productCardContainer);
        const boton = document.getElementById(`boton${el.id}`);
        boton.addEventListener('click',()=>{
            validarProductoCarrito(el.id);
        })
    }

}

fetch('js/stock.json')
.then(response => response.json())
.then(data => {
    productos = [...data];
    renderProductos();
});


