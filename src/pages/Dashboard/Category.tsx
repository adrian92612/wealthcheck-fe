import CategoryFormDialog from "@/components/Category/CategoryFormDialog";
import CategoryList from "@/components/Category/CategoryList";
import PageHeader from "@/components/dashboard/PageHeader";

const Category = () => {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Categories"
        description="Manage income and expense categories to organize your transactions."
        addForm={<CategoryFormDialog />}
      />
      <CategoryList />
    </div>
  );
};

export default Category;
