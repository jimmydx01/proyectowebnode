"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCargo = exports.deleteCargo = exports.getCargo = exports.createCargo = exports.getCargos = void 0;
const database_1 = require("../bd/database");
// instanciar la clase coneccion
const conection = new database_1.Coneccion();
// controlador de getcargos (funcion o logica de la peticion)
function getCargos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield conection.getConneccion();
            const cargos = yield conn.query("SELECT * FROM cargo");
            return res.json(cargos[0]);
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.getCargos = getCargos;
;
// creacion de un cargo
function createCargo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const modCargo = req.body;
            console.log(modCargo);
            const conn = yield conection.getConneccion();
            const cargos = yield conn.query("INSERT INTO cargo SET ?", [modCargo]);
            res.json({ msg: "Cargo insertado Satisfactoriamente", cargo: modCargo });
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.createCargo = createCargo;
// obtener un cargo mediante su id 
function getCargo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.cargoId;
        const conn = yield conection.getConneccion();
        const cargo = yield conn.query("SELECT * FROM cargo WHERE id = ?", [id]);
        //console.log(req.params.cargoId,id);
        //res.json(req.params);
        res.json(cargo[0]);
    });
}
exports.getCargo = getCargo;
// eliminar un cargo mediante su id
function deleteCargo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.cargoId;
        console.log(req.params);
        const conn = yield conection.getConneccion();
        yield conn.query("DELETE FROM cargo WHERE id = ?", [id]);
        res.json({
            message: "cargo eliminado",
            id,
        });
    });
}
exports.deleteCargo = deleteCargo;
// actualizar o modificar o editar un cargo mediante su id
function updateCargo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.cargoId;
        const modCargo = req.body;
        const conn = yield conection.getConneccion();
        yield conn.query("UPDATE cargo set ? WHERE id = ?", [modCargo, id]);
        res.json({
            message: "Cargo actualizado",
            modCargo,
        });
    });
}
exports.updateCargo = updateCargo;
