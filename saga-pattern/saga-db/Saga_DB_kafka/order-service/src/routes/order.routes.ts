import exp from "constants";
import app from "../../app";
import controller from "../controller/order.controller"
import express from "express"

const router = express.Router()

router.post("/createorder", controller.createOrder)

export default router