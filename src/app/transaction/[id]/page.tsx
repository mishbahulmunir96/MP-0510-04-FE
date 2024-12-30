import TransactionDetailPage from "@/features/transaction";

const TransactionDetail = ({ params }: { params: { id: string } }) => {
  return <TransactionDetailPage transactionId={Number(params.id)} />;
};

export default TransactionDetail;
