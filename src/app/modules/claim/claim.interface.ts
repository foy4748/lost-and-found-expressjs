import { STATUS } from '@prisma/client';

export type TCreateClaimPayload = {
  foundById: string;
  distinguishingFeatures: string;
  lostDate: Date;
};

export type TClaimUpdatePayload = {
  status: STATUS;
};
