# 3D Model Viewer with React Three Fiber and FastAPI

A web application for viewing 3D PLY models using React Three Fiber on the frontend and FastAPI on the backend.

## Prerequisites

- Python 3.12 or higher
- Node.js 18.x or higher
- npm 9.x or higher

## Project Structure

```
fastapi_pro/
├── server/
│   ├── models/         # Directory for PLY model files
│   └── main.py         # FastAPI server code
├── src/
│   ├── App.jsx
│   └── Component.jsx   # Main 3D viewer component
├── scripts/
│   └── dev-server.js   # Development server starter
└── package.json
```

## Installation

1. Clone the repository:
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

## Adding 3D Models

1. Create a `models` directory in the `server` folder if it doesn't exist:
```bash
mkdir server\models
```

2. Copy your PLY files into the models directory:
```bash
copy path\to\your\models\*.ply server\models\
```

## Running the Application

1. Start both frontend and backend servers:
```bash
npm run dev:all
```

This will start:
- Frontend server at http://localhost:5173
- Backend server at http://localhost:8000

2. Open your browser and navigate to http://localhost:5173

## Features

- Dynamic model loading from server
- Model selection dropdown
- Interactive 3D controls:
  - Left click and drag to rotate
  - Right click and drag to pan
  - Scroll to zoom
- Grid helper for scale reference
- Professional lighting setup

## API Endpoints

- `GET /`: Server status
- `GET /api/models`: List available PLY models
- `GET /models/{filename}`: Serve PLY model files

## Development

To run servers separately:

1. Backend (FastAPI):
```bash
cd server
python -m uvicorn main:app --reload
```

2. Frontend (Vite):
```bash
npm run dev
```
