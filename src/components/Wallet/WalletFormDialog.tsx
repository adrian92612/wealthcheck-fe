import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import WalletForm from "./WalletForm";

const WalletFormDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Wallet</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Wallet</DialogTitle>
          <DialogDescription className="sr-only">Add Wallet</DialogDescription>
        </DialogHeader>
        <WalletForm />
      </DialogContent>
    </Dialog>
  );
};

export default WalletFormDialog;
