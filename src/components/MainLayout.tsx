interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return <section className="max-w-3xl flex flex-col">{children}</section>;
};
