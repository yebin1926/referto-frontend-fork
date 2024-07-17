import ReferenceItem from "./item";

const ReferenceList = ({
  referencesList,
  handleReferenceDelete,
  handleReferenceUpdate,
  findIndexofReference,
}) => {
  return (
    <div className="w-full">
      {referencesList.map((reference) => (
        <ReferenceItem
          key={reference.paperInfo_id}
          reference={reference}
          isVisible={true} //view 버튼 없어지게 하는 것
          handleReferenceDelete={handleReferenceDelete}
          handleReferenceUpdate={handleReferenceUpdate}
          findIndexofReference={findIndexofReference}
        />
      ))}
    </div>
  );
};

export default ReferenceList;
