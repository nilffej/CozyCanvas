import { FurnitureDetails } from "../../shared/types";
import FurnitureItem from "./FurnitureItem";

const FurnitureList = ({ items }: { items: FurnitureDetails[] }) => {
  return (
    <div className="flex-col">
      {items.map((details) => (
        <FurnitureItem key={details.name} details={details}></FurnitureItem>
      ))}
    </div>
  );
};

export default FurnitureList;
