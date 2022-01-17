const express = require('express')
const app = express()
const port = process.env.PORT
require('./db/mongoose')

const userRouter = require('./routers/users')
const taskRouter = require('./routers/tasks')

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

//
// Without middleware:  new request -> run route handle
//
// With Middleware new request -> do something -> run route handler
//

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})