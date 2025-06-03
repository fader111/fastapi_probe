import { Canvas } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader'
import { OrbitControls, Environment } from '@react-three/drei'
import { useState, useEffect } from 'react'

function CowModel({ modelUrl }) {
  const geometry = useLoader(PLYLoader, modelUrl)
  
  return (
    <mesh position={[0, 0, 0]} scale={0.01}>
      <primitive object={geometry} attach="geometry" />
      <meshStandardMaterial color="pink" roughness={0.5} metalness={0.2} />
    </mesh>
  )
}

export default function CowScene() {
  const [modelUrl, setModelUrl] = useState('http://localhost:8000/models/cow.ply')
  const [availableModels, setAvailableModels] = useState([])
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchModels()
  }, [])

  const fetchModels = async () => {
    const res = await fetch('http://localhost:8000/api/models')
    const data = await res.json()
    setAvailableModels(data.models)
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)
    
    setUploading(true)
    try {
      const response = await fetch('http://localhost:8000/api/upload', {
        method: 'POST',
        body: formData,
      })
      
      if (response.ok) {
        const data = await response.json()
        await fetchModels()
        setModelUrl(`http://localhost:8000/models/${data.filename}`)
      } else {
        const error = await response.json()
        alert(error.error || 'Upload failed')
      }
    } catch (error) {
      alert('Upload failed: ' + error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 1, display: 'flex', gap: '10px' }}>
        <select 
          onChange={(e) => setModelUrl(`http://localhost:8000/models/${e.target.value}`)}
          style={{ padding: '5px', borderRadius: '4px' }}
        >
          {availableModels.map(model => (
            <option key={model} value={model}>{model}</option>
          ))}
        </select>
        
        <input
          type="file"
          accept=".ply"
          onChange={handleFileUpload}
          disabled={uploading}
          style={{ padding: '5px' }}
        />
        {uploading && <span>Uploading...</span>}
      </div>
      
      <Canvas
        camera={{ position: [0, 2, 5], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={['#f0f0f0']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <pointLight position={[-5, 3, -5]} intensity={0.5} color="#b1e1ff" />
        <spotLight
          position={[0, 5, -10]}
          intensity={0.5}
          angle={0.6}
          penumbra={1}
          color="#ff9f50"
        />
        <CowModel modelUrl={modelUrl} />
        <OrbitControls makeDefault />
        <gridHelper args={[10, 10]} />
        <Environment preset="sunset" />
      </Canvas>
    </div>
  )
}