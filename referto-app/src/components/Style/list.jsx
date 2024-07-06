import { useState } from "react";
import StyleItem from "./item";

const styles = [
  { id: 1, name: "APA" },
  { id: 2, name: "MLA" },
  { id: 3, name: "Chicago" },
  { id: 4, name: "Vancouver" },
];

const StyleList = () => {
  const [selectedStyleId, setSelectedStyleId] = useState(1);

  return (
    <div className="flex flex-1 gap-7">
      {styles.map((style) => (
        <StyleItem
          styleId={style.id}
          styleName={style.name}
          selectedStyleId={selectedStyleId}
          setSelectedStyleId={setSelectedStyleId}
        />
      ))}
    </div>
  );
};

export default StyleList;
