import { useState } from 'react'
import { notes } from './notes'
import { NoteList } from './components/NoteList'
import { NoteViewer } from './components/NoteViewer'

export function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selected = notes.find(n => n.id === selectedId) ?? null

  if (selected) {
    return <NoteViewer note={selected} onBack={() => setSelectedId(null)} />
  }

  return <NoteList notes={notes} onSelect={setSelectedId} />
}
