"use client";

import { FormEvent, useState } from "react";
import { VerifyStyles } from "../styles/verify-styles";
import { get_user } from "../firebase/functions";

export default function Verify() {
  const [state, setState] = useState("");

  const finish = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = await get_user(state);
    console.log(user);
  };

  return (
    <VerifyStyles>
      <form onSubmit={finish}>
        <input type="text" onChange={(e) => setState(e.target.value)} />
        <button type="submit">submit</button>
      </form>
    </VerifyStyles>
  );
}
