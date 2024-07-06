import { useState } from "react";
import SidebarItem from "./item";
import assignments from "../../data/assignments";

const SidebarList = () => {
  const assignmentsList = assignments;
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(1);

  return (
    <div className="w-full">
      {assignmentsList.map((assignment) => (
        <SidebarItem
          key={assignment.assignment_id}
          assignmentId={assignment.assignment_id}
          assignmentName={assignment.name}
          selectedAssignmentId={selectedAssignmentId}
          setSelectedAssignmentId={setSelectedAssignmentId}
        />
      ))}
    </div>
  );
};

export default SidebarList;
