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

const bcrypt = require('bcryptjs')
const myFunction = async () => {
    let password = "Red12345!"

    let hashedPassword = await bcrypt.hash(password, 8)
    console.log(password)
    console.log(hashedPassword)

    const isMatch = await bcrypt.compare(password, hashedPassword)
    console.log(isMatch)
}

myFunction()