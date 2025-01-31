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

export type AdminData = {
  name: string;
  password: string;
};

export type IncomingMessage = { msg: string };

export type CurrentAdminData = { name: string; password?: string };

export type PayloadMsg = { payload: IncomingMessage };

export type Category = { id?: string; key: string };
