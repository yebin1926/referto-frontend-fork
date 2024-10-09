import { useState } from "react";
import StyleItem from "./item";

const StyleList = ({
  selectedAssignmentId,
  selectedStyleName,
  setSelectedStyleName,
  darkMode,
}) => {
  const styles = [
    { id: 1, name: "APA" },
    { id: 2, name: "MLA" },
    { id: 3, name: "Chicago" },
    { id: 4, name: "Vancouver" },
  ];

  return (
    <div className="flex flex-1 gap-7">
      {styles.map((style) => (
        <StyleItem
          key={style.id}
          // styleId={style.id}
          styleName={style.name}
          selectedStyleName={selectedStyleName}
          setSelectedStyleName={setSelectedStyleName}
          // selectedStyleId={selectedStyleId}
          // setSelectedStyleId={setSelectedStyleId}
          selectedAssignmentId={selectedAssignmentId}
          darkMode={darkMode}
        />
      ))}
    </div>
  );
};

export default StyleList;
