import { useDiary } from './hooks/useDiary'
import { Editor } from './components/Editor'
import { EntryList } from './components/EntryList'
import styles from './App.module.css'

const ClaudeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(50,50)">
      {[0, 60, 120, 180, 240, 300].map(deg => (
        <rect
          key={deg}
          x="-7" y="-38" width="14" height="46" rx="7"
          fill="#D97757"
          transform={`rotate(${deg})`}
        />
      ))}
    </g>
  </svg>
)

export function App() {
  const { entries, addEntry, removeEntry } = useDiary()

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        <ClaudeIcon />
        日記
      </h1>
      <Editor onSave={addEntry} />
      <EntryList entries={entries} onRemove={removeEntry} />
    </div>
  )
}
