import CurrentSummary from "@/components/Overview/CurrentSummary";
import RecentTransactions from "@/components/Overview/RecentTransactions";
import TopTransactions from "@/components/Overview/TopTransactions";

const Overview = () => {
  return (
    <div className="min-h-[200dvh]">
      <CurrentSummary />
      <RecentTransactions />
      <TopTransactions />
    </div>
  );
};

export default Overview;
