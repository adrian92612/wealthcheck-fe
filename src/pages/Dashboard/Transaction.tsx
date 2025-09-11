import PageHeader from "@/components/dashboard/PageHeader";
import TransactionFormDialog from "@/components/transaction/TransactionFormDialog";
import TransactionList from "@/components/transaction/TransactionList";

const Transaction = () => {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Transactions"
        description="View, track, and manage all your income and expense records. Add new transactions to keep your finances up to date."
        addForm={<TransactionFormDialog />}
      />
      <TransactionList />
    </div>
  );
};

export default Transaction;
