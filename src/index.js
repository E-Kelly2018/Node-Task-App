const express = require('express')
const app = express()
const port = process.env.PORT || 3000
require('./db/mongoose')

const userRouter = require('./routers/users')
const taskRouter = require('./routers/tasks')


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})