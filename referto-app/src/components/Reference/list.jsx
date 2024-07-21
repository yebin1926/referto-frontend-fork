import ReferenceItem from "./item";

const ReferenceList = ({
  referencesList,
  // handleReferenceDelete,
  // handleReferenceUpdate,
  // findIndexofReference,
  selectedStyleName,
}) => {

  return (
    <div className="w-full">
      {console.log("referencesList:", referencesList)}
      {console.log('reference list에서 확인하는 스타일 이름:', selectedStyleName)}
      {referencesList.map((reference, index) => (
        <ReferenceItem
          key={reference.paperInfo_id}
          reference={reference}
          isVisible={true} //view 버튼 없어지게 하는 것
          // handleReferenceDelete={handleReferenceDelete}
          // handleReferenceUpdate={handleReferenceUpdate}
          // findIndexofReference={findIndexofReference}
          selectedStyleName={selectedStyleName}
          index={index + 1}
        />
      ))}
    </div>
  );
};

export default ReferenceList;
