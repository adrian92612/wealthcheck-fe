import type { Transaction } from "@/lib/types";
import TransactionCard from "./TransactionCard";

const noTransactionsExistMessages = [
  "All quiet here… your money is behaving.",
  "Your ledger is spotless. Keep it up!",
  "Nothing to see… your wallets are lonely.",
];

const noTransactionsForFilterMessages = [
  "No transactions match your filter. Try adjusting it.",
  "Zero results… maybe broaden your search?",
  "Your filter is strict! No transactions found.",
];

type Props = {
  transactions: Transaction[];
  totalItems: number;
};

const TransactionCardsBlock = ({ transactions, totalItems }: Props) => {
  const messages =
    totalItems === 0
      ? noTransactionsExistMessages
      : noTransactionsForFilterMessages;

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  return (
    <div className="space-y-3">
      {transactions.length ? (
        transactions.map((tx) => <TransactionCard key={tx.id} tx={tx} />)
      ) : (
        <div className="text-center h-10 font-bold"> {randomMessage} </div>
      )}
    </div>
  );
};

export default TransactionCardsBlock;
