import references from "../../data/references";
import ReferenceItem from "./item";

const ReferenceList = () => {
  const referencesList = references;

  return (
    <div>
      {referencesList.map((reference) => (
        <ReferenceItem
          key={reference.paperInfo_id}
          referenceId={reference.paperInfo_id}
          referenceName={reference.reference}
          isVisible={true} //view 버튼 없어지게 하는 것
        />
      ))}
    </div>
  );
};

export default ReferenceList;
