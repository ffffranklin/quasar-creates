import { faker } from '@faker-js/faker/locale/en';

export const product = ({
  id = faker.number.int(),
  title = faker.lorem.sentence(),
  content = faker.lorem.paragraph(),
}: {
  id: number;
  title?: string;
  content?: string;
}) => ({ id, title, content });
