import express from 'express';
import bodyParser from 'body-parser';
import listEndpoints from 'express-list-endpoints';
import assetRoutes from './routes/asset.routes';
import cors from 'cors';
import sequelize from './config/database';
import errorHandler from './middlewares/errorHandler';

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// API Routes
app.use('/api', assetRoutes);

// Error Handler Middleware
app.use(errorHandler);

// Connect to the database and start the server
const PORT = process.env.PORT || 1600;

const startServer = async () => {
  try {
    // Connect to the database
    await sequelize.sync();
    console.log('Database connected!');

    // Log all registered routes
    const routes = listEndpoints(app);
    console.log('Registered Routes:', routes);

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to the database:', err);
  }
};

startServer();
