const transactionModel = require("../models/transactionModel")
const moment = require('moment')

const getAllTransactionController = async (req,res) => {
    try {
        const {timeline, selectedDate, type} = req.body
        const transactions = await transactionModel.find({
            ...(timeline !== 'custom' ? {
                date:{
                    $gt: moment().subtract(Number(timeline), 'd').toDate()
                },
            } : {
                date:{
                    $gte: selectedDate[0],
                    $lte: selectedDate[1]
                }
            }),
            userid: req.body.userid,
            ...(type!=='all' && {type})
        })
        res.status(200).json(transactions)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const addTransactionController = async (req,res) => {
    try {
        const newTransaction = new transactionModel(req.body)
        await newTransaction.save()
        res.status(201).send('Transaction created')
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const editTransactionController = async (req,res) => {
    try {
        await transactionModel.findOneAndUpdate({_id:req.body.transactionId},req.body.payload)
        res.status(200).send('Edit successful')
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const deleteTransactionController = async (req,res) => {
    try {
        await transactionModel.findOneAndDelete({_id:req.body.transactionId})
        res.status(200).send('Transaction deleted')
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports = {getAllTransactionController, addTransactionController, editTransactionController, deleteTransactionController}