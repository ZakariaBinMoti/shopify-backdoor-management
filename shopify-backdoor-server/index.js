const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');  // Import the CORS package
require('dotenv').config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_super_secret_key";
const app = express();
app.use(express.json());
const { ObjectId } = require('mongodb');
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.11yq6.mongodb.net/backdoorDB?retryWrites=true&w=majority&ssl=true`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let websitesCollection;

async function run() {
  try {
    // Connect to MongoDB cluster
    // await client.connect();
    // console.log("Connected to MongoDB!");

    // Set up the collection
    websitesCollection = client.db("backdoorDB").collection("website");
    usersCollection = client.db("backdoorDB").collection("users");

    // Ping the database to confirm the connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Run the function to connect to MongoDB
run().catch(console.dir);

// Define your routes

// Example route to fetch websites from MongoDB
// app.get('/websites', async (req, res) => {
//   try {
//     const result = await websitesCollection.find().toArray();
//     res.send(result);
//   } catch (error) {
//     console.error('Error fetching websites:', error);
//     res.status(500).send('Failed to fetch websites.');
//   }
// });




app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: "Missing fields" });

  const existingUser = await usersCollection.findOne({ email });
  if (existingUser) return res.status(409).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { email, password: hashedPassword };

  await usersCollection.insertOne(newUser);

  res.status(201).json({ message: "User registered successfully" });
});

// User Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await usersCollection.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

  res.json({ token, message: "Login Successful" });
});

// Protected Route Example
app.get("/me", verifyToken, async (req, res) => {
  const user = await usersCollection.findOne({ _id: new ObjectId(req.user.userId) }, { projection: { password: 0 } });
  res.json(user);
});

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(403).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}





app.get('/shopify/:shopify', async (req, res) => {
  try {
    const { shopify } = req.params;

    // Query to find the document with a specific shopify value
    const query = { shopify: shopify };

    // Use projection to get only the "shopify" and "theme" fields
    const result = await websitesCollection.findOne(query, {
      projection: { theme: 1, _id: 0 }
    });

    const updatedResult = {
      ...result,
      themedata: `<div style="height: 100svh; display:flex; justify-content:center; align-items:center; background: white; color:black;">The theme can't be published</div>`
    };

    if (updatedResult) {
      res.send(updatedResult);
    } else {
      res.status(404).send('Website not found');
    }
  } catch (error) {
    console.error('Error fetching website:', error);
    res.status(500).send('Failed to fetch website.');
  }
});



// app.get('/websites', async (req, res) => {
//   try {
//     const result = await websitesCollection.find().toArray();
//     res.send(result);
//   } catch (error) {
//     console.error('Error fetching websites:', error);
//     res.status(500).send('Failed to fetch websites.');
//   }
// });

app.get('/websites', async (req, res) => {
  const { email } = req.query;
  try {
    if (!email) return res.status(400).json({ message: "Email required" });
    if(email=="admin"){
      const result = await websitesCollection.find().toArray();
      return res.send(result);
    }
    const result = await websitesCollection.find({ userEmail: email }).toArray();
    res.send(result);
  } catch (error) {
    console.error('Error fetching websites:', error);
    res.status(500).send('Failed to fetch websites.');
  }
});

// DELETE /websites/:id
app.delete('/websites/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await websitesCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Website not found' });
    }

    res.status(200).json({ message: 'Website deleted successfully' });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




app.post('/websites', async (req, res) => {
  try {
    // Extract the data from the request body
    const { projectName, clientName, developerName, shopify, status, theme, userEmail } = req.body;

    // Check if all required fields are provided
    if (!clientName || !developerName || !shopify || !status || !theme || !userEmail) {
      return res.status(400).send('All fields are required.');
    }

    // Build the new website document
    const newWebsite = {
      projectName,
      clientName,
      developerName,
      shopify,
      status,
      theme,
      userEmail,
      createdAt: new Date(), // Add a timestamp for when the document was created
    };

    // Insert the new document into the collection
    const result = await websitesCollection.insertOne(newWebsite);

    // Check if the insertion was successful
    if (result.acknowledged) {
      res.status(201).send({ message: 'Website entry created successfully', data: newWebsite });
    } else {
      res.status(500).send('Failed to create website entry.');
    }
  } catch (error) {
    // console.error('Error creating website entry:', error);
    res.status(500).send('Failed to create website entry.');
  }
});

app.post('/websites/toggle-status', async (req, res) => {
  // console.log("Request Body:", req.body); // Log the request body
  const { id } = req.body;

  if (!id) {
    return res.status(400).send('Website ID is required.');
  }

  try {
    const website = await websitesCollection.findOne({ _id: new ObjectId(id) });

    if (!website) {
      return res.status(404).send('Website not found.');
    }
      // console.log(website.theme);
      
    const newStatus = website.status === 'active' ? 'inactive' : 'active';
    const newTheme = website.theme == 'D8ywzaQPf2' ? '0DCisNIscD' : 'D8ywzaQPf2';
    // console.log(newTheme);
    
    await websitesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: newStatus , theme: newTheme} }
    );

    res.send({ message: 'Status updated successfully.', newStatus });
  } catch (error) {
    // console.error('Error updating status:', error);
    res.status(500).send('Failed to update status.'); // Return a generic error message
  }
});


// Default route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
