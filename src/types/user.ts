export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender?: string; // tambahkan ini jika gender adalah opsional
  birthDate?: Date; // jika ada
  address?: string; // jika ada
  profilePicture?: string; // jika ada
}
