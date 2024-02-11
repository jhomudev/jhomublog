type Props = {
  text: string
  by?: 'words' | 'characters'
  limit: number,
  noLimit?: boolean
}

const limitText = ({ text, by = 'characters', limit, noLimit = false }: Props) => { 
  if(text.length < 15 || noLimit) return text
  if (by === 'words') return text.split(' ').slice(0, limit).join(' ') + '...'
  if (by === 'characters') return text.slice(0, limit) + '...'
  return text
}

export default limitText