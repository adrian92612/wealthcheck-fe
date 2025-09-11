type Props = {
  title: string;
  description: string;
  addForm?: React.ReactNode;
};

const PageHeader = ({ title, description, addForm }: Props) => {
  return (
    <div className="flex items-center gap-2 justify-between">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      {addForm && addForm}
    </div>
  );
};

export default PageHeader;
