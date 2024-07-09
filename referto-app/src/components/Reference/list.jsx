import references from "../../data/references";
import ReferenceItem from "./item";
import { useState, useEffect } from "react";

const ReferenceList = ({ getAllReferences }) => {
  const [referencesList, setReferencesList] = useState(references);
  useEffect(() => {
    getAllReferences(referencesList.map(ref => ref.reference));
  }, [referencesList, getAllReferences]);
  const handleReferenceDelete = (referenceId) => {
    alert('Do you really want to delete?')
    setReferencesList(referencesList.filter((reference) => reference.paperInfo_id !== referenceId));
  }
  const handleReferenceUpdate = (referenceId, newContent) => {
    setReferencesList(referencesList.map((reference) => {
      if (reference.paperInfo_id === referenceId) {
        return {...reference, reference: newContent};
      } return reference;
    }));
  };
  return (
    <div>
      {referencesList.map((reference) => (
        <ReferenceItem
          key={reference.paperInfo_id}
          referenceId={reference.paperInfo_id}
          referenceName={reference.reference}
          isVisible={true} //view 버튼 없어지게 하는 것
          handleReferenceDelete={handleReferenceDelete}
          handleReferenceUpdate={handleReferenceUpdate}
        />
      ))}
    </div>
  );
};

export default ReferenceList;
