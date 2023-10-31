import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useEffect, useState } from "react";

import { FurnitureDetails } from "../../shared/types";
import FurnitureList from "./FurnitureList";
import { TESTDATA } from "../../shared/testdata";

const AccordionStyles = {
  boxShadow: "none",
  borderBottom: 1,
  borderColor: "#e5e5e5",
  "&:before": {
    display: "none",
  },
};

type CategorizedFurniture = [
  {
    category: string;
    items: FurnitureDetails[];
  }
];

const SidePanel = () => {
  const [data, setData] = useState<CategorizedFurniture>();
  const [expanded, setExpanded] = useState<string>();

  useEffect(() => {
    const response = TESTDATA as CategorizedFurniture;
    setData(response);
  }, []);

  const handlePanelClick = (category: string) => {
    category === expanded ? setExpanded("") : setExpanded(category);
  };

  return (
    <div className="fixed bg-white h-screen w-[22rem]">
      <div className="relative text-xl font-semibold flex items-center p-4 text-stone-600 shadow-md z-10">
        CozyCanvas
      </div>
      <div className="relative z-0">
        {data?.map(({ category, items }) => (
          <Accordion
            square
            disableGutters
            key={category}
            sx={AccordionStyles}
            expanded={expanded === category}
            onChange={() => handlePanelClick(category)}
          >
            <AccordionSummary>
              <div className="text-lg py-2">{category}</div>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0 }}>
              <div className="shadow-inner">
                <FurnitureList items={items} />
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default SidePanel;
