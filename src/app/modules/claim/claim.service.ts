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
      foundById: payload.foundById,
      userId: String(decoded.id),
      lostDate: new Date(payload.lostDate),
      distinguishingFeatures: payload.distinguishingFeatures,
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

export async function SgetClaimByFoundById(foundById: string) {
  const result = await prisma.claims.findMany({
    where: {
      foundById,
    },
    include: {
      user: {
        select: allowedUserFields,
      },
    },
  });
  return result;
}
export async function SgetClaimByUserId(userId: string) {
  const result = await prisma.claims.findMany({
    where: {
      userId,
    },
    include: {
      user: {
        select: allowedUserFields,
      },
      foundBy: {
        include: {
          user: {
            select: allowedUserFields,
          },
          foundItem: true,
        },
      },
    },
  });
  return result;
}

export async function SgetClaimsCount() {
  const allClaims = await prisma.claims.count({});
  const approavedClaims = await prisma.claims.count({
    where: {
      status: 'APPROVED',
    },
  });
  return { allClaims, approavedClaims };
}
