export default class ImageController {
  constructor ({ model }) {
    this.model = model
  }

  uploadImage = async (req, res) => {
    const image = req.file.path
    if (!image) {
      return res.status(440).json({ success: false, message: 'error uploading image' })
    }
    const url = await this.model.uploadImage(image)
    if (!url) {
      return res.status(440).json({ success: false, message: 'error uploading image' })
    }
    return res.status(201).json({ success: true, message: 'error uploading image', url })
  }
}
