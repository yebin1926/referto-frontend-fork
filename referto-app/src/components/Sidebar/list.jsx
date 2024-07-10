import { useState } from "react";
import SidebarItem from "./item";
import assignments from "../../data/assignments";
import { Plus } from 'lucide-react';

const SidebarList = () => {
  const [assignmentsList, setAssignmentsList] = useState(assignments);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(1);
  const addAssignment = () => {
    const newAssignment = {
      assignment_id: assignmentsList.length + 1, 
      name: "untitled",
      user_id: "d"    
    }
    setAssignmentsList([...assignmentsList, newAssignment]);
  };
  const handleAssignmentDelete = (assignmentId) => {
    alert('Do you really want to delete?');
    setAssignmentsList(assignmentsList.filter((assignment) => assignment.assignment_id !== assignmentId));
  };
  const handleAssignmentUpdate = (assignmentId, newName) => {
    setAssignmentsList(assignmentsList.map((assignment) => {
      if (assignment.assignment_id === assignmentId) {
        return {...assignments, name: newName};
      } return assignment;
    }));
  };
  return (
    <div className="w-full">
      <div
        className={`px-4 py-2  rounded-md justify-center items-center gap-2.5 flex`}>
        <div className="text-right  text-lg font-light font-['Pretendard'] leading-normal">
          My Assignment
        </div>
        <div className="justify-center items-center gap-2.5 flex">
          <Plus className=" selection:w-[18px] h-[18px] relative cursor-pointer" onClick={addAssignment}/>
        </div>
      </div>
      {assignmentsList.map((assignment) => (
        <SidebarItem
          key={assignment.assignment_id}
          assignmentId={assignment.assignment_id}
          assignmentName={assignment.name}
          selectedAssignmentId={selectedAssignmentId}
          setSelectedAssignmentId={setSelectedAssignmentId}
          handleAssignmentDelete={handleAssignmentDelete}
          handleAssignmentUpdate={handleAssignmentUpdate}
        />
      ))}
    </div>
  );
};

export default SidebarList;
