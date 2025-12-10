import express, { Router } from "express";
import { CheckUserLoggedIn } from "../middleware/Auth.js";
import { PlaceOrder } from "../controllers/OrderController.js";

const router:Router = Router();

router.post("/place-order",PlaceOrder)






export {router as OrderRouter}