// Aqui pondremos el servicio de imagenes de cloudinary
// Este servicio se encargara de subir imagenes a cloudinary y de obtener la url de la imagen para subirlo a la base de datos
import { v2 as cloudinary } from 'cloudinary'
import 'dotenv/config'
cloudinary.config({
  cloud_name: 'dyig9g14u',
  api_key: '147298787567336',
  api_secret: process.env.API_KEY
})

export default class ImageCloudinary {
  static async uploadImage (image) {
    try {
      const response = await cloudinary.uploader.upload(image, { upload_preset: 'ml_default' })
      if (response) {
        return response.secure_url
      }
    } catch (e) {
      throw new Error(e)
    }
  }
}
