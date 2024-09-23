import { LanguagesController } from '#common/api/languages-controller.ts'
import { LanguageService } from '#common/application/language-service.ts'
import { LanguageRepositoryPg } from '#common/infrastructure/language-repository-pg.ts'
import { Router } from 'express'

const router: Router = Router()

const languageService = new LanguageService({
  repository: new LanguageRepositoryPg(),
})
const languagesController = new LanguagesController(languageService)
router.get('/languages', (res, req) => languagesController.all(res, req))

export default router
