import references from "../../data/references";
import ReferenceItem from "./item";

const ReferenceList = () => {
  const referencesList = references;

  return (
    <div className="w-full">
      {referencesList.map((reference) => (
        <ReferenceItem
          key={reference.paperInfo_id}
          referenceId={reference.paperInfo_id}
          referenceName={reference.reference}
        />
      ))}
    </div>
  );
};

export default ReferenceList;
