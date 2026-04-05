import { useState } from 'react'
import styles from './Editor.module.css'

type Props = {
  onSave: (body: string) => void
}

const today = new Date().toLocaleDateString('ja-JP', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
})

export function Editor({ onSave }: Props) {
  const [text, setText] = useState('')

  const handleSave = () => {
    const trimmed = text.trim()
    if (!trimmed) return
    onSave(trimmed)
    setText('')
  }

  return (
    <div className={styles.editor}>
      <p className={styles.date}>{today}</p>
      <textarea
        className={styles.textarea}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="今日はどんな一日でしたか？"
      />
      <div className={styles.footer}>
        <button className={styles.button} onClick={handleSave}>
          保存
        </button>
      </div>
    </div>
  )
}
