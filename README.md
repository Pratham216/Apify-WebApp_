# Apify Web App Challenge

This is a React web application that integrates with Apify platform to dynamically execute actors.

## 🚀 Features

- **Dynamic Schema Loading**: Fetches actor input schemas at runtime
- **Single-Run Execution**: Executes one actor per request with immediate results
- **Modern UI**: Clean, responsive design with loading states and error handling
- **Real-time Feedback**: Shows execution progress and results

## 📁 Project Structure

```
apify-webapp/
├── src/                 # React frontend
│   ├── components/      # React components
│   ├── App.js          # Main app component
│   └── ...
├── backend/            # Node.js/Express server
│   ├── server.js       # Main server file
│   └── package.json    # Backend dependencies
└── README.md          # This file
```

## 🛠️ Setup Instructions

### Backend Setup
1. Open PowerShell/Terminal in the `backend` directory
2. Run `npm install` (if not already done)
3. Start the server: `npm start`
4. Server will run on `http://localhost:5000`

### Frontend Setup
1. Open PowerShell/Terminal in the main `apify-webapp` directory
2. Run `npm install` (if not already done)  
3. Start the React app: `npm start`
4. App will open on `http://localhost:3000`

## 🧪 Testing the Application

### Step 1: Get Your Apify API Key
1. Go to [Apify Console](https://console.apify.com/account#/integrations)
2. Copy your API key

### Step 2: Test the App
1. Open `http://localhost:3000` in your browser
2. Enter your Apify API key and click "Connect"
3. Select your "My Actor" from the list
4. You should see input fields (like `url`, `body`, `contentType`)
5. Modify the `url` field if needed (default: `https://www.apify.com/`)
6. Click "Run Actor"

### Step 3: Debug if Issues Occur
1. **Open Browser Developer Tools** (F12)
2. **Go to Console tab** to see debug messages
3. **Check Network tab** for API calls
4. **Backend logs** will show in the PowerShell window running the server

## 🔧 Troubleshooting

### Common Issues:

1. **"Failed to connect to server"**
   - Make sure backend is running on port 5000
   - Check if `http://localhost:5000/api/health` returns `{"status":"Server is running"}`

2. **"Invalid API key"**
   - Verify your Apify API key is correct
   - Make sure you have access to actors in your account

3. **"Actor run failed"**
   - Check the browser console for detailed error messages
   - Verify the input fields match what your actor expects
   - Try with a different URL (e.g., `https://example.com`)

4. **Timeout errors**
   - Some actors take longer to run
   - Current timeout is 10 minutes
   - Check your actor's status in Apify Console

### Debug Endpoints:
- Health check: `GET http://localhost:5000/api/health`
- Actor debug info: `POST http://localhost:5000/api/debug/actor/YOUR_ACTOR_ID`

## 📝 Actor Used for Testing

**Actor ID**: `pwpq1GLhqL1IL3boN`
**Actor Name**: My Actor
**Expected Input**: 
- `url`: URL of the page to process
- `body`: Request body (optional)
- `contentType`: Content type header

## 🎯 Design Choices

### Architecture
- **Frontend**: React with functional components and hooks
- **Backend**: Express.js server as API proxy to Apify
- **Communication**: RESTful API between frontend and backend

### Key Features Implemented
1. **Dynamic Schema Fetching**: Runtime retrieval of actor input schemas
2. **Error Handling**: Comprehensive error handling with user-friendly messages  
3. **Loading States**: Visual feedback during API calls and actor execution
4. **Responsive UI**: Works on desktop and mobile devices
5. **Security**: API key handled securely through backend proxy

### Technical Decisions
- Used backend proxy to hide API key from frontend
- Implemented polling mechanism for actor run status
- Added extensive logging for debugging
- Used modern React patterns (hooks, functional components)

## 🚨 **CURRENT STATUS & NEXT STEPS**

**The application is working but needs one final step:**

1. **Refresh your browser** (F5) 
2. **Open Developer Tools** (F12) and go to Console tab
3. **Try running the actor** and watch the console for debug messages
4. The actor IS working in Apify console, so any error is in our React app's response handling

**If you still see errors:**
- Check the browser console for detailed error messages  
- The backend has been updated to use `https://www.apify.com/` as default
- All error handling has been improved with better logging

## 🔗 API Endpoints

- `POST /api/verify-key` - Verify Apify API key
- `POST /api/actors` - Get user's actors  
- `POST /api/actors/:id/schema` - Get actor input schema
- `POST /api/actors/:id/run` - Execute actor
- `GET /api/health` - Server health check
- `POST /api/debug/actor/:id` - Debug actor information

---

**Built for the Apify Integration Developer Assignment**

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
