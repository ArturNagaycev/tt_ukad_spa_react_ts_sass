import { Image } from '../types/Image';
import { Product } from '../types/Product';
import { client } from '../utils/fetch';

const getImage = async (imageId: string) => {
  const image = await client.get<Image>(`/images/${imageId}`);

  return image;
};

export const getProducts = async ({ page = 1, query = '' }) => {
  let products;

  if (!query) {
    products = await client.get<Product[]>(`/breeds?limit=10&page=${page - 1}`);
  } else {
    products = await client.get<Product[]>(`/breeds`);
    const foundProducts = await client.get<Product[]>(
      `/breeds/search?q=${query}`
    );
    const foundProductsIds = foundProducts.map((product) => product.id);

    products = products.filter((product) =>
      foundProductsIds.includes(product.id)
    );
  }

  return products || null;
};

// === VERSION WITH HTTP 429 ERROR (TOO MANY REQUESTS) ===

// export const getProducts = async ({ page = 1, query = '' }) => {
//   let products;

//   if (!query) {
//     products = await client.get<Product[]>(`/breeds?limit=10&page=${page - 1}`);
//   } else {
//     products = await client.get<Product[]>(`/breeds/search?q=${query}`);
//     products = products.filter(
//       (product) =>
//         product.hasOwnProperty('reference_image_id') &&
//         product.reference_image_id !== ''
//     );

//     products = await Promise.all(
//       products.map(async (product) => {
//         const image = await getImage(product.reference_image_id);

//         return { ...product, image };
//       })
//     );
//   }

//   return products || null;
// };

export const getProductById = async (productId: number) => {
  const product = await client.get<Product>(`/breeds/${productId}`);
  const image = await getImage(product.reference_image_id);

  product.image = image;

  return product || null;
};
