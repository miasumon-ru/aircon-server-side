const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const port = process.env.PORT || 5000


// middleware
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.k8vw6eq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const slidesCollection = client.db('airCon').collection('sliders')

        // console.log(slidesCollection)


        app.get('/slides', async(req, res)=> {
            const result = await slidesCollection.find().toArray()
            res.send(result)
        })



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

    


app.get('/', async(req, res) => {
    res.send('aircon server is running')
})



app.listen(port, () => {
    console.log(`aircon server is running on port : ${port}`)
})