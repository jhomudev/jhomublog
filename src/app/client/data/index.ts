export const CATEGORIE_COLORS = {
  fashion: '#da85c7',
  food: '#7fb881',
  coding: '#5e4fff',
  style: '#57c4ff',
  culture: '#ffb04f',
  travel: '#ff7957',
  anime: '#851677'
}

export type CatColors = keyof typeof CATEGORIE_COLORS

Object.freeze(CATEGORIE_COLORS)

export const DEFAULT_POST_IMG = '/post-image-default.jpg'
export const DEFAULT_USER_AVATAR = '/post-image-default.jpg'