import references from "../../data/references";
import ReferenceItem from "./item";
import { useState } from "react";

const ReferenceList = () => {
  const [referencesList, setReferencesList] = useState(references);
  const handleReferenceDelete = (referenceId) => {
    alert('Do you really want to delete?')
    setReferencesList(referencesList.filter((reference) => reference.paperInfo_id !== referenceId));
  }
  return (
    <div>
      {referencesList.map((reference) => (
        <ReferenceItem
          key={reference.paperInfo_id}
          referenceId={reference.paperInfo_id}
          referenceName={reference.reference}
          isVisible={true}
          handleReferenceDelete={handleReferenceDelete}
        />
      ))}
    </div>
  );
};

export default ReferenceList;
