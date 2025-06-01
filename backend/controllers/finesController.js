const Fines = require('../models/finesModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')

//get all finds
const getAllFines = async (req, res) => {
    try{
        const fines = await Fines.find()
        res.status(200).json(fines)
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

//get fines for specific borrow id
const getFine = async(req,res)=>{
    const {user_id} = req.params

    try{
        const fines  = await Fines.find({user_id})
        res.status(200).json(fines)
    }catch(err){
        res.status(404).json({error: err.massage})
    }
}

//POST new fines
const createFines = async(req,res) => {
    const {user_id, user_name,borrow_id, amount} = req.body
    console.log("edeede",user_id, user_name,borrow_id, amount);    
    try{
        const fines = await Fines.create({user_id, user_name, borrow_id, amount})
        res.status(200).json(fines)
    }catch(err){
        res.status(400).json({error:"Fines creation failed!"})
    }
}

//detete finds
const deleteFines = async(req,res)=>{
    const {borrow_id} = req.params

    const fines = await Fines.findOneAndDelete({borrow_id})
    
    if(!fines) res.status(404).json({error:'No such finds are listed'})
    else res.status(200).json(fines)
}

const updateFine = async (req, res) => {
    const {id} = req.params
    console.log("frfr",req.params)

    const amount = req.body.amount
    if(!amount) res.status(400).json({error: "Require a valid Amount to update the fine"})
    console.log("frfr",id,amount)
    await Fines.findOneAndUpdate({_id: id}, {amount})
        .then(result => res.status(200).json(result))
        .catch(() => res.status(400).json({error: "Failed to update the fine"}))
}

module.exports = {
    getAllFines,
    getFine,
    createFines,
    deleteFines,
    updateFine
}