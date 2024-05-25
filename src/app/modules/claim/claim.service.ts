import { PrismaClient } from '@prisma/client';
import { TClaimUpdatePayload, TCreateClaimPayload } from './claim.interface';
import { JwtPayload } from 'jsonwebtoken';
import allowedUserFields from '../user/user.constant';
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

export async function SgetClaims() {
  const claims = await prisma.claims.findMany({
    include: {
      foundBy: {
        include: {
          user: {
            select: allowedUserFields,
          },
        },
      },
    },
  });
  return claims;
}

export async function SupdateClaim(
  claimId: string,
  payload: TClaimUpdatePayload,
) {
  const updatedClaim = await prisma.claims.update({
    where: {
      id: claimId,
    },
    data: payload,
  });
  return updatedClaim;
}
