import { CheckboxInTable } from "@/components/CheckboxInTable";
import { Header } from "@/components/Header";
import { PaginationBar } from "@/components/PaginationBar";
import { Searchbar } from "@/components/Searchbar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <Header />
      <Searchbar />
      <CheckboxInTable />
      <Button>Click me!</Button>
      <PaginationBar />
    </div>
  );
}
