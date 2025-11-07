// Функції для запитів на бекенд.

import axios from 'axios';

export async function getCategories() {
  const { data } = await axios(
    `https://furniture-store-v2.b.goit.study/api/categories`
  );

  return data;
}
