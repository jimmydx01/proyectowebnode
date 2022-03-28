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
exports.updateEmpleado = exports.deleteEmpleado = exports.getEmpleados = exports.createEmpleado = exports.getEmpleado = void 0;
const database_1 = require("../bd/database");
// instanciar la clase coneccion
const conection = new database_1.Coneccion();
// controlador de getcargos (funcion o logica de la peticion)
function getEmpleado(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield conection.getConneccion();
            const empleado = yield conn.query("SELECT * FROM empleado");
            return res.json(empleado[0]);
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.getEmpleado = getEmpleado;
// creacion de un cargo
function createEmpleado(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mod_empleado = req.body;
            console.log(mod_empleado);
            const conn = yield conection.getConneccion();
            const cargos = yield conn.query("INSERT INTO empleado SET ?", [
                mod_empleado,
            ]);
            res.json({ msg: "Cargo insertado Satisfactoriamente", cargo: mod_empleado });
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.createEmpleado = createEmpleado;
// obtener un cargo mediante su id
function getEmpleados(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.empleadoId;
        const conn = yield conection.getConneccion();
        const empleado = yield conn.query("SELECT * FROM empelado WHERE id = ?", [id]);
        //console.log(req.params.cargoId,id);
        //res.json(req.params);
        res.json(empleado[0]);
    });
}
exports.getEmpleados = getEmpleados;
// eliminar un cargo mediante su id
function deleteEmpleado(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.empleadoId;
        console.log(req.params);
        const conn = yield conection.getConneccion();
        yield conn.query("DELETE FROM empleado WHERE id = ?", [id]);
        res.json({
            message: "cargo eliminado",
            id,
        });
    });
}
exports.deleteEmpleado = deleteEmpleado;
// actualizar o modificar o editar un cargo mediante su id
function updateEmpleado(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.empleadoId;
        const mod_empleado = req.body;
        const conn = yield conection.getConneccion();
        yield conn.query("UPDATE empleado set ? WHERE id = ?", [mod_empleado, id]);
        res.json({
            message: "Cargo actualizado",
            mod_empleado,
        });
    });
}
exports.updateEmpleado = updateEmpleado;
