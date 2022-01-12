const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if (error) {
       return console.log('Unabble to connent to database')
    }
   
    const db = client.db(databaseName)

     //Create
    // db.collection('Users').insertOne({
    //     name: "Michael Scott",
    //     age: 42
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unabble to insert user')
    //     }

    //     console.log(result.ops)
    // })

    //Read
    // db.collection('Tasks').findOne({_id: new ObjectID("61dc6e6d54de790954a6782e")}, (error, task) => {
    //     if (error) {
    //         return console.log("unable to fetch data")
    //     }

    //     console.log(task)
    // })

    // db.collection('Tasks').find({completed: false}).toArray((error, tasks) => {
    //     if (error) {
    //         return console.log("unable to fetch data")
    //     }

    //     console.log(tasks)
    // })

    //Update
    // db.collection('Users').updateOne({
    //     _id: new ObjectID('61dc690019a2791b983e54df')
    // }, {
    //     $set: {
    //         name: "Mike"
    //     }
    // }).then((result) => {
    //     console.log("Success:", result)
    // }).catch((error) => {
    //     console.log("Error", error)
    // })

    // db.collection('Tasks').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log("Success:", result)
    // }).catch((error) => {
    //     console.log("Error", error)
    // })


    //Delete
    // db.collection('Users').deleteMany(
    //     {
    //         name: "Eoin Kelly"
    //     }).then((result) => {
    //         console.log(result)
    //     }).catch((error) => {
    //         console.log(error)
    //     })

    db.collection('Tasks').deleteOne(
        {
            description: "Get Shopping"
        }
    ).then(() => {
        console.log(result)
    }).catch(() => {
        console.log(error)
    })
})
