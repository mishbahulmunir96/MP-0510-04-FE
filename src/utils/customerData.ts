export interface Ticket {
  type: string;
  quantity: number;
  pricePerTicket: number;
}

export interface Purchase {
  id: number;
  eventName: string;
  eventDate: Date;
  tickets: Ticket[];
  totalPrice: number;
  transactionStatus: 'Accepted' | 'Rejected' | 'In Process';
  purchaseDate: Date;
  eventDescription: string;
  eventLocation: string;
}

export const mockPurchases: Purchase[] = [
  {
    id: 1,
    eventName: "Summer Music Festival",
    eventDate: new Date("2023-07-15"),
    tickets: [
      { type: "General Admission", quantity: 2, pricePerTicket: 50 },
      { type: "VIP", quantity: 1, pricePerTicket: 150 }
    ],
    totalPrice: 250,
    transactionStatus: 'Accepted',
    purchaseDate: new Date("2023-06-01"),
    eventDescription: "A three-day music festival featuring top artists from around the world.",
    eventLocation: "Sunshine Park, California"
  },
  {
    id: 2,
    eventName: "Tech Conference 2023",
    eventDate: new Date("2023-09-10"),
    tickets: [
      { type: "Standard", quantity: 1, pricePerTicket: 299 }
    ],
    totalPrice: 299,
    transactionStatus: 'In Process',
    purchaseDate: new Date("2023-08-15"),
    eventDescription: "Annual conference showcasing the latest in technology and innovation.",
    eventLocation: "Tech Center, New York"
  },
  {
    id: 3,
    eventName: "New Year's Eve Gala",
    eventDate: new Date("2023-12-31"),
    tickets: [
      { type: "Dinner & Dance", quantity: 2, pricePerTicket: 200 }
    ],
    totalPrice: 400,
    transactionStatus: 'Accepted',
    purchaseDate: new Date("2023-11-20"),
    eventDescription: "An elegant evening of fine dining, dancing, and celebrating the new year.",
    eventLocation: "Grand Hotel Ballroom, Las Vegas"
  },
  {
    id: 4,
    eventName: "Local Food Festival",
    eventDate: new Date("2023-08-05"),
    tickets: [
      { type: "Food Tasting Pass", quantity: 3, pricePerTicket: 45 }
    ],
    totalPrice: 135,
    transactionStatus: 'Rejected',
    purchaseDate: new Date("2023-07-25"),
    eventDescription: "A celebration of local cuisine featuring tastings from top area restaurants.",
    eventLocation: "City Center Plaza, Chicago"
  }
];

