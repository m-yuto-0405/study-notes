import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
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
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            a: ({ href, children }) => (
              <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
            ),
          }}
        >{note.content}</ReactMarkdown>
      </div>
    </div>
  )
}
