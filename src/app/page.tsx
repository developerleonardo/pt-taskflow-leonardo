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
      <main className="grid grid-rows-[1fr_auto] justify-center items-center">
        <MainLayout>
          <CheckboxInTable />
          <Button>Click me!</Button>
          <AddToDoDialog />
        </MainLayout>
        <PaginationBar />
      </main>
    </>
  );
}
