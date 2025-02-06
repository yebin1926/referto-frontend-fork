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
      setSelectedStyleName(styleName);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="justify-start items-center gap-1.5 sm:gap-2 flex">
      {selectedStyleName === styleName ? (
        <div className="relative">
          <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border border-neutral-500" />
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 left-[4px] top-[4px] absolute bg-neutral-900 rounded-full border border-neutral-500" />
        </div>
      ) : (
        <div
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border border-neutral-500"
          onClick={handleSelect}
        />
      )}
      <div className="text-neutral-900 text-base sm:text-lg font-medium font-['Pretendard'] leading-[14px]">
        {styleName}
      </div>
    </div>
  );
};

export default StyleItem;
