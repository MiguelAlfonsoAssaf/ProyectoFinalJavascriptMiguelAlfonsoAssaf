// let lista_productos = [
//     { nombre: "mocasin", precio: 10 },
//     { nombre: "mocasinbm", precio: 10 },
//     { nombre: "oxfords", precio: 10 },
//     { nombre: "botasbm", precio: 10 },
//     { nombre: "botasnegras", precio: 10 },
//     { nombre: "botastexanas", precio: 10 }
// ]

let lista_productos=[];

fetch('./data/data.json')
    .then(response => response.json())
    .then(lista => {
        lista.forEach(element => lista_productos.push(element));
    });



class producto {
    constructor(nombre, precio, cantidad) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
    //aca van los metodos.
    getNombre() {
        return this.nombre;
    }
    agregoCantidad(num) {
        this.cantidad = this.cantidad + num;
    }
    agregoUno() {
        this.cantidad = this.cantidad + 1;
    }
}


//boton comprar con sweet alert
const btn_comprar = document.getElementById("boton_sweet");
btn_comprar.addEventListener('click', () => {
    Swal.fire({
        icon: 'success',
        title: 'Su compra fue realizada!!',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>'
    })

})




//array de productos:
let carrito = [];



//agrego eventos a los botones comprar con la clase button-62
let botas = document.getElementsByClassName("button-62");
for (const bota of botas) {
    bota.addEventListener("click", agregoCarrito);
}

//agrego evento al boton limpiar
let btnClear = document.getElementById("btn_borrar_todo");
btnClear.addEventListener("click", borrarCarrito);

//chequeo el contenido del localStorage: ==>si tiene datos agrego 
//                                          los nodos a la lista
let carritoRecuperado = localStorage.getItem("carrito");
let carritioTransformado = JSON.parse(carritoRecuperado);
if (carritioTransformado != null && carritioTransformado.length !== 0) {
    // carrito = carritioTransformado.slice(); ->CONSULA PARA EL CORRECTOR????????????????????????????????????????????
    // cuando vuelvo a cargar el carrito con el metodo slice (de lo que recupero del localStorage), me da un error. 
    // ese error seria porque son objetos pero no de la clase PRODUCTO?????????? ya que estoy haciendo uso del metodo "agregoUno"
    for (const ele of carritioTransformado) {
        carrito.push(new producto(ele.nombre, ele.precio, ele.cantidad));
    }
    for (const elem of carrito) {
        agregoCarritoHTML(elem);
    }
    totales();
}


// Funcion que dispara el evento:
//chequeo si existe el zapato en la factura, si existe => sumo 1 a la cantidad.
//                                        si no existe => agrego un objeto al carrito.

function agregoCarrito(event) {
    if (carrito.some((elem) => elem.nombre == event.target.value)) {
        const indiceCarrito = (elem) => elem.nombre == event.target.value;
        let indice = carrito.findIndex(indiceCarrito);
        carrito[indice].agregoUno();
        agregoCarritoRepetido(carrito[indice]);
        carritoStorage();
        totales();
    } else {
        let elemento = lista_productos.find((elem) => elem.nombre == event.target.value);
        let nuevoproducto = new producto(elemento.nombre, elemento.precio, 1);
        agregoCarritoHTML_V2(nuevoproducto);
        carrito.push(nuevoproducto);
        carritoStorage();
        totales();
    }
    console.log(carrito);
}


// funcion que agrega un nodo "p" a la seccion item_compras
function agregoCarritoHTML(producto) {
    let divitems = document.getElementById("items_compra");

    let divItemBoton = document.createElement("div");
    divItemBoton.setAttribute("class", "item_resumen_compras")

    let item = document.createElement("p");
    item.innerText = producto.nombre + "\t" + " x " + producto.cantidad + "\t .Precio Unidad:" + producto.precio;
    item.setAttribute("id", producto.nombre)

    let btnborrar = document.createElement("button");
    btnborrar.innerText = "x";
    btnborrar.setAttribute("class", "boton_borrar");
    btnborrar.setAttribute("value", producto.nombre);

    //agrego el evento al boton de borrado de linea y tambien borro el objeto del array carrito
    btnborrar.addEventListener("click", () => {
        document.getElementById(producto.nombre).parentElement.remove();
        const indiceCarrito = (elem) => elem.nombre == producto.nombre;
        let indice = carrito.findIndex(indiceCarrito);
        carrito.splice(indice, 1);
        console.log(carrito);
        carritoStorage();
    })
    divItemBoton.appendChild(item);
    divItemBoton.appendChild(btnborrar);
    divitems.appendChild(divItemBoton);

}//fin funcion agregoCarritoHTML





