import ReferenceItem from "./ReferenceItem";

const ReferenceList = ({
  referencesList,
  setReferencesList,
  selectedStyleName,
}) => {
  return (
    <div className="w-full">
      {referencesList.map((reference, index) => (
        <ReferenceItem
          key={reference.paperInfo_id}
          reference={reference}
          selectedStyleName={selectedStyleName}
          index={index + 1}
          referencesList = {referencesList}
          setReferencesList={setReferencesList}
        />
      ))}
    </div>
  );
};

export default ReferenceList;
