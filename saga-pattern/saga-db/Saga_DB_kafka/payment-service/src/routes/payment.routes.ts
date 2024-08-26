import app from "../../app"
import controller from "../controller/payment.controller"
import express from "express"

const router = express.Router()

router.post("/executepayment", controller.executePayment)

export default router