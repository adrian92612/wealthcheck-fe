"use client";

import { useState } from "react";

import {
  LucideCreditCard,
  LucideTag,
  LucideWallet,
  Trash2,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransactionList from "@/components/transaction/TransactionList";
import { TrashContext } from "@/hooks/useIsTrash";
import WalletList from "@/components/Wallet/WalletList";
import CategoryList from "@/components/Category/CategoryList";

const tabs = [
  {
    name: "Transactions",
    icon: LucideCreditCard,
    content: <TransactionList />,
  },
  {
    name: "Wallet",
    icon: LucideWallet,
    content: <WalletList />,
  },
  {
    name: "Category",
    icon: LucideTag,
    content: <CategoryList />,
  },
];

const Trash = () => {
  const [activeTab, setActiveTab] = useState("Transactions");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="gap-4">
      <TabsList className="h-auto gap-2 rounded-xl p-2">
        {tabs.map(({ icon: Icon, name }, i) => {
          const isActive = activeTab === name;

          return (
            <div
              key={i}
              className="flex h-8 items-center justify-center overflow-hidden rounded-md cursor-pointer"
              onClick={() => setActiveTab(name)}
            >
              <TabsTrigger value={name} asChild>
                <div className="flex h-8 w-full items-center justify-center gap-1">
                  <Icon className="aspect-square size-4 flex-shrink-0 transition-opacity duration-200" />
                  {isActive && (
                    <span className="font-medium transition-all duration-200">
                      {name}
                    </span>
                  )}
                </div>
              </TabsTrigger>
            </div>
          );
        })}
      </TabsList>

      {tabs.map((tab, i) => (
        <TabsContent key={i} value={tab.name}>
          <TrashContext.Provider value={{ forSoftDeleted: true }}>
            <div className="flex items-center justify-center gap-2 rounded-lg bg-amber-100 border border-amber-400 px-4 py-3 mb-5 text-red-600 font-semibold">
              <Trash2 size={18} /> Deleted Items
            </div>
            {tab.content}
          </TrashContext.Provider>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default Trash;
