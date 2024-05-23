import { returnRandomItem } from './utils';
import axios from 'axios';

const ScreateFakeData = async () => {
  const client = axios.create({
    baseURL: 'http://localhost:3001',
    //baseURL: 'https://apollo-assignment-04.vercel.app',
  });

  // Logging in As User
  const user_token = { token: '' };
  const userCredentials = {
    email: 'test@test.com',
    password: 'password',
  };

  const loginAsUser = async () => {
    console.log('Trying to login as User for creating reviews');
    const { data } = await client.post(
      'https://apollo-assignment-08.vercel.app/api/login',
      userCredentials,
    );
    const { token } = data.data;
    client.defaults.headers.common['Authorization'] = token;
    user_token.token = token;
    console.log('User Login successfull');
  };
  await loginAsUser();

  const categoryIds = [
    '84367f83-f26b-434b-8581-36b473068908',
    '650bcc47-3366-4985-ab4a-e43782add7f3',
    '8d7da51c-9da3-41f1-9611-d1f03eb864bd',
    '13a62f2d-d752-4adf-ae6a-e5b360ec331b',
    '05b1adc2-aad4-4c5d-91da-51c96437b760',
  ];

  const randomFoundItemName = [
    'Apple iPhone 13',
    'Samsung Galaxy S21',
    'Google Pixel 6',
    'OnePlus 9',
    'Huawei P40 Pro',
    'Xiaomi Mi 11',
    'Motorola Moto G Power',
    'Nokia 8.3',
    'Sony Xperia 1 II',
    'LG V60 ThinQ',
    'Asus ROG Phone 5',
    'Realme 8 Pro',
    'Oppo Find X3 Pro',
    'Vivo X60 Pro',
    'ZTE Axon 30 Ultra',
    'TCL 20 Pro 5G',
    'Lenovo Legion Phone Duel 2',
    'Honor 50 Pro',
    'Meizu 18 Pro',
    'Black Shark 4 Pro',
    'Fairphone 4',
    'Alcatel 3L',
    'Panasonic Toughbook N1',
    'Sharp Aquos R6',
    'Kyocera DuraForce Ultra 5G UW',
  ];

  const randomDescriptions = [
    'The Apple iPhone 13 offers an excellent display and a long-lasting battery life.',
    'The Samsung Galaxy S21 is a high-end smartphone with a sleek design and powerful features.',
    'The Google Pixel 6 is known for its superior camera quality and smooth performance.',
    'The OnePlus 9 has a robust build quality and comes with the latest software updates.',
    'The Huawei P40 Pro is a budget-friendly smartphone with decent specifications.',
    'The Xiaomi Mi 11 stands out for its unique design and fast charging capabilities.',
    'The Motorola Moto G Power is a gaming smartphone with a high refresh rate display.',
    'The Nokia 8.3 is a compact smartphone suitable for one-handed use.',
    'The Sony Xperia 1 II is a flagship smartphone with top-notch hardware and software.',
    'The LG V60 ThinQ is a rugged smartphone designed for outdoor use.',
  ];

  const randomLocations = [
    'Dubai, UAE',
    'Berlin, Germany',
    'Rio de Janeiro, Brazil',
    'New York, USA',
    'Sydney, Australia',
    'Paris, France',
    'Istanbul, Turkey',
    'Mexico City, Mexico',
    'London, UK',
    'Singapore, Singapore',
  ];

  for (let i = 0; i < 49; i++) {
    const categoryId = returnRandomItem<string>(categoryIds);
    const foundItemName = returnRandomItem<string>(randomFoundItemName);
    const description = returnRandomItem<string>(randomDescriptions);
    const location = returnRandomItem<string>(randomLocations);
    const userId = 'd650af09-a7ce-46a1-9d1d-4efd06bbfce2';
    const payload = {
      categoryId,
      foundItemName,
      description,
      location,
      userId,
    };

    const result = await client.post(
      'https://apollo-assignment-08.vercel.app/api/found-items',
      payload,
    );
    console.log(result);
  }
};

ScreateFakeData();
