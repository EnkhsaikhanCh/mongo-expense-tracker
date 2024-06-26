export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): boolean {
  return emailRegex.test(email);
}

export function validateOTP(otpArray: string[]): boolean {
  return (
    otpArray.length === 6 &&
    otpArray.every((digit) => digit.length === 1 && !isNaN(Number(digit)))
  );
}

export function validatePassword(password: string): boolean {
  return password.length >= 8;
}
