export type User = {
  id?: string;
  code?: string;
  location: {
    latitude: number;
    longitude: number;
  };
  name: string;
  phone_number: string;
  tg_data: {
    id: number;
    username: string;
  };
};

export type Category = {
  id?: string;
  key: string;
  image: string;
};

export type Product = {
  id?: string;
  title: string;
  image: string;
  price: number;
  category: string;
};
