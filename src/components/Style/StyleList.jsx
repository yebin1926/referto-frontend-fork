import { useState } from "react";
import StyleItem from "./StyleItem";

const StyleList = ({
  selectedAssignmentId,
  selectedStyleName,
  setSelectedStyleName,
}) => {
  const styles = [
    { id: 1, name: "APA" },
    { id: 2, name: "MLA" },
    { id: 3, name: "Chicago" },
    { id: 4, name: "Vancouver" },
  ];

  return (
    <div className="flex flex-wrap flex-1 gap-4 sm:gap-7">
      {styles.map((style) => (
        <StyleItem
          key={style.id}
          styleName={style.name}
          selectedStyleName={selectedStyleName}
          setSelectedStyleName={setSelectedStyleName}
          selectedAssignmentId={selectedAssignmentId}
        />
      ))}
    </div>
  );
};

export default StyleList;
