const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const users = [
    { name: "Kawsar", passion: "student", },
    { name: "Jamil", passion: "student" },
]




const uri = "mongodb+srv://simpleNodeDbUser:rXb6v5x5wtqBiS5i@cluster0.hbrvwvk.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        console.log("Database connected");
        const database = client.db("simpleNode2");
        const usersCollection = database.collection("users");

        app.get('/', async (req, res) => {

            //     const options = { ordered: true };
            //     const result = await usersCollection.insertMany(users, options);
            //    return res.send(result);
            return res.send("server running");
        })

        app.get('/users', async (req, res) => {
            const users = await usersCollection.find({}).toArray();
            console.log(users);
            return res.json(users);
        })

        app.post('/users', async (req, res) => {
            const userData = req.body;
            console.log(userData);
            const result = await usersCollection.insertOne(userData);
            console.log("inserted");
            return res.json(userData);
        })

    } finally {

    }
}

run().catch(e => console.log(e))

app.listen(
    port, () => {
        console.log(`server is running on ${port}`);
    }
)