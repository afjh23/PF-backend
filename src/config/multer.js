import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const newName = Date.now() + '-' + file.originalname
    cb(null, newName)
  }
})

const imageFilter = function (req, file, cb) {
  const { mimetype } = file

  if (mimetype.includes('image')) {
    cb(null, true)
  } else {
    cb(new Error('Solo se aceptan imágenes'))
  }
}

export const uploadImage = multer({ storage, fileFilter: imageFilter })
