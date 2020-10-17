import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Orphanage from '../models/Orphanage'

export default {
  /* -------------------------------------------------------------------------- */
  /*                      EXIBIR DADOS DE UM ÚNICO ORFANATO                     */
  /* -------------------------------------------------------------------------- */

  async show(request: Request, response: Response): Promise<any> {
    const { id } = request.params

    const orphanagesRepository = getRepository(Orphanage)

    const orphanages = await orphanagesRepository.findOneOrFail(id)

    return response.status(200).json(orphanages)
  },

  /* -------------------------------------------------------------------------- */
  /*                          EXIBIR LISTA DE ORFANATOS                         */
  /* -------------------------------------------------------------------------- */

  async index(request: Request, response: Response): Promise<any> {
    const orphanagesRepository = getRepository(Orphanage)

    const orphanages = await orphanagesRepository.find()

    return response.status(200).json(orphanages)
  },

  /* -------------------------------------------------------------------------- */
  /*                           CRIAR UM NOVO ORFANATO                           */
  /* -------------------------------------------------------------------------- */

  async create(request: Request, response: Response): Promise<any> {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body

    const orphanagesRepository = getRepository(Orphanage)

    const orphanage = orphanagesRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    })

    await orphanagesRepository.save(orphanage)

    return response.status(201).json(orphanage)
  },
}
