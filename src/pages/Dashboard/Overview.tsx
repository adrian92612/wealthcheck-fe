import PageHeader from "@/components/dashboard/PageHeader";
import CurrentSummary from "@/components/Overview/CurrentSummary";
import RecentTransactions from "@/components/Overview/RecentTransactions";
import TopTransactions from "@/components/Overview/TopTransactions";

const Overview = () => {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Overview"
        description="Get a snapshot of your finances, including current balances, recent transactions, and top spending categories."
      />
      <CurrentSummary />
      <div className="grid xl:grid-cols-5 gap-5">
        <RecentTransactions />
        <TopTransactions />
      </div>
    </div>
  );
};

export default Overview;
