import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// Setup __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection (connect to your MongoDB database)
const connectDB = async () => {
  try {
    // In a production environment, you would use an environment variable for the connection string
    // mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connection would be established here.');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Define routes
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, company, message } = req.body;
    
    // In a production environment, you would save this to the database
    // and perhaps send an email notification
    
    console.log('Contact form submission:', { name, email, phone, company, message });
    
    // Simulate a delay to represent processing time
    await new Promise(resolve => setTimeout(resolve, 500));
    
    res.status(200).json({ success: true, message: 'Thank you for your interest! We will contact you soon.' });
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// Start the server
const startServer = async () => {
  // await connectDB(); // Uncomment to connect to MongoDB in production
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();