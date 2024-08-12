import { Router } from 'express'

import { LanguagesController } from '@/common/api/languages-controller'
import { LanguageService } from '@/common/application/language-service'
import { LanguageRepositoryPg } from '@/common/infrastructure/language-repository-pg'

const router = Router()

const languageService = new LanguageService({
  repository: new LanguageRepositoryPg(),
})
const languagesController = new LanguagesController(languageService)
router.get('/languages', (res, req) => languagesController.all(res, req))

export default router
