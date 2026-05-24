import { Request } from 'express'

// Augment express Request with admin identity after JWT verify
export interface AuthRequest extends Request {
  adminId?: string
}

export interface JwtPayload {
  adminId: string
  iat?: number
  exp?: number
}

export type Album =
  | 'pre-wedding'
  | 'engagement'
  | 'ceremony'
  | 'reception'
  | 'honeymoon'

export type ResourceType = 'image' | 'video'

export interface MediaRow {
  id: string
  url: string
  public_id: string
  resource_type: ResourceType
  album: Album
  caption: string | null
  approved: boolean
  submitted_by: string | null
  created_at: string
}

export interface RsvpRow {
  id: string
  full_name: string
  email: string
  attending: boolean
  meal_preference: string | null
  plus_one_name: string | null
  dietary_notes: string | null
  created_at: string
}

export interface GuestbookRow {
  id: string
  guest_name: string
  message: string
  approved: boolean
  created_at: string
}
