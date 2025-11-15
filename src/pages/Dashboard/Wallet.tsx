import PageHeader from "@/components/dashboard/PageHeader";
import WalletFormDialog from "@/components/Wallet/WalletFormDialog";
import WalletList from "@/components/Wallet/WalletList";
import { useAuth } from "@/hooks/useAuth";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

const Wallet = () => {
  const { user, refreshUser } = useAuth();
  const [openWelcomeAlert, setOpenWelcomeAlert] = useState(
    user?.isNewUser || false
  );
  const [openWalletForm, setOpenWalletForm] = useState(false);
  const handleAlertBtn = () => setOpenWalletForm(true);

  return (
    <div className="space-y-5">
      <AlertDialog open={openWelcomeAlert} onOpenChange={setOpenWelcomeAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Welcome to WealthCheck!</AlertDialogTitle>
            <AlertDialogDescription>
              You're all set to take control of your finances. Let’s start by
              creating your first wallet — this will help you track your
              balances, manage your expenses, and reach your financial goals
              faster.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleAlertBtn}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <PageHeader
        title="Wallets"
        description="Manage your wallets to keep track of balances and organize your financial accounts. Add new wallets to stay on top of your money."
        addForm={
          <WalletFormDialog
            open={openWalletForm}
            onOpenChange={setOpenWalletForm}
            refreshUser={refreshUser}
          />
        }
      />
      <WalletList />
    </div>
  );
};

export default Wallet;
