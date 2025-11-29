type Props = {
  title: string;
  description: string;
  addForm?: React.ReactNode;
};

const PageHeader = ({ title, description, addForm }: Props) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-primary pb-4 gap-4">
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
        <p className="text-muted-foreground text-base max-w-2xl">
          {description}
        </p>
      </div>
      {addForm && <div className="shrink-0">{addForm}</div>}
    </div>
  );
};
export default PageHeader;
