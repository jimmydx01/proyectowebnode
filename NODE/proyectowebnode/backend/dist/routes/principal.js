"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const principal_controller_1 = require("../controllers/principal.controller");
const router = (0, express_1.Router)();
router.route("/").get(principal_controller_1.menuPrincipal);
exports.default = router;
