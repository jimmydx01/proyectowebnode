import { Empleado } from "./componente.js"
// instanciamos cargo
const serEmpleado = new Empleado();
const d = document;
const $formEmpleado = d.getElementById("form-empleado");

d.addEventListener("DOMContentLoaded",serEmpleado.obtenerEmpleados());
// delegacion de eventos
d.addEventListener("click", async (e) => {
  console.log(e.target);
  if (e.target.matches("#enviar")) {
    //alert("has hecho click")
    e.preventDefault();
    let $descrip = d.getElementById("descripcion").value;
    let $estado = d.getElementById("activo").checked;
    if ($descrip.trim().length < 3) {
      alert("Datos vacios o incompletos");
    } else {
      if (serEmpleado.grabar) {
        let id = Date.now();
        const empleado = { descripcion: $descrip, estado: $estado };
        const empleadoJson = JSON.stringify(empleado);
        const res = await serEmpleado.insertarDatos(empleadoJson);
      } else {
        let id = serEmpleado.id;
        const empleado = { descripcion: $descrip, estado: $estado };
        const empleadoModJson = JSON.stringify(empleado);
        const res = await serEmpleado.modificarDatos(empleadoModJson, serEmpleado.id);
      }
      $formEmpleado.reset();
    }
  }
});
