const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()


router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
    
        await user.save()
        const token = await user.generateAuthToken()

        res.status(201).send({user, token})
    } catch(e) {
        res.status(400).send(e)
    }
})

router.post('/users/login',  async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch(e) {
        res.status(500).send()
    }
})

router.post('/users/logoutall', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.send()
    } catch(e) {
        res.status(500).send()
    }
})


router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
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
        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

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
