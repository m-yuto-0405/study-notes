import { useState, useEffect } from 'react'
import type { DiaryEntry } from '../types/diary'

const STORAGE_KEY = 'diary_entries'

function loadFromStorage(): DiaryEntry[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

export function useDiary() {
  const [entries, setEntries] = useState<DiaryEntry[]>(loadFromStorage)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  }, [entries])

  const addEntry = (body: string) => {
    setEntries(prev => [
      { id: Date.now(), date: new Date().toISOString(), body },
      ...prev,
    ])
  }

  const removeEntry = (id: number) => {
    setEntries(prev => prev.filter(e => e.id !== id))
  }

  return { entries, addEntry, removeEntry }
}
