import type { DiaryEntry } from '../types/diary'
import styles from './EntryCard.module.css'

type Props = {
  entry: DiaryEntry
  onRemove: (id: number) => void
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function EntryCard({ entry, onRemove }: Props) {
  const handleRemove = () => {
    if (confirm('この日記を削除しますか？')) {
      onRemove(entry.id)
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.date}>{formatDate(entry.date)}</span>
        <button className={styles.deleteButton} onClick={handleRemove}>
          削除
        </button>
      </div>
      <p className={styles.body}>{entry.body}</p>
    </div>
  )
}
