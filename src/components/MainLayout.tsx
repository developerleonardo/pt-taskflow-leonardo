interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <section className="max-w-3xl w-full flex flex-col mx-auto">
      {children}
    </section>
  );
};
