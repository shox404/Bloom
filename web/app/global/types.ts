import { ChangeEvent } from "react";

export type AdminData = { name: string; password: string };

export type IncomingMessage = { msg: string  };

export type CurrentAdminData = { name: string; password?: string };

export type PayloadMsg = { payload: IncomingMessage };

export type Detail = { key: string; value: any };

export type FormValue = ChangeEvent<HTMLFormElement>;

export type Category = { id?: string; key: string };
