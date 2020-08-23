import randomColor from 'random-color';

export const imageUrl = (size,path) => {
  return `https://image.tmdb.org/t/p/${size}/${path}`
}

export const avatarGenerate = () => {
  const color = randomColor().hexString().replace('#',''),
        numberRandom = Math.floor(Math.random() * 12);
  return `https://api.adorable.io/avatars/face/eyes${numberRandom}/nose${numberRandom}/mouth${numberRandom}/${color}`
}
