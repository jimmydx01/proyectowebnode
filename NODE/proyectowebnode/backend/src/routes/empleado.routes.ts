// importar router
import { Router } from "express";
// importacion de controladores(funciones) de cargo
import {getEmpleados, createEmpleado, getEmpleado, deleteEmpleado, updateEmpleado,} from "../controllers/empleado.controller";
// instanciar router - ruteador
const router = Router();
// rutas de cargos con "/"
router.route("/")
    .get(getEmpleados)
    .post(createEmpleado);

// rutas de cargos con un id "/:cargoId"
router.route("/:empleadoId")
      .get(getEmpleado)
      .delete(deleteEmpleado)
      .put(updateEmpleado);



      
export default router;
