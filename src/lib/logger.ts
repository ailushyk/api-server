// TODO: Implement logger
export const logger = {
  info: (message: string) => {
    console.log(`[INFO] ${message}`)
  },
  error: (message: string, error?: unknown) => {
    console.error(`[ERROR] ${message}`)
    if (error) {
      console.error(error)
    }
  },
}
