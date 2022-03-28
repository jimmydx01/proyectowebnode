"use strict";
// import express,{Request,Response,Application} from "express"
// //import {connect} from './database'
// import morgan from 'morgan'
// import routerCargo from "./routes/cargo.routes";
// // se crea el servidor
// const app:Application = express();
// //middleware: funciones que se ejecutan como un hilo
// //Morgan es un Middleware de nivel de solicitud HTTP(muestra informacion de los request)
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
// app.use(morgan("dev"))
// app.use(express.json());
// // rutas del servidor
// app.get("/",(req,res)=>{
//   res.send("Bienvenidos a mi app")
// })
// app.use("/cargo",routerCargo);
// // ejecutar el servidor
// app.listen(3000,() => {
//     console.log("Servidor ejecutando en el puerto 3000");
// })
const servidor_1 = require("./componentes/servidor");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = new servidor_1.App();
    yield app.listen();
});
main();
