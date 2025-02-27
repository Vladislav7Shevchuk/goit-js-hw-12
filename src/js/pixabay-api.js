import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImage(query, page, perPage) {
  const res = await axios.get(BASE_URL, {
    params: {
      key: '48819918-ba79d398f7b55c76d8c436738',
      q: query,
      page: page,
      per_page: perPage,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });
  return res;
}
