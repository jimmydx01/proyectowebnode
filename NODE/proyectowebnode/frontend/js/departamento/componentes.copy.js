export class Departamento {
  // se ejecuta al instanciar la clea y crea los atributos con this
  constructor() {
    // this.cargos = [
    //   { id: 1, descripcion: "Analista", estado: 1 },
    //   { id: 2, descripcion: "Ingeniero", estado: 0 },
    //   { id: 3, descripcion: "Consultor", estado: 1 },

    // ];
    this.departamentos = JSON.parse(localStorage.getItem("departamentos"));
    if (this.departamentos === null) this.departamentos = [];
    this.id = "";
    this.grabar = true;
  }

  obtenerDepartamentos() {
    console.log(this.departamentos);
    let filas = "";
    this.departamentos.forEach((departamento) => {
      // destructuring: descomponer un objeto en sus atributos
      let { id, descripcion, estado } = departamento;
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
    document.getElementById("detalle-departamentos").innerHTML = filas;
    // eliminar
    const btnsDelete = document.querySelectorAll(".btn-delete");
    console.log(btnsDelete);
    btnsDelete.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        console.log( btn.dataset.id,e.target.dataset.id);
        console.log("elimnando...");
        this.eliminarDepartamento(e.target.dataset.id);
      });
    });
    // editar
    const $btnsEdit = document.querySelectorAll(".btn-edit");
    $btnsEdit.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        console.log(e.target.dataset.id);
        this.id = e.target.dataset.id;
        let { descripcion, estado } = this.obtenerDepartamento(this.id);
        document.getElementById("descripcion").value = descripcion;
        document.getElementById("activo").checked = estado;
        document.getElementById("enviar").innerHTML = "Actualizar";
        this.grabar = false;
      });
    });
  }

  obtenerDepartamento(id) {
    const dato = this.departamentos.find((departamento) => departamento.id == id);
    console.log(dato);
    return dato;
  }

  eliminarDepartamento(id) {
    this.departamentos = this.departamentos.filter((departamento) => departamento.id != id);
    localStorage.setItem("departamentos", JSON.stringify(this.departamentos));
    this.obtenerDepartamentos();
  }
  // insertar un nuevo cargo
  insertarDatos(departamento) {
    this.departamentos = [...this.departamentos, departamento];
    localStorage.setItem("departamentos", JSON.stringify(this.departamentos));
    this.obtenerDepartamentos();
    return true;
  }

  modificarDatos(departamentoMod, id) {
    try {
      this.departamentos = this.departamentos.map((departamento) => {
        if (departamento.id == id) 
            return departamentoMod;
        else
             return departamento
      });
      localStorage.setItem("departamentos", JSON.stringify(this.departamentos));
      this.obtenerDepartamentos();
      document.getElementById("enviar").innerHTML = "Insertar";
      this.grabar = true;
      
    } catch (error) {
      console.log("error: ", error);
    }
  }

  // fin de la clase cargo
}
