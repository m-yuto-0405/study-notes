import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Note } from '../notes'
import styles from './NoteViewer.module.css'

type Props = {
  note: Note
  onBack: () => void
}

export function NoteViewer({ note, onBack }: Props) {
  return (
    <div className={styles.container}>
      <button className={styles.back} onClick={onBack}>← 戻る</button>
      <div className={styles.content}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{note.content}</ReactMarkdown>
      </div>
    </div>
  )
}
