import CurrentSummary from "@/components/Overview/CurrentSummary";
import RecentTransactions from "@/components/Overview/RecentTransactions";
import TopTransactions from "@/components/Overview/TopTransactions";

const Overview = () => {
  return (
    <div className="space-y-5 py-5">
      <CurrentSummary />
      <div className="grid xl:grid-cols-5 gap-5">
        <RecentTransactions />
        <TopTransactions />
      </div>
    </div>
  );
};

export default Overview;
