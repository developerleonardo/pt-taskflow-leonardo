import { AddToDoDialog } from "@/components/AddToDoDialog";
import { CheckboxInTable } from "@/components/CheckboxInTable";
import { Header } from "@/components/Header";
import { MainLayout } from "@/components/MainLayout";
import { PaginationBar } from "@/components/PaginationBar";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col">
        <MainLayout>
          <CheckboxInTable />
        </MainLayout>
      </main>
      <PaginationBar />
      <AddToDoDialog />
    </>
  );
}
