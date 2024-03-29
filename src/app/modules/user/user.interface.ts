export type TUserAndUserProfilePayLoad = {
  name: string;
  email: string;
  password: string;
  profile: {
    bio: string;
    age: number;
  };
};

export type TUserAndUserProfileResponse = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  profile: {
    id: string;
    userId: string;
    bio: string;
    age: number;
    createdAt: string;
    updatedAt: string;
  };
};

export type TUserLoginPayLoad = {
  email: string;
  password: string;
};
