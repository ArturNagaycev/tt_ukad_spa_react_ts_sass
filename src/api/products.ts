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
    products = await client.get<Product[]>(`/breeds/search?q=${query}`);
  }

  return products || null;
};

export const getProductById = async (productId: number) => {
  const product = await client.get<Product>(`/breeds/${productId}`);

  if (product?.reference_image_id) {
    const image = await getImage(product.reference_image_id);

    product.image = image;
  }

  return product || null;
};
