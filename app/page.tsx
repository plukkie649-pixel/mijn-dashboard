'use client'
import { useState, useEffect } from 'react'

export default function RagoStream() {
  const [videos, setVideos] = useState([])
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('rago-stream-videos')
    if (saved) setVideos(JSON.parse(saved))
  }, [])

  const addVideo = () => {
    if (!title || !url) return
    const newVideo = { id: Date.now(), title, url: url.split('v=')[1] || url }
    const updated = [...videos, newVideo]
    setVideos(updated)
    localStorage.setItem('rago-stream-videos', JSON.stringify(updated))
    setTitle('')
    setUrl('')
  }

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <h1 className="text-5xl font-bold mb-8 text-blue-500">RagoStream Pro</h1>
      <div className="flex gap-4 mb-10 bg-gray-900 p-6 rounded-2xl">
        <input className="p-3 bg-black border border-gray-700 rounded-lg flex-1 text-white" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titel" />
        <input className="p-3 bg-black border border-gray-700 rounded-lg flex-1 text-white" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="YouTube URL" />
        <button className="bg-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-700" onClick={addVideo}>Toevoegen</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map(v => (
          <div key={v.id} className="bg-gray-900 rounded-xl overflow-hidden hover:scale-105 transition">
            <img src={`https://img.youtube.com/vi/${v.url}/0.jpg`} className="w-full" />
            <div className="p-4"><h3 className="font-bold">{v.title}</h3></div>
          </div>
        ))}
      </div>
    </div>
  )
}
