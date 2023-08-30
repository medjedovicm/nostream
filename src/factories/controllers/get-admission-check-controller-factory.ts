import { createSettings } from '../settings-factory'
import { getMasterDbClient } from '../../database/client'
import { GetSubmissionCheckController } from '../../controllers/admission/get-admission-check-controller'
import { UserRepository } from '../../repositories/user-repository'

export const createGetAdmissionCheckController = () => {
  const dbClient = getMasterDbClient()
  const userRepository = new UserRepository(dbClient)
  
  return new GetSubmissionCheckController(
    userRepository,
    createSettings
  )
}
