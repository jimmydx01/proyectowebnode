"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// importar router
const express_1 = require("express");
// importacion de controladores(funciones) de cargo
const empleado_controller_1 = require("../controllers/empleado.controller");
// instanciar router - ruteador
const router = (0, express_1.Router)();
// rutas de cargos con "/"
router.route("/").get(empleado_controller_1.getEmpleado).post(empleado_controller_1.createEmpleado);
// rutas de cargos con un id "/:cargoId"
router.route("/:empleadoId").get(empleado_controller_1.getEmpleado).delete(empleado_controller_1.deleteEmpleado).put(empleado_controller_1.updateEmpleado);
exports.default = router;
