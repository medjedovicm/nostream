import { Request, Response } from 'express'
import { IController } from '../../@types/controllers'
import { IUserRepository } from '../../@types/repositories'
import { Settings } from '../../@types/settings'

export class GetSubmissionCheckController implements IController {
  public constructor(
    private readonly userRepository: IUserRepository,
    private readonly settings: () => Settings
  ){}

  public async handleRequest(request: Request, response: Response): Promise<void> {
    const currentSettings = this.settings()
    
    const pubkey = request.params.pubkey
    const user = await this.userRepository.findByPubkey(pubkey)

    let userAdmitted = false

    const minBalance = currentSettings.limits?.event?.pubkey?.minBalance
    if (user && user.isAdmitted && (!minBalance || user.balance >= minBalance)) {
      userAdmitted = true
    }

    response
      .status(200)
      .setHeader('content-type', 'application/json; charset=utf8')
      .send({ userAdmitted })

    return
  }
}