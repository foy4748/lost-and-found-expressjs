import { PrismaClient } from '@prisma/client';
import { returnRandomItem } from './utils';

const prisma = new PrismaClient();
const ScreateFakeData = async () => {
  const categoryIds = [
    '61a03163-3cf6-4430-9147-9ec2c5fcb7dc',
    '711a8e22-9dd1-417c-9e1a-002339ae455f',
    '03f127f9-92e5-472c-b1bc-dba23835e9e5',
    'd250cba1-90fd-4537-a96f-7dce42d07246',
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
    const userId = 'fef9f5db-1f89-49f7-864b-f4b36caa06ef';
    const payload = {
      categoryId,
      foundItemName,
      description,
      location,
      userId,
    };

    const result = await prisma.foundItems.create({ data: payload });

    console.log(result);
  }
};

ScreateFakeData();
