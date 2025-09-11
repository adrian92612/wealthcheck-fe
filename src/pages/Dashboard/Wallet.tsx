import PageHeader from "@/components/dashboard/PageHeader";
import WalletFormDialog from "@/components/Wallet/WalletFormDialog";
import WalletList from "@/components/Wallet/WalletList";

const Wallet = () => {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Wallets"
        description="Manage your wallets to keep track of balances and organize your financial accounts. Add new wallets to stay on top of your money."
        addForm={<WalletFormDialog />}
      />
      <WalletList />
    </div>
  );
};

export default Wallet;
