import { AddToDoDialog } from "@/components/AddToDoDialog";
import { CheckboxInTable } from "@/components/CheckboxInTable";
import { Header } from "@/components/Header";
import { MainLayout } from "@/components/MainLayout";
import { PaginationBar } from "@/components/PaginationBar";

export default function Home() {
  return (
    <>
      <Header />
      <main className="grid grid-cols-1 grid-rows-[1fr_auto]">
        <MainLayout>
          <CheckboxInTable />
        </MainLayout>
        <PaginationBar />
      </main>
      <AddToDoDialog />
    </>
  );
}
