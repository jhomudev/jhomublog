type Props = {
  text: string
  by?: 'words' | 'characters'
  limit: number,
  noLimit?: boolean
}

const limitText = ({ text, by = 'characters', limit, noLimit = false }: Props) => { 
  if(noLimit) return text
  if (by === 'words') return text.split(' ').slice(0, limit).join(' ') + '...'
  if (by === 'characters') {
    const limitedText = text.slice(0, limit)
    return limitedText.length === text.length ? text : limitedText + '...'
  }
  return text
}

export default limitText