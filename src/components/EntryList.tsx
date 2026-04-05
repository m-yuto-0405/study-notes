import type { DiaryEntry } from '../types/diary'
import { EntryCard } from './EntryCard'
import styles from './EntryList.module.css'

type Props = {
  entries: DiaryEntry[]
  onRemove: (id: number) => void
}

export function EntryList({ entries, onRemove }: Props) {
  if (entries.length === 0) {
    return <p className={styles.empty}>まだ日記がありません</p>
  }

  return (
    <div className={styles.list}>
      {entries.map(entry => (
        <EntryCard key={entry.id} entry={entry} onRemove={onRemove} />
      ))}
    </div>
  )
}
