//HUfLi3LHdZNMXiOE
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

require('dotenv').config()
const ObjectId = require('mongodb').ObjectId;
const { query } = require('express');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// const uri = ` mongodb+srv://databse:HUfLi3LHdZNMXiOE@cluster0.ow5x2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority  `;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ow5x2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect()
        const database = client.db('datastore')
        const dataCollection = database.collection('datalist')
        const secondCollection = database.collection('single')






        app.post('/formdata', async (req, res) => { 
            const formData = req.body;
            // console.log('hit the post api', service);

            const result = await dataCollection.insertOne(formData);
            res.send(result)
        });
        app.get('/formdata', async (req, res) => {
            const id = dataCollection.find({})
            const result = await id.toArray()
            res.send(result)
        })


        app.get('/formdata/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const user = await dataCollection.findOne(query)
            res.send(user)
        })


        app.post('/single', async (req, res) => {
            const single = req.body;   
            // console.log('hit the post api', service);

            const result = await dataCollection.insertOne(single);
            res.send(result)
        });

        app.get('/single/:id', async (req, res) => {
            const id = req.params.id
            const find = { _id: ObjectId(id) }
            const findone = await dataCollection.findOne(find)
            res.send(findone)
        })

       










        console.log('hello');

    }
    finally {
        // await client.close()
    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Running my CRUD Server');
});

app.listen(port, () => {
    console.log('Running Server on port', port);
})

