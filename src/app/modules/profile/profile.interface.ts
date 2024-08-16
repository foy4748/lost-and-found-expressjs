export type TUpdateProfilePayload = {
  name?: string;
  profile: {
    bio?: string;
    age?: number;
    photoUrl?: string;
  };
};
