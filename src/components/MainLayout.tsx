interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="max-w-3xl w-full flex flex-col mx-auto gap-12 mt-12 h-full">
      {children}
    </div>
  );
};
