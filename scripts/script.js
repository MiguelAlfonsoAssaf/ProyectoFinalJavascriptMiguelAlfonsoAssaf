let lista_productos = [
    { nombre: "mocasin", precio: 10 },
    { nombre: "mocasinbm", precio: 10 },
    { nombre: "oxfords", precio: 10 },
    { nombre: "botasbm", precio: 10 },
    { nombre: "botasnegras", precio: 10 },
    { nombre: "botastexanas", precio: 10 }
]



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
    agregoCantidad(num){
        this.cantidad=this.cantidad+num;
    }
    agregoUno(){
        this.cantidad=this.cantidad+1;
    }
}

//array de productos:
let carrito=[];



//agrego eventos a los botones con la clase button-62
let botas=document.getElementsByClassName("button-62");
for (const bota of botas) {
    bota.addEventListener("click",agregoCarrito);
}
// Funcion que dispara el evento:
//chequeo si existe el zapato en la factura, si existe => sumo 1 a la cantidad.
//                                        si no existe => agrego un objeto al carrito.

function agregoCarrito(event){
    if(carrito.some((elem)=>elem.nombre==event.target.value)){
        const indiceCarrito= (elem) => elem.nombre==event.target.value;
        let indice = carrito.findIndex(indiceCarrito);
        carrito[indice].agregoUno();
        agregoCarritoRepetido(carrito[indice]);

    } else {
        let elemento = lista_productos.find((elem) => elem.nombre == event.target.value);
        let nuevoproducto=new producto(elemento.nombre,elemento.precio,1);
        agregoCarritoHTML(nuevoproducto);
        carrito.push(nuevoproducto);
    }
    console.log(carrito);
}


// funcion que agrega un nodo "p" a la seccion item_compras
function agregoCarritoHTML(producto){
let divitems=document.getElementById("items_compra");
let item=document.createElement("p");
item.innerText=producto.nombre + "\t" + " x " + producto.cantidad + "\t .Precio Unidad:" + producto.precio;
item.setAttribute("id",producto.nombre)
divitems.appendChild(item);
}

// si existe el nodo dentro de item_compras se actualiza el innertext para agregar la cantidad.
function agregoCarritoRepetido(producto){
    let itemrepetido=document.getElementById(producto.nombre);
    itemrepetido.innerText=producto.nombre + "\t" + " x " + producto.cantidad + "\t .Precio Unidad:" + producto.precio;
}