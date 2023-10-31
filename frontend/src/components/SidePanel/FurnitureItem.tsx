import { FurnitureDetails } from "../../shared/types";

const FurnitureItemStyles = {
  borderTop: 1,
  borderStyle: "solid",
  borderColor: "#e5e5e5",
};

interface FurnitureItemProps {
  details: FurnitureDetails;
}

const FurnitureItem = ({ details }: FurnitureItemProps) => {
  const { name, x, y, price, imgSrc } = details;
  return (
    <div
      style={FurnitureItemStyles}
      className="flex w-full h-min bg-stone-100 p-4"
    >
      <img className="h-16 w-16 hover:cursor-grab" src={imgSrc} alt="" />
      <div className="flex-col ml-4">
        <div className="font-bold">{name}</div>
        <div className="text-sm">
          {x} x {y}
        </div>
        <div className="text-sm text-emerald-600">${price}</div>
      </div>
    </div>
  );
};

export default FurnitureItem;
