import { AddToDoDialog } from "@/components/AddToDoDialog";
import { CheckboxInTable } from "@/components/CheckboxInTable";
import { Header } from "@/components/Header";
import { MainLayout } from "@/components/MainLayout";
import { PaginationBar } from "@/components/PaginationBar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col justify-center items-center">
        <MainLayout>
          <CheckboxInTable />
          <Button>Click me!</Button>
          <AddToDoDialog />
        </MainLayout>
      </main>
      <PaginationBar />
    </>
  );
}
