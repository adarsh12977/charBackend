const userModel = require('../models/userModel')

const loginController = async (req,res) => {
    try {
        const {email,password} = req.body
        const user = await userModel.findOne({email,password})
        if(!user){
            return res.status(404).send('User not found')
        }
        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            user
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: 'Error in login callback',
            error
        })
    }
}

const registerController = async (req,res) => {
    try {
        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            newUser
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: 'Error in register callback',
            error
        })
    }
}

module.exports = {loginController, registerController}