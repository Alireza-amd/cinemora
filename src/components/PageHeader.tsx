type PageHeaderProps = {
  children: React.ReactNode;
  buttonSection?: React.ReactNode;
  subtitle?: React.ReactNode;
};

export function PageHeader({
  children,
  buttonSection,
  subtitle,
}: PageHeaderProps) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <h1
        className={`text-2xl md:text-3xl lg:text-4xl gap-8 font-bold ${subtitle ? "mb-4" : "mb-8"}`}
      >
        {children}
        {subtitle && (
          <div className="text-sm md:text-lg lg:text-xl  font-normal text-muted-foreground">
            {subtitle}
          </div>
        )}
      </h1>
      {buttonSection && <div className="text-2xl grow">{buttonSection}</div>}
    </div>
  );
}
