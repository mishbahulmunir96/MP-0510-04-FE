import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Purchase, Ticket } from "@/utils/customerData";
import { format } from "date-fns";

const PurchaseDetails = ({ purchase }: { purchase: Purchase | null }) => {
  if (!purchase) return null;

  return (
    <div className="mt-4 space-y-4">
      <div>
        <h3 className="font-semibold">Event Information</h3>
        <p>
          <strong>Name:</strong> {purchase.eventName}
        </p>
        <p>
          <strong>Date:</strong> {format(purchase.eventDate, "MMMM d, yyyy")}
        </p>
        <p>
          <strong>Location:</strong> {purchase.eventLocation}
        </p>
        <p>
          <strong>Description:</strong> {purchase.eventDescription}
        </p>
      </div>
      <div>
        <h3 className="font-semibold">Ticket Information</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price per Ticket</TableHead>
              <TableHead>Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchase.tickets.map((ticket: Ticket, index: number) => (
              <TableRow key={index}>
                <TableCell>{ticket.type}</TableCell>

                <TableCell>{ticket.quantity}</TableCell>
                <TableCell>${ticket.pricePerTicket.toFixed(2)}</TableCell>
                <TableCell>
                  ${(ticket.quantity * ticket.pricePerTicket).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <p>
          <strong>Total Price:</strong> ${purchase.totalPrice.toFixed(2)}
        </p>
        <p>
          <strong>Purchase Date:</strong>{" "}
          {format(purchase.purchaseDate, "MMMM d, yyyy")}
        </p>
        <p>
          <strong>Transaction Status:</strong> {purchase.transactionStatus}
        </p>
      </div>
    </div>
  );
};

export default PurchaseDetails;
