export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender?: string; 
  birthDate?: Date; 
  address?: string; // jika ada
  profilePicture?: string; // jika ada
}
