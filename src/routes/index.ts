import { Router } from "express";
import contacts from "../controllers/contacts";
import aplication from "../controllers/aplication";

const router = Router()

router.get('/contacts',contacts.Get);
router.get('/contacts/:id',contacts.GetId);
router.post('/contacts',contacts.Post);
router.put('/contacts/:id',contacts.Put);
router.delete('/contacts/:id',contacts.Delete);

router.get('/aplication',aplication.Get);
router.get('/aplication/:id',aplication.GetId);
router.post('/aplication',aplication.Post);
router.put('/aplication/:id',aplication.Put);
router.delete('/aplication/:id',aplication.Delete);



export default router;
