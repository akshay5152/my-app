import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import mongoose from 'mongoose';
import { connectDatabase } from './config/database.js';
import { tenantMiddleware } from './middleware/tenant.js';
import tenantRoutes from './routes/tenant.js';
import * as net from 'net';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
config();

const app = express();
const PORT = Number(process.env.PORT) || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(tenantMiddleware);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Routes
app.use('/api/tenants', tenantRoutes);

// Function to find an available port
const findAvailablePort = async (startPort: number): Promise<number> => {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(startPort, () => {
      const { port } = server.address() as net.AddressInfo;
      server.close(() => resolve(port));
    });
    server.on('error', () => {
      resolve(findAvailablePort(startPort + 1));
    });
  });
};

// Connect to database and start server
const startServer = async () => {
  try {
    const isConnected = await connectDatabase();
    if (!isConnected) {
      console.log('Starting server without database connection...');
    }

    const availablePort = await findAvailablePort(PORT);
    const server = app.listen(availablePort, () => {
      console.log(`Server is running on port ${availablePort}`);
    });

    // Handle graceful shutdown
    const shutdown = () => {
      console.log('Shutting down gracefully...');
      server.close(async () => {
        try {
          await mongoose.disconnect();
          console.log('MongoDB disconnected');
          process.exit(0);
        } catch (err) {
          console.error('Error during shutdown:', err);
          process.exit(1);
        }
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer().catch(console.error); 