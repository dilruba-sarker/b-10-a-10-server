require('dotenv').config() // Load environment variables from .env file
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000 // Use PORT from .env or default to 3000

app.use(cors()) 
app.use(express.json()) 

app.get('/', (req, res) => {
  res.send('Hello World banglaseh!')
})

// Qo3RYUUCq8a11YoT
// B-10-A-10
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.SECRET_KEY}@cluster0.frjb7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {
      const campaignCollection = client.db("campaignDB").collection('floodCampaign');
     const donationsCollection = client.db("campaignDB").collection("donations")
      await client.connect();
      // Send a ping to confirm a successful connection
      app.post("/addCampaign",async(req,res)=>{
        const campaign=req.body;
        console.log("campaign from md",campaign);
        const result=await campaignCollection.insertOne(campaign)
        res.send(result)
      })
      // get limited data
      app.get("/campaignslimit", async (req, res) => {
        try {
          const campaigns = await campaignCollection.find().limit(6).toArray();
          console.log( "limit data",campaigns);
          res.send(campaigns);
        } catch (error) {
          console.error("Error fetching campaigns:", error);
          res.status(500).send({ message: "Internal Server Error" });
        }
      });
      // get all data
      app.get("/campaigns",async(req,res)=>{
        try{const result=await campaignCollection.find().toArray()
          console.log('result',result);
          res.send(result)}catch(error){
            console.error("Error fetching campaigns:", error);
            res.status(500).send({ message: "Internal Server Error" });
          }
      }),
      // get single data
      app.get("/campaign/:id",async(req,res)=>{
        const id=req.params.id;
        const query=({_id:new ObjectId(id)});
        const result=await campaignCollection.findOne(query)
        res.send(result)
      })
      // post donation data
      app.post("/donate", async (req, res) => {
  try {
    const donationData = req.body;
    
 console.log("donationData from md",donationData);
    const result = await donationsCollection.insertOne(donationData);
    res.send(result);
  } catch (error) {
    console.error("Error adding donation:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
    //   await client.close();
    }
  }
  run().catch(console.dir);



app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
