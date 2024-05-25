import { STATUS } from '@prisma/client';

export type TCreateClaimPayload = {
  foundById: string;
  distinguishingFeatures: string;
  lostDate: string;
};

export type TClaimUpdatePayload = {
  status: STATUS;
};
