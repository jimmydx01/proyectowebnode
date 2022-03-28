export class Empleado {
  // se ejecuta al instanciar la clea y crea los atributos con this
  constructor() {
    this.id = "";
    this.grabar = true;
    this.url = "http://localhost:3000/empleados";
  }

  obtenerEmpleados() {
    fetch(this.url)
     .then((res) => res.json())
     .then((empleados) => {
       console.log(empleados);
       let filas = "";
       cargos.forEach((empleado) => {
         // destructuring: descomponer un objeto en sus atributos
         let { id, descripcion, estado } = empleado;
         filas += ` <tr>
        <td>${id}</td>
        <td>${descripcion}</td>
        <td>${estado ? "Activo" : "Inactivo"}</td>
        <td>
          <button type="button" class="btn btn-edit" id="btn-edit" data-id="${id}">✏️</button>
          <button type="button" class="btn btn-delete" id="btn-delete" data-id="${id}">❌</button>
        </td>
      </tr>
       `;
       });
       //console.log(filas);
       document.getElementById("detalle-empleados").innerHTML = filas;
       // eliminar
       const btnsDelete = document.querySelectorAll(".btn-delete");
       //console.log(btnsDelete);
       btnsDelete.forEach((btn) => {
         btn.addEventListener("click",async (e) => {
           console.log(btn.dataset.id, e.target.dataset.id);
           console.log("elimnando...");
           await this.eliminarEmpleado(e.target.dataset.id);
         });
       });
       // editar
       const $btnsEdit = document.querySelectorAll(".btn-edit");
       $btnsEdit.forEach((btn) => {
         btn.addEventListener("click",async (e) => {
           console.log(e.target.dataset.id);
           this.id = e.target.dataset.id;
           let { descripcion, estado } = await this.obtenerEmpleado(this.id);
           document.getElementById("descripcion").value = descripcion;
           document.getElementById("activo").checked = estado;
           document.getElementById("enviar").innerHTML = "Actualizar";
           this.grabar = false;
         });
       });
     })
     .catch((err) => console.log("error:=>",err))
  }

  async obtenerEmpleado(id) {
    const res = await fetch(`${this.url}/${id}`)
    const dato = await res.json();  
    console.log(dato[0]);
    return dato[0]; 
  }

  async eliminarEmpleado(id) {
    const res = await fetch(`${this.url}/${id}`, { method: "delete" });
    this.obtenerEmpleados();
  }
  // insertar un nuevo cargo
  async insertarDatos(empleado) {
    const res= await fetch(this.url, { method: "post", body: empleado });
    console.log(res);
    this.obtenerEmpleados()
    return true
  }
                    
  async modificarDatos(empleadoMod, id) {
    try{
        const res = await fetch(`${this.url}/${id}`, { method: "put",body:empleadoMod });
        this.obtenerEmpleados();
        document.getElementById("enviar").innerHTML = "Insertar";
        this.grabar = true;

    } catch (error) {
       console.log("error: ", error);
    }
  }

  // fin de la clase cargo
}