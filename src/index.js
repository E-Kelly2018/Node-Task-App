const express = require('express')
const app = express()
const port = process.env.PORT || 3000
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

const jwt = require('jsonwebtoken')
const myFunction = async () => {
  const authToken = jwt.sign({_id: 'abc123'}, 'thisismynewcourse')
  console.log(`Tokjen: ${authToken}`)

  const data = jwt.verify(authToken, 'thisismynewcourse')
  console.log(data)
}

myFunction()