import express from 'express'

export interface AuthenticatedReq extends express.Request {
  user?: {
    id: string
  }
}
