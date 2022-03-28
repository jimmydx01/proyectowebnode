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
exports.updateDepartamento = exports.deleteDepartamento = exports.getDepartamento = exports.createDepartamento = exports.getDepartamentos = void 0;
const database_1 = require("../bd/database");
// instanciar la clase coneccion
const conection = new database_1.Coneccion();
// controlador de getcargos (funcion o logica de la peticion)
function getDepartamentos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield conection.getConneccion();
            const departamentos = yield conn.query("SELECT * FROM departamento");
            return res.json(departamentos[0]);
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.getDepartamentos = getDepartamentos;
;
// creacion de un cargo
function createDepartamento(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const modDepartamento = req.body;
            console.log(modDepartamento);
            const conn = yield conection.getConneccion();
            const departamentos = yield conn.query("INSERT INTO departamento SET ?", [modDepartamento]);
            res.json({ msg: "Cargo insertado Satisfactoriamente", departamento: modDepartamento });
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.createDepartamento = createDepartamento;
// obtener un cargo mediante su id
function getDepartamento(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.departamentoId;
        const conn = yield conection.getConneccion();
        const departamento = yield conn.query("SELECT * FROM departamento WHERE id = ?", [id]);
        //console.log(req.params.cargoId,id);
        //res.json(req.params);
        res.json(departamento[0]);
    });
}
exports.getDepartamento = getDepartamento;
// eliminar un cargo mediante su id
function deleteDepartamento(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.departamentoId;
        console.log(req.params);
        const conn = yield conection.getConneccion();
        yield conn.query("DELETE FROM departamento WHERE id = ?", [id]);
        res.json({
            message: "departamento eliminado",
            id,
        });
    });
}
exports.deleteDepartamento = deleteDepartamento;
// actualizar o modificar o editar un cargo mediante su id
function updateDepartamento(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.departamentoId;
        const modDepartamento = req.body;
        const conn = yield conection.getConneccion();
        yield conn.query("UPDATE departamento set ? WHERE id = ?", [modDepartamento, id]);
        res.json({
            message: "Departamento actualizado",
            modDepartamento,
        });
    });
}
exports.updateDepartamento = updateDepartamento;
