import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";

export function Searchbar() {
  return (
    <InputGroup className="max-w-xs">
      <InputGroupInput
        placeholder="Search..."
        className="placeholder:text-neutral-300 text-neutral-50"
      />
      <InputGroupAddon className="text-neutral-300">
        <Search />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end" className="text-neutral-300">
        12 results
      </InputGroupAddon>
    </InputGroup>
  );
}
