const express = require('express')
const Task = require('../models/Task')
const router = new express.Router()

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(400).send(e)
    }
})


router.get('/tasks/', async (req, res) => {
    

    try {
        let task = await Task.find({})
        res.send(task)
    }catch(error)  {
        res.status(500).send()
    }
})

router.get('/tasks/:id', async (req, res) => {
    let _id = req.params.id

    try {
        let task = await Task.findById(_id)
        if (!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(error)  {
        res.status(500).send()
    }
})



router.patch('/tasks/:id', async (req, res) => {
    let updates = Object.keys(req.body)
    let allowedUpdatesArray = ['description', 'completed']

    let isValid = updates.every((item) => allowedUpdatesArray.includes(item))

    if (!isValid) {
        return res.status(400).send('Error: Invalid updates')
    }

    try {
        let id = req.params.id
        let task = await Task.findByIdAndUpdate(id, req.body, 
            {new: true, runValidators: true})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)    
    } catch(e) {
        res.status(400).send(e)
    }
})



router.delete('/tasks/:id', async (req, res) => {
    let id = req.params.id

    try {
        let task = await Task.findByIdAndDelete(id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch(e) {
        res.status(500).send()
    }
})

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch(e) {
        res.status(400).send(e)
    }
})

module.exports = router