import { AddToDoDialog } from "@/components/AddToDoDialog";
import { CheckboxInTable } from "@/components/CheckboxInTable";
import { Header } from "@/components/Header";
import { MainLayout } from "@/components/MainLayout";
import { PaginationBar } from "@/components/PaginationBar";
import { TodoInitializer } from "@/components/TodoInitializer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col">
        <MainLayout>
          <TodoInitializer />
          <CheckboxInTable />
        </MainLayout>
      </main>
      <PaginationBar />
      <AddToDoDialog />
    </>
  );
}
