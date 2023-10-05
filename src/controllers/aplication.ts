import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { AplicationEntity } from '../entities/aplication';

class AplicationController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(AplicationEntity).find({
            relations: {
                contact: true
            }, order: { id: "ASC" }
        }));
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params

        res.json(await AppDataSource.getRepository(AplicationEntity).find({
            relations: {
                contact: true
            }, where: { id: +id }
        }));
    }

    public async Post(req: Request, res: Response) {
        const { pdf,contact} = req.body

        const aplication = await AppDataSource.getRepository(AplicationEntity).createQueryBuilder().insert().into(AplicationEntity).values({ pdf,contact}).returning("*").execute()


        res.json({
            status: 201,
            message: "aplication created",
            data: aplication.raw[0]
        })
    }

    public async Put(req: Request, res: Response) {
        try {
            const { pdf,contact} = req.body
            const { id } = req.params

            const aplication = await AppDataSource.getRepository(AplicationEntity).createQueryBuilder().update(AplicationEntity)
                .set({ pdf,contact})
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "aplication updated",
                data: aplication.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const aplication = await AppDataSource.getRepository(AplicationEntity).createQueryBuilder().delete().from(AplicationEntity).where({ id }).returning("*").execute()

            res.json({
                status: 200,
                message: "aplication deleted",
                data: aplication.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new AplicationController();