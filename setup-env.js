const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');

// Check if .env file exists
if (!fs.existsSync(envPath)) {
  const envContent = `# Server Configuration
NODE_ENV=production
PORT=10000

# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-key

# JWT Configuration
JWT_SECRET=your-jwt-secret

# CORS Allowed Origins (comma-separated)
ALLOWED_ORIGINS=https://clktech.vercel.app,https://www.clktech.vercel.app,https://clktech-backend.onrender.com

# Admin Credentials
ADMIN_EMAIL=admin@clktech.com
ADMIN_PASSWORD=admin123

# API Configuration
API_BASE_URL=https://clktech-backend.onrender.com
`;

  fs.writeFileSync(envPath, envContent);
  console.log('.env file created. Please update the values with your actual configuration.');
} else {
  console.log('.env file already exists.');
}

// Create client .env file if it doesn't exist
const clientEnvPath = path.join(__dirname, 'client', '.env');
if (!fs.existsSync(clientEnvPath)) {
  const clientEnvContent = `# Frontend Configuration
VITE_API_URL=https://clktech-backend.onrender.com
VITE_NODE_ENV=production

# Auth Configuration
VITE_ADMIN_EMAIL=admin@clktech.com
`;

  // Ensure client directory exists
  if (!fs.existsSync(path.dirname(clientEnvPath))) {
    fs.mkdirSync(path.dirname(clientEnvPath), { recursive: true });
  }
  
  fs.writeFileSync(clientEnvPath, clientEnvContent);
  console.log('client/.env file created. Please update the values with your actual configuration.');
} else {
  console.log('client/.env file already exists.');
}
