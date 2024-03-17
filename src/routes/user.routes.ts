import { Router } from 'express';
import { signUp, login } from '../controllers/user.controller';
import { userSchema } from '../utils/validation-schemas';
import { validateSchema } from '../middlewares/schema-validator.middleware';

const router = Router();

router.post('/signup', validateSchema(userSchema, 'body'), signUp);
router.post('/login', validateSchema(userSchema, 'body'), login);
export default router;