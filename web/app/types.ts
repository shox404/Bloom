export type User = {
  id?: string;
  otp?: string;
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
