import React from "react";
import { checkEmail } from "../modules/checkConnectionInputs";

it("Check wrong email", () => {
  const wrongEmail1 = "name";
  const wrongEmail2 = "name@test.f";
  const wrongEmail3 = "nametest.fr";
  expect(checkEmail(wrongEmail1)).toBe(false);
  expect(checkEmail(wrongEmail2)).toBe(false);
  expect(checkEmail(wrongEmail3)).toBe(false);
});
