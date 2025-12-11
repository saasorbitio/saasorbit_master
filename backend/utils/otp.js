import crypto from "crypto";

export function generateOtp() {
  return crypto.randomInt(100000, 999999).toString();
}

export function isCompanyEmail(email) {
  const forbidden = /(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com)$/i;
  return !forbidden.test(email);
}
