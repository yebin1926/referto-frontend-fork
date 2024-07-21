import { updateAssignment } from "../../apis/api.js"

const StyleItem = ({
  // styleId,
  styleName,
  selectedStyleName, 
  setSelectedStyleName,
  selectedAssignmentId,
}) => {
  const handleSelect = async () => {
    try {
      const data = await updateAssignment(selectedAssignmentId, {reference_type: styleName});
      console.log('Assignment reference_type updated successfully:', data);
      window.location.reload()
      setSelectedStyleName(styleName);
    } catch (error) {
      console.error('Error updating assignment reference_type:', error);
    }
  };

  return (
    <div className="justify-start items-center gap-2 flex">
      {selectedStyleName === styleName ? (
        <div className="relative">
          <div className="w-4 h-4 rounded-full border border-neutral-500" />
          <div className="w-2 h-2 left-[4px] top-[4px] absolute bg-neutral-900 rounded-full border border-neutral-500" />
        </div>
      ) : (
        <div
          className="w-4 h-4 rounded-full border border-neutral-500"
          onClick={handleSelect}
        />
      )}
      <div className="text-neutral-900 text-lg font-medium font-['Pretendard'] leading-[14px]">
        {styleName}
      </div>
    </div>
  );
};

export default StyleItem;
