const cloudinary = require('cloudinary/lib/cloudinary');

cloudinary.config({
  cloud_name: 'dpxefvdot', 
  api_key: '342899366656594', 
  api_secret: 'GPGo4pewLmgIGpnSeV1dbjWRGQc' 
})

const getDate = () => {
  const date = new Date();
  let day = date.getDay() <= 9 ? `0${date.getDay()}` : date.getDay()
  let month = date.getMonth() + 1 <=9 ? `0${date.getMonth()}` : date.getMonth()
  let year = date.getFullYear()

  return `${day}-${month}-${year}`
}

const uploadImage = (img,idPost,cb) => {
  cloudinary.v2.uploader.upload(img, {
   public_id: `ordep-blog/${getDate()}/post-${idPost}`
  },cb)
}
const deleteImageCloudinary = (public_id,cb) => {
  cloudinary.uploader.destroy(public_id,cb);
}

export {
  uploadImage,
  deleteImageCloudinary
}