function agregoCarritoHTML_V2(producto){
    let divContenedor=document.getElementById("contenedor_carrito");

    let divProductoCarrito= document.createElement("div");
    divProductoCarrito.setAttribute("class","producto_carrito");
    divProductoCarrito.setAttribute("id",producto.nombre);


    let divFotoProducto=document.createElement("div");
    divFotoProducto.setAttribute("class","foto_producto_carrito");
    let fotoProducto=document.createElement("img");
    let indiceFoto = (elem) => elem.nombre == producto.nombre;
    let indice = lista_productos.findIndex(indiceFoto);
    let foto=lista_productos[indice].foto;
    fotoProducto.setAttribute("src",foto);
    divFotoProducto.appendChild(fotoProducto);
    

    let divTextoProducto=document.createElement("div");
    divTextoProducto.setAttribute("class","texto_producto_carrito");
    let tituloTextoProducto=document.createElement("h4");
    tituloTextoProducto.innerText=producto.nombre;
    let descTextoProducto=document.createElement("p");
    descTextoProducto.innerText=lista_productos[indice].descripcion_larga;
    let botonTextoProducto=document.createElement("button");
    botonTextoProducto.setAttribute("class","boton_producto_carrito");
    botonTextoProducto.setAttribute("value",producto.nombre)
    botonTextoProducto.innerText="Eliminar";
    botonTextoProducto.addEventListener("click", () =>{
        document.getElementById(producto.nombre).remove();
        const indiceCarrito = (elem) => elem.nombre == producto.nombre;
        let indice = carrito.findIndex(indiceCarrito);
        carrito.splice(indice, 1);
        console.log(carrito);
        carritoStorage();});
    divTextoProducto.appendChild(tituloTextoProducto);
    divTextoProducto.appendChild(descTextoProducto);
    divTextoProducto.appendChild(botonTextoProducto);


    let divCantidadProducto=document.createElement("div");
    divCantidadProducto.setAttribute("class","cantidad_producto_carrito");
    let divBtn_cantidad=document.createElement("div");
    divBtn_cantidad.setAttribute("class","btn_cantidad");
    let masCantidadProducto=document.createElement("button");
    masCantidadProducto.innerText="+";
    let parrafoCantidadProduto=document.createElement("p");
    parrafoCantidadProduto.setAttribute("id","parrafo_cantidad")
    parrafoCantidadProduto.innerText="1";
    let menosCantidadProducto=document.createElement("button");
    menosCantidadProducto.setAttribute("class","menos");
    menosCantidadProducto.innerText="-";
    divBtn_cantidad.appendChild(masCantidadProducto);
    divBtn_cantidad.appendChild(parrafoCantidadProduto);
    divBtn_cantidad.appendChild(menosCantidadProducto);
    let spanCantidadProducto= document.createElement("span");
    spanCantidadProducto.innerText="Disponibles " + producto.cantidad;
    divCantidadProducto.appendChild(divBtn_cantidad);
    divCantidadProducto.appendChild(spanCantidadProducto);


    let divPrecioProducto= document.createElement("div");
    divPrecioProducto.setAttribute("class","precio_producto_carrito");
    let parrafoPrecio=document.createElement("p");
    parrafoPrecio.innerText=producto.precio + " $";
    divPrecioProducto.appendChild(parrafoPrecio);


    divProductoCarrito.appendChild(divFotoProducto);
    divProductoCarrito.appendChild(divTextoProducto);
    divProductoCarrito.appendChild(divCantidadProducto);
    divProductoCarrito.appendChild(divPrecioProducto);
    divContenedor.appendChild(divProductoCarrito);

}


// si existe el nodo dentro de item_compras se actualiza el innertext para agregar la cantidad.
function agregoCarritoRepetido(producto) {
    let itemrepetido = document.getElementById(producto.nombre);
    itemrepetido.innerText = producto.nombre + "\t" + " x " + producto.cantidad + "\t .Precio Unidad:" + producto.precio;
}

// agrega al localStorage el carrito.
function carritoStorage() {
    let unCarrito = JSON.stringify(carrito);
    localStorage.setItem("carrito", unCarrito);
}

// funcion del boton que borra el carrito
function borrarCarrito() {
    localStorage.clear();
    carrito = [];
    console.log(carrito);
    let borraCarrito = document.getElementById("items_compra");
    borraCarrito.innerHTML = '';
    totales()

    Toastify({
        text: "Carrito limpio",
        duration: 3000
        }).showToast();
}

function totales() {
    if (carrito.length === 0) {
        document.getElementById("totales").innerText = '';
    } else {
        let total = 0;
        for (const elem of carrito) {
            total = total + (elem.precio * elem.cantidad);
        }
        let tot = document.getElementById("totales");
        tot.innerText = "Total sin IVA: " + total.toString() + "\n" + "IVA: " + (total * 0.21).toString() + "\n" + "TOTAL con IVA: " + (total * 1.21).toString();
    }
}



