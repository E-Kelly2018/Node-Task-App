const express = require('express')
const User = require('../models/User')
const router = new express.Router()


router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch(e) {
        res.status(400).send(e)
    }
})


router.get('/users', async (req, res) => {

    try{
        let users = await User.find({})
            res.send(users)
    } catch(error) {
        res.status(500).send()
    }
})

router.get('/users/:id', async (req, res) => {
    let _id = req.params.id
    try {
     let user = User.findById(_id)
        if (!user){
         return res.status(404).send()
        }
        res.send(user)
    }catch(error) {
        res.status(500).send()
    }
})

router.patch('/users/:id', async (req, res) => {
    let updates = Object.keys(req.body)
    let allowedUpdatesArray = ['name', 'email', 'password', 'age']

    let isValid = updates.every((item) => allowedUpdatesArray.includes(item))

    if (!isValid) {
        return res.status(400).send('Error: Invalid updates')
    }

    try {
        let id = req.params.id
        let user = await User.findByIdAndUpdate(id, req.body, 
            {new: true, runValidators: true})
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)    
    } catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/users/:id', async (req, res) => {
    let id = req.params.id

    try {
        let user = await User.findByIdAndDelete(id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch(e) {
        res.status(500).send()
    }
})


module.exports = router
