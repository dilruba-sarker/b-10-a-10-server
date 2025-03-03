// require('dotenv').config() // Load environment variables from .env file
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const express = require('express')
// const cors = require('cors')

// const app = express()
// const port = process.env.PORT || 3000 // Use PORT from .env or default to 3000

// app.use(cors()) 
// app.use(express.json()) 

// app.get('/', (req, res) => {
//   res.send('Hello World banglaseh!')
// })

// // Qo3RYUUCq8a11YoT
// // B-10-A-10
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.SECRET_KEY}@cluster0.frjb7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// const client = new MongoClient(uri, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     }
//   });
//   async function run() {
//     try {
//       const campaignCollection = client.db("campaignDB").collection('floodCampaign');
//      const donationsCollection = client.db("campaignDB").collection("donations")
//       await client.connect();
//       // Send a ping to confirm a successful connection
//       app.post("/addCampaign",async(req,res)=>{
//         const campaign=req.body;
       
//         const result=await campaignCollection.insertOne(campaign)
//         res.send(result)
//       })
//       // get limited data
//       app.get("/campaignslimit", async (req, res) => {
//         try {
//           const campaigns = await campaignCollection.find().limit(6).toArray();

//           res.send(campaigns);
//         } catch (error) {
        
//           res.status(500).send({ message: "Internal Server Error" });
//         }
//       });
//       // get all data
//       app.get("/campaigns",async(req,res)=>{
//         try{const result=await campaignCollection.find().toArray()
         
//           res.send(result)}catch(error){
         
//             res.status(500).send({ message: "Internal Server Error" });
//           }
//       }),
//       // get single data
//       app.get("/campaign/:id",async(req,res)=>{
//         const id=req.params.id;
//         const query=({_id:new ObjectId(id)});
//         const result=await campaignCollection.findOne(query)
//         res.send(result)
//       })
      
// // get single data to update:
// // updateCampaign/:id
// app.put("/updateCampaign/:id",async(req,res)=>{
//   const id=req.params.id;
//   const filter={_id:new ObjectId(id)}
//   const options={upsert:true}
//   const updateCampaign=req.body;
//   const campaign={
//     $set:{
//       title:updateCampaign.title,
//          description:updateCampaign.description  , 
//           amount:updateCampaign.amount,
//          type:updateCampaign.type,
//          photo:updateCampaign.photo,
//          deadline:updateCampaign.deadline  ,  }
//   }
//   const result=await campaignCollection.updateOne(filter,campaign,options)
//   console.log(result,"update");
//   res.send(result)
// })
//       // get data of myCampaign

//       app.get("/myCampaign", async (req, res) => {
//         const userEmail = req.query.email; // Get the user's email from the query parameter
//         if (!userEmail) {
//           return res.status(400).send("User email is required");
//         }
      
//         const query = { userEmail }; // Filter by userEmail
//         const cursor = campaignCollection.find(query);
//         const result = await cursor.toArray();
//         // console.log(result);
//         res.send(result);
//       });
//       // delete my cam
//       app.delete("/myCampaign/:id",async(req,res)=>{
//         const id=req.params.id;
//         const query=({_id:new ObjectId(id)});
//         const result=await campaignCollection.deleteOne(query)
//         console.log("deleted",result);
//         res.send(result)
//       })
//       // post donation data
//       app.post("/donate", async (req, res) => {
//   try {
//     const donationData = req.body;
    

//     const result = await donationsCollection.insertOne(donationData);
//     res.send(result);
//   } catch (error) {
  
//     res.status(500).send({ message: "Internal Server Error" });
//   }
// });
// // get all donated data
// app.get("/donate",async(req,res)=>{
//   const result =await  donationsCollection.find().toArray()
//   console.log(result);
//   res.send(result);
// })
//       await client.db("admin").command({ ping: 1 });
//       console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//       // Ensures that the client will close when you finish/error
//     //   await client.close();
//     }
//   }
//   run().catch(console.dir);



// app.listen(port, () => {
//   console.log(`Server running on port ${port}`)
// })
require('dotenv').config(); // Load environment variables
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World, Bangladesh!');
});

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
    await client.connect(); // Ensure connection is made once
    console.log("Connected to MongoDB!");

    const campaignCollection = client.db("campaignDB").collection("floodCampaign");
    const donationsCollection = client.db("campaignDB").collection("donations");

    // Add new campaign
    app.post("/addCampaign", async (req, res) => {
      try {
        const campaign = req.body;
        const result = await campaignCollection.insertOne(campaign);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Error adding campaign" });
      }
    });

    // Get limited campaigns (6 items)
    app.get("/campaignslimit", async (req, res) => {
      try {
        const campaigns = await campaignCollection.find().limit(6).toArray();
        res.send(campaigns);
      } catch (error) {
        res.status(500).send({ message: "Error fetching campaigns" });
      }
    });

    // Get all campaigns
    app.get("/campaigns", async (req, res) => {
      try {
        const result = await campaignCollection.find().toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Error fetching campaigns" });
      }
    });

    // Get single campaign by ID
    app.get("/campaign/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await campaignCollection.findOne(query);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Invalid ID or error fetching campaign" });
      }
    });

    // Update campaign by ID
    app.put("/updateCampaign/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updateCampaign = req.body;
        const campaign = {
          $set: {
            title: updateCampaign.title,
            description: updateCampaign.description,
            amount: updateCampaign.amount,
            type: updateCampaign.type,
            photo: updateCampaign.photo,
            deadline: updateCampaign.deadline,
          }
        };
        const result = await campaignCollection.updateOne(filter, campaign);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Error updating campaign" });
      }
    });

    // Get campaigns for a specific user
    app.get("/myCampaign", async (req, res) => {
      try {
        const userEmail = req.query.email;
        if (!userEmail) {
          return res.status(400).send({ message: "User email is required" });
        }
        const query = { userEmail };
        const result = await campaignCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Error fetching user campaigns" });
      }
    });

    // Delete a campaign by ID
    app.delete("/myCampaign/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await campaignCollection.deleteOne(query);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Error deleting campaign" });
      }
    });

    // Donate (add donation data)
    app.post("/donate", async (req, res) => {
      try {
        const donationData = req.body;
        const result = await donationsCollection.insertOne(donationData);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Error adding donation" });
      }
    });

    // Get all donation data
    app.get("/donate", async (req, res) => {
      try {
        const result = await donationsCollection.find().toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Error fetching donations" });
      }
    });

  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
