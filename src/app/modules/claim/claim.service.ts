import { PrismaClient } from '@prisma/client';
import { TCreateClaimPayload } from './claim.interface';
import { JwtPayload } from 'jsonwebtoken';
const prisma = new PrismaClient();

export async function ScreateClaim(
  payload: TCreateClaimPayload,
  decoded: JwtPayload,
) {
  const newClaim = await prisma.claims.create({
    data: {
      ...payload,
      userId: decoded.id,
    },
  });
  return newClaim;
}
