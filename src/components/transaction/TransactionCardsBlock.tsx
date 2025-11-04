import type { Transaction } from "@/lib/types";
import {
  noTransactionsExistMessages,
  noTransactionsForFilterMessages,
} from "@/constants/constants";
import TransactionCard from "./TransactionCard";

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
