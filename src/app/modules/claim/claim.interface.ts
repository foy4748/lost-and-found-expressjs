import { STATUS } from '@prisma/client';

export type TCreateClaimPayload = {
  foundItemId: string;
  distinguishingFeatures: string;
  lostDate: string;
};

export type TClaimUpdatePayload = {
  status: STATUS;
};
