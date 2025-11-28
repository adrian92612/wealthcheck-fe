import PageHeader from "@/components/dashboard/PageHeader";
import Budget from "@/components/Overview/Budget";
import CurrentSummary from "@/components/Overview/CurrentSummary";
import DailyNet from "@/components/Overview/DailyNet";
import MoneyGoal from "@/components/Overview/MoneyGoal";
import RecentTransactions from "@/components/Overview/RecentTransactions";
import TopCategories from "@/components/Overview/TopCategories";
import TopTransactions from "@/components/Overview/TopTransactions";

const Overview = () => {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Overview"
        description="Get a snapshot of your finances, including current balances, recent transactions, and top spending categories."
      />

      <div className="grid gap-5 lg:grid-cols-3 lg:items-start">
        <div className="flex flex-col gap-5 lg:col-span-2">
          <CurrentSummary />
          <div className="grid gap-5 lg:grid-cols-2">
            <MoneyGoal />
            <Budget />
          </div>
          <DailyNet />
          <TopCategories />
        </div>
        <div className="flex flex-col gap-5">
          <RecentTransactions />
          <TopTransactions />
        </div>
      </div>
    </div>
  );
};

export default Overview;
