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
}



let botas=document.getElementsByClassName("button-62");


for (const bota of botas) {
    bota.addEventListener("click",agregoCarrito);
}

function agregoCarrito(){
    console.log("se agrego al carrito");
}