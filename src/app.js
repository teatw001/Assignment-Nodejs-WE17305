import mongoose from "mongoose";
import express from "express";
import productSchema from "./router/product"
const app = express();
app.use(express.json());
app.use('/api', productSchema)
mongoose.connect("mongodb://127.0.0.1:27017/ass1-nodejs")
export const viteNodeApp = app