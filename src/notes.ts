export type Note = {
  id: string
  title: string
  category: 'topics' | 'til' | 'news'
  content: string
}

function filenameToTitle(filename: string): string {
  return filename
    .replace(/\.md$/, '')
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

const topicFiles = import.meta.glob('./content/topics/*.md', { eager: true, query: '?raw', import: 'default' })
const tilFiles = import.meta.glob('./content/til/*.md', { eager: true, query: '?raw', import: 'default' })
const newsFiles = import.meta.glob('./content/news/*.md', { eager: true, query: '?raw', import: 'default' })

export const notes: Note[] = [
  ...Object.entries(newsFiles).map(([path, content]) => {
    const filename = path.split('/').pop()!
    return {
      id: `news-${filename}`,
      title: filename.replace(/\.md$/, ''),
      category: 'news' as const,
      content: content as string,
    }
  }).sort((a, b) => b.title.localeCompare(a.title)),
  ...Object.entries(topicFiles).map(([path, content]) => {
    const filename = path.split('/').pop()!
    return {
      id: `topics-${filename}`,
      title: filenameToTitle(filename),
      category: 'topics' as const,
      content: content as string,
    }
  }),
  ...Object.entries(tilFiles).map(([path, content]) => {
    const filename = path.split('/').pop()!
    return {
      id: `til-${filename}`,
      title: filename.replace(/\.md$/, ''),
      category: 'til' as const,
      content: content as string,
    }
  }),
]
