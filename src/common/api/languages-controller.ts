import { Request, Response } from 'express'

import { LanguageService } from '@/common/application/language-service'

export class LanguagesController {
  private service: LanguageService
  constructor(service: LanguageService) {
    this.service = service
  }
  async all(req: Request, res: Response) {
    try {
      const data = await this.service.all()
      res.status(200).json({ data })
    } catch (e) {
      console.error(e)
      if (e instanceof Error) {
        res.status(500).json({ error: e.message })
      } else {
        res.status(500).json({ error: 'Something went wrong!' })
      }
    }
  }
}
