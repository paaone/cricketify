# Cricketify

Simple starter scaffold for the Local Cricket Club app. The project is split
into a minimal Express backend and a Vite powered React frontend.

## Getting Started

1. Install dependencies for both frontend and backend (requires Node.js):

   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. Start the backend server:

   ```bash
   cd backend && npm start
   ```

3. In a separate terminal start the frontend:

   ```bash
   cd frontend && npm run start
   ```

The frontend will run on <http://localhost:5173> and proxy API requests to the
backend on port `3001`.

### SSO Authentication

The backend relies entirely on Google and Facebook OAuth for authentication and
initial user profile creation. Create a `.env` file in the `backend` directory
with the following variables:

```bash
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret
```

You can obtain these from the Google Developer Console and Facebook Developer
portal.

### Windows Convenience Script

For Windows users running Git Bash or WSL, a helper script `run_windows.sh` is
provided in the project root. It installs dependencies and starts both the
backend and frontend:

```bash
./run_windows.sh
```
