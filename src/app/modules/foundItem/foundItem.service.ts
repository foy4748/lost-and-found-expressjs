import { Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import {
  TReportFoundBy,
  TfilterControlObject,
  TfoundItemPayload,
  TpaginationControlObject,
} from './foundItem.interface';
import allowedUserFields from '../user/user.constant';
import { JwtPayload } from 'jsonwebtoken';
import { foundItemsSearchAbleFields } from './foundItem.constant';
const prisma = new PrismaClient();

// Report Lost Item
export const SreportLostItem = async (
  payload: TfoundItemPayload,
  decoded: JwtPayload,
) => {
  const reportedLostItem = await prisma.foundItems.create({
    data: {
      ...payload,
      userId: decoded.id,
    },
    include: {
      category: true,
      user: {
        select: allowedUserFields,
      },
    },
  });
  return reportedLostItem;
};

// Report Found Item [IMPORTANT]
export const SreportFoundItem = async (
  payload: TfoundItemPayload,
  decoded: JwtPayload,
) => {
  const reportedFoundItem = await prisma.foundItems.create({
    data: {
      ...payload,
      userId: decoded.id,
      isItemFound: true,
      FoundBy: {
        create: {
          userId: decoded.id,
        },
      },
    },
    include: {
      category: true,
      user: {
        select: allowedUserFields,
      },
    },
  });
  return reportedFoundItem;
};

export const SpaginatedAndFilteredFoundItems = async (
  filterControlObject: TfilterControlObject,
  paginationControlObject: TpaginationControlObject,
) => {
  const { limit, page } = paginationControlObject;
  const skip = ((Number(page) || 1) - 1) * (Number(limit) || 10);
  const andCondions: Prisma.FoundItemsWhereInput[] = [];
  const { searchTerm, ...filterFields } = filterControlObject;
  if (searchTerm) {
    andCondions.push({
      OR: foundItemsSearchAbleFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterFields).length > 0) {
    andCondions.push({
      AND: Object.keys(filterFields).map((key) => ({
        [key]: {
          // eslint-disable-next-line
          equals: (filterFields as any)[key],
        },
      })),
    });
  }

  const whereConditons: Prisma.FoundItemsWhereInput = { AND: andCondions };
  const result = await prisma.foundItems.findMany({
    where: whereConditons,
    skip,
    take: Number(limit) || 10,
    orderBy:
      paginationControlObject?.sortBy && paginationControlObject.sortOrder
        ? {
            [paginationControlObject?.sortBy]:
              paginationControlObject?.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.foundItems.count({
    where: whereConditons,
  });

  const meta = { total, page: Number(page) || 1, limit: Number(limit) || 10 };
  return { result, meta };
};

export const SgetSingleFoundItem = async (id: string) => {
  const result = await prisma.foundItems.findFirst({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          email: true,
          name: true,
        },
      },
      category: true,
    },
  });
  return result;
};

// Get FoundItems specific to a user

export const SgetUserSpecificFoundItems = async (
  decoded: JwtPayload,
  isItemFound?: boolean,
) => {
  const result = await prisma.foundItems.findMany({
    where: {
      userId: String(decoded.id),
      isItemFound: Boolean(isItemFound),
    },
  });
  return result;
};

// Report foundBy for a Lost Item
export const SreportFoundBy = async (
  payload: TReportFoundBy,
  decoded: JwtPayload,
) => {
  const [result] = await prisma.$transaction([
    prisma.foundBy.create({
      data: { ...payload, userId: decoded.id },
    }),
    prisma.foundItems.update({
      where: {
        id: payload.foundItemId,
      },
      data: {
        isItemFound: true,
      },
    }),
  ]);

  return result;
};

export const SgetFoundBy = async (foundItemId: string) => {
  const result = await prisma.foundBy.findUnique({
    where: {
      foundItemId,
    },
    include: {
      user: {
        select: allowedUserFields,
      },
    },
  });
  return result;
};
