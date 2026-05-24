import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'
import dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// ── Image storage ────────────────────────────────────────
const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: async (_req, file) => ({
    folder:         `${process.env.CLOUDINARY_FOLDER || 'wedding'}/images`,
    resource_type:  'image',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'heic'],
    transformation: [{ quality: 'auto:good', fetch_format: 'auto' }],
    public_id: `img_${Date.now()}_${file.originalname.replace(/\.[^/.]+$/, '').replace(/\s+/g, '_')}`,
  }),
})

// ── Video storage ────────────────────────────────────────
const videoStorage = new CloudinaryStorage({
  cloudinary,
  params: async (_req, file) => ({
    folder:        `${process.env.CLOUDINARY_FOLDER || 'wedding'}/videos`,
    resource_type: 'video',
    allowed_formats: ['mp4', 'mov', 'avi', 'webm'],
    public_id: `vid_${Date.now()}_${file.originalname.replace(/\.[^/.]+$/, '').replace(/\s+/g, '_')}`,
  }),
})

export const uploadImage = multer({
  storage: imageStorage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15 MB
})

export const uploadVideo = multer({
  storage: videoStorage,
  limits: { fileSize: 200 * 1024 * 1024 }, // 200 MB
})

export const deleteFromCloudinary = async (
  publicId: string,
  resourceType: 'image' | 'video' = 'image'
): Promise<void> => {
  await cloudinary.uploader.destroy(publicId, { resource_type: resourceType })
}

export default cloudinary
