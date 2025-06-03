# 3D PLY Model Viewer

A React and FastAPI application for viewing and uploading 3D PLY models with real-time visualization.

## Features

- 📁 Upload PLY files directly from your local disk
- 🔄 Real-time model switching
- 🎮 Interactive 3D controls
- 🎨 Professional lighting setup
- 📋 Model list management
- 🌅 Environment lighting presets

## Prerequisites

- Python 3.12 or higher
- Node.js 18.x or higher
- npm 9.x or higher

## Installation

1. Clone and navigate to the project:
```bash
git clone <repository-url>
cd fastapi_pro
```

2. Install Python dependencies:
```bash
pip install fastapi uvicorn python-multipart
```

3. Install Node.js dependencies:
```bash
npm install
```

## Project Structure

```
fastapi_pro/
├── server/
│   ├── models/         # PLY model storage
│   └── main.py         # FastAPI backend
├── src/
│   ├── App.jsx
│   └── Component.jsx   # 3D viewer component
├── scripts/
│   └── dev-server.js   # Development server
└── package.json
```

## Running the Application

Start both frontend and backend:
```bash
npm run dev:all
```

Access the application:
- Frontend: http://localhost:5173
- Backend: http://localhost:8000

## Using the Application

1. **View Models**
   - Use the dropdown menu to switch between uploaded models
   - Interact with the 3D view:
     - Left click + drag: Rotate
     - Right click + drag: Pan
     - Scroll: Zoom

2. **Upload Models**
   - Click the file input button
   - Select a PLY file from your computer
   - File will automatically upload and display

3. **Controls**
   - Model selection dropdown
   - File upload button with progress indicator
   - Interactive OrbitControls
   - Grid helper for scale reference

## API Endpoints

- `GET /`: Server status
- `GET /api/models`: List available models
- `POST /api/upload`: Upload new PLY file
- `GET /models/{filename}`: Serve model files

## Development

### Backend (FastAPI)
```bash
cd server
python -m uvicorn main:app --reload
```

### Frontend (Vite)
```bash
npm run dev
```

## Error Handling

The application includes:
- File type validation (.ply only)
- Upload status indicators
- Error messages for failed uploads
- Server-side logging

## Technical Details

- **Frontend**: React with Three.js (react-three/fiber)
- **Backend**: FastAPI with static file serving
- **3D Features**: 
  - Dynamic model loading
  - Environment lighting
  - Professional material settings
  - Scale controls

