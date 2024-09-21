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
    password: 'passwordpassword',
  };

  const loginAsUser = async () => {
    console.log('Trying to login as User for creating reviews');
    const { data } = await client.post('/api/login', userCredentials);
    const { token } = data.data;
    console.log('Received Token', token);
    client.defaults.headers.common['Authorization'] = token;
    user_token.token = token;
    console.log('User Login successfull');
  };
  await loginAsUser();

  /*
  const categoryNames = [
    'Documents',
    'Jewelleries',
    'Bank Card',
    'Electronics',
    'Keys',
    'Wallet',
  ];
  */

  const categoryIds = [
    '38eced6e-7113-423d-b28d-770ff1dadbc6', // Documents
    '155b9952-e32b-4079-aced-365666c3e65f', // Jewelleries
    '00c08564-2638-4d9f-966d-d1c703cf2a53', // Bank Card
    '097f525c-0bd5-4beb-acec-0b48a09e712b', // Electronics
    '96d88a6c-ba7d-421e-9c98-e3e9f3fe2db5', // Keys
    'bf1c0bc7-ef65-4954-95fe-3a8b91c6fe8c', // Wallet
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

  const randomItemPics = [
    'https://i.ibb.co.com/M7RGN7q/1.png', // Phone
    'https://i.ibb.co.com/PCnbtd2/2.png', // Wallet
    'https://i.ibb.co.com/R0JTQCw/3.png', // Bank Cards
    'https://i.ibb.co.com/92tf8rJ/4.png', // Keys
  ];

  for (let i = 0; i < 49; i++) {
    const categoryId = returnRandomItem<string>(categoryIds);
    const foundItemName = returnRandomItem<string>(randomFoundItemName);
    const description = returnRandomItem<string>(randomDescriptions);
    const location = returnRandomItem<string>(randomLocations);
    const userId = 'd5c1d88c-4a7f-4a99-928a-81fa1e08ae36';
    const photoUrl = returnRandomItem(randomItemPics);
    const payload = {
      categoryId,
      foundItemName,
      description,
      location,
      userId,
      photoUrl,
    };

    const reportFoundOrReportLost = returnRandomItem([
      'report-found',
      'report-lost',
    ]);

    try {
      const result = await client.post(
        `/api/found-items/${reportFoundOrReportLost}`,
        payload,
      );
      console.log(result);
    } catch (error) {
      console.log(error);
      break;
    }
  }
};

ScreateFakeData();
