import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import type { Note } from '../notes'
import styles from './NoteList.module.css'

type Props = {
  notes: Note[]
  onSelect: (id: string) => void
}

export function NoteList({ notes, onSelect }: Props) {
  const topics = notes.filter(n => n.category === 'topics')
  const til = notes.filter(n => n.category === 'til')
  const [showQR, setShowQR] = useState(false)
  const url = window.location.href

  return (
    <div className={styles.container}>
      <div className={styles.headingRow}>
        <h1 className={styles.heading}>学習ノート</h1>
        <button className={styles.shareButton} onClick={() => setShowQR(v => !v)}>
          {showQR ? '閉じる' : '共有'}
        </button>
      </div>

      {showQR && (
        <div className={styles.qrBox}>
          <QRCodeSVG value={url} size={160} />
          <p className={styles.qrUrl}>{url}</p>
        </div>
      )}

      {topics.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>トピック</h2>
          {topics.map(note => (
            <button key={note.id} className={styles.card} onClick={() => onSelect(note.id)}>
              <span className={styles.cardTitle}>{note.title}</span>
              <span className={styles.arrow}>→</span>
            </button>
          ))}
        </section>
      )}

      {til.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Today I Learned</h2>
          {til.map(note => (
            <button key={note.id} className={styles.card} onClick={() => onSelect(note.id)}>
              <span className={styles.cardTitle}>{note.title}</span>
              <span className={styles.arrow}>→</span>
            </button>
          ))}
        </section>
      )}

      {notes.length === 0 && (
        <p className={styles.empty}>まだノートがありません</p>
      )}
    </div>
  )
}
