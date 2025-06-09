import { config } from 'dotenv';
import path from 'path';
import { PrismaClient } from '@prisma/client';

config({ path: path.join(__dirname, '../../.env') });

const prisma = new PrismaClient();

export default prisma;
