export class Empleado {
  // se ejecuta al instanciar la clea y crea los atributos con this
  constructor() {
    // this.cargos = [
    //   { id: 1, descripcion: "Analista", estado: 1 },
    //   { id: 2, descripcion: "Ingeniero", estado: 0 },
    //   { id: 3, descripcion: "Consultor", estado: 1 },

    // ];
    this.empleados = JSON.parse(localStorage.getItem("empleados"));
    if (this.empleados === null) this.empleados = [];
    this.id = "";
    this.grabar = true;
  }

  obtenerEmpleados() {
    console.log(this.empleados);
    let filas = "";
    this.cargos.forEach((empleado) => {
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
    console.log(filas);
    document.getElementById("detalle-empleados").innerHTML = filas;
    // eliminar
    const btnsDelete = document.querySelectorAll(".btn-delete");
    console.log(btnsDelete);
    btnsDelete.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        console.log(btn.dataset.id, e.target.dataset.id);
        console.log("elimnando...");
        this.eliminarCargo(e.target.dataset.id);
      });
    });
    // editar
    const $btnsEdit = document.querySelectorAll(".btn-edit");
    $btnsEdit.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        console.log(e.target.dataset.id);
        this.id = e.target.dataset.id;
        let { descripcion, estado } = this.obtenerCargo(this.id);
        document.getElementById("descripcion").value = descripcion;
        document.getElementById("activo").checked = estado;
        document.getElementById("enviar").innerHTML = "Actualizar";
        this.grabar = false;
      });
    });
  }

  obtenerEmpleado(id) {
    const dato = this.empleados.find((empleado) => empleado.id == id);
    console.log(dato);
    return dato;
  }

  eliminarEmpleado(id) {
    this.empleados = this.empleados.filter((empleado) => empleado.id != id);
    localStorage.setItem("empleados", JSON.stringify(this.empleados));
    this.obtenerEmpleados();
  }
  // insertar un nuevo cargo
  insertarDatos(empleado) {
    this.empleados = [...this.empleados, empleado];
    localStorage.setItem("empleados", JSON.stringify(this.empleados));
    this.obtenerEmpleados();
    return true;
  }

  modificarDatos(empleadoMod, id) {
    try {
      this.empleados = this.empleados.map((empleado) => {
        if (empleado.id == id) return empleadoMod;
        else return empleado;
      });
      localStorage.setItem("empleados", JSON.stringify(this.empleados));
      this.obtenerEmpleados();
      document.getElementById("enviar").innerHTML = "Insertar";
      this.grabar = true;
    } catch (error) {
      console.log("error: ", error);
    }
  }

  // fin de la clase cargo
}
