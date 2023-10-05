import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { ContactsEntity } from '../entities/contacts';
import Mail from '../utils/nodemailer';
import path from 'path';

class ContactsController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(ContactsEntity).find({
            relations: {
                aplication: true
            }, order: { id: "ASC" }
        }));
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params

        res.json(await AppDataSource.getRepository(ContactsEntity).find({
            relations: {
                aplication: true
            }, where: { id: +id }
        }));
    }

    public async Post(req: Request, res: Response) {
        const { weekly_package, deliver_to, company_name,contact_name,phone,email,inQuery} = req.body

        const pdf_url=path.join(process.cwd(),'assets','Kuchkarov.pdf');

        const contact = await AppDataSource.getRepository(ContactsEntity).createQueryBuilder().insert().into(ContactsEntity).values({ weekly_package, deliver_to, company_name,contact_name,phone,email,inQuery}).returning("*").execute()

        Mail({
            from: {
                name: "Ship Car Leads",
                address: "shipcarleads@gmail.com"
            },
            to: email,
            subject: `Thank You !`,
            html: `Thank you! <br/> 

            We have registered your request. Please keep an eye on your email, one of our representatives will be in touch shortly with more information about our lead packages. <br/> <br/>
            
            Download the credit card authorization form, fill it out and send it to shipcarleads@gmail.com . Or, return to the site and click the submit file button. <br/> <br/>
            
            Set up in seconds and start receiving high-converting traffic offers now!
            <br/> <br/>
            Get a higher return on investment than other leading providers!`,
            attachments: [{
                filename: 'Kuchkarov.pdf',
                path: pdf_url,
                encoding: 'base64',
            }]
        });

        res.json({
            status: 201,
            message: "contact created",
            data: contact.raw[0]
        })
    }

    public async Put(req: Request, res: Response) {
        try {
            const { weekly_package, deliver_to, company_name,contact_name,phone,email,inQuery} = req.body
            const { id } = req.params

            const contact = await AppDataSource.getRepository(ContactsEntity).createQueryBuilder().update(ContactsEntity)
                .set({ weekly_package, deliver_to, company_name,contact_name,phone,email,inQuery})
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "contact updated",
                data: contact.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const contact = await AppDataSource.getRepository(ContactsEntity).createQueryBuilder().delete().from(ContactsEntity).where({ id }).returning("*").execute()

            res.json({
                status: 200,
                message: "contact deleted",
                data: contact.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new ContactsController();