import WalletFormDialog from "@/components/Wallet/WalletFormDialog";
import WalletList from "@/components/Wallet/WalletList";

const Wallet = () => {
  return (
    <div className="py-10 space-y-5">
      <WalletFormDialog />
      <WalletList />
    </div>
  );
};

export default Wallet;
