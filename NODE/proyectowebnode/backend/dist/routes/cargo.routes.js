"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// importar router
const express_1 = require("express");
// importacion de controladores(funciones) de cargo
const cargo_controller_1 = require("../controllers/cargo.controller");
// instanciar router - ruteador
const router = (0, express_1.Router)();
// rutas de cargos con "/"
router.route("/")
    .get(cargo_controller_1.getCargos)
    .post(cargo_controller_1.createCargo);
// rutas de cargos con un id "/:cargoId"
router.route("/:cargoId")
    .get(cargo_controller_1.getCargo)
    .delete(cargo_controller_1.deleteCargo)
    .put(cargo_controller_1.updateCargo);
exports.default = router;
// router.route("/cargo").get( async(req, res) => {
//    const conn = await connect();
//    const cargos = await conn.query("SELECT * FROM cargo");
//    res.json(cargos[0]);
// });
