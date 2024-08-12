import { db } from '@/config/database'
import { language } from '@/common/infrastructure/schema/language-schema'
import { currency } from '@/plutos/infrastructure/schema/currency-pg-schema'

async function main() {
  console.log('Seed script is running...')
  await db.insert(language).values([
    {
      code: 'en',
      name: 'English',
    },
  ])

  await db.insert(currency).values([
    {
      name: 'US Dollar',
      code: 'USD',
    },
    {
      name: 'Euro',
      code: 'EUR',
    },
    {
      name: 'British Pound',
      code: 'GBP',
    },
    {
      name: 'Japanese Yen',
      code: 'JPY',
    },
    {
      name: 'Złoty',
      code: 'PLN',
    },
  ])
  console.log('Seed script is done!')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
