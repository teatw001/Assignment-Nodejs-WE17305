import mongoose from "mongoose";
import express from "express";
import Product from "../models/product"
import joi from "joi";
const productSchema = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
})
export const create = async (req, res) => {
    try {
        const { error } = productSchema.validate(req.body)
        if (error) {
            return res.status(404).json({
                message: error.details[0].message,
                message: "Vui lòng nhập đầy đủ trường dữ liệu"
            })
        }
        const product = await Product.create(req.body)
        return res.status(201).json({
            message: "Tạo sp thành công",
            product
        })
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}
export const getAll = async (req, res) => {
    try {
        const products = await Product.find()
        return res.status(201).json(products)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}
export const get = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id })
        return res.status(201).json(product)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}
export const update = async (req, res) => {
    try {
        const { error } = productSchema.validate(req.body)
        if (error) {
            return res.status(404).json({
                message: error.details[0].message,
                message: "Vui lòng nhập đầy đủ trường dữ liệu"
            })
        }
        const product = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        return res.status(201).json({
            message: "Update sp thành công",
            product
        })
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}
export const remove = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ _id: req.params.id })
        return res.status(201).json({
            message: "Xóa sp thành công",
            product
        })
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}