import SidebarItem from "./item";
// import assignments from "../../data/assignments";
import { Plus } from 'lucide-react';
import { createAssignment, getAssignments, getUser } from '../../apis/api';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie, removeCookie } from "../../utils/cookie";

const SidebarList = () => {
  // const [assignmentsList, setAssignmentsList] = useState(assignments);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(1);
  // const addAssignment = () => {
  //   const newAssignment = {
  //     assignment_id: Math.random(), 
  //     name: "untitled",
  //     user_id: "d"    
  //   }
  //   setAssignmentsList([...assignmentsList, newAssignment]);
  // };
  // const handleAssignmentDelete = (assignmentId) => {
  //   if (assignmentsList.length === 1) {
  //     alert("Cannot delete the last remaining assignment.");
  //   } else {
  //     if (window.confirm('Do you really want to delete?')) {
  //       setAssignmentsList(assignmentsList.filter((assignment) => assignment.assignment_id !== assignmentId));
  //     }
  //   }
  // };
  // const handleAssignmentUpdate = (assignmentId, newName) => {
  //   setAssignmentsList(assignmentsList.map((assignment) => {
  //     if (assignment.assignment_id === assignmentId) {
  //       return {...assignments, name: newName};
  //     } return assignment;
  //   }));
  // };


  const navigate = useNavigate()
  const [user, setUser] = useState()
  const [assignmentsList, setAssignmentsList] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      if (getCookie("access_token")) {
        try {
          const userData = await getUser();
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    };
    fetchUser();
  }, []);


  useEffect(() => {
    const fetchAssignments = async () => {
      if (user) {
        try {
          const assignments = await getAssignments(user);
          setAssignmentsList(assignments);
        } catch (error) {
          console.error('Error fetching assignments:', error);
        }
      }
    };
    fetchAssignments();
  }, [user]);

  const addAssignment = async () => {
    try {
      const newAssignment = await createAssignment('untitled');
      setAssignmentsList([...assignmentsList, newAssignment]);
      navigate(`/assignments/${newAssignment.assignment_id}`);
    } catch (error) {
      console.error('Error creating assignment:', error);
    }
  };


  return (
    <div className="w-full">
      <div
        className={`px-4 py-2  rounded-md justify-center items-center gap-2.5 flex`}>
        <div className="text-right text-lg font-light font-['Pretendard'] leading-normal">
          My Assignments
        </div>
        <div className="justify-center items-center gap-2.5 flex">
          <Plus className="selection:w-[18px] h-[18px] relative cursor-pointer" onClick={addAssignment}/>
        </div>
      </div>
      {assignmentsList.map((assignment) => (
        <SidebarItem
          key={assignment.assignment_id}
          assignmentId={assignment.assignment_id}
          assignmentName={assignment.name}
          assignmentsList={assignmentsList}
          selectedAssignmentId={selectedAssignmentId}
          setSelectedAssignmentId={setSelectedAssignmentId}
          // handleAssignmentDelete={handleAssignmentDelete}
          // handleAssignmentUpdate={handleAssignmentUpdate}
        />
      ))}
    </div>
  );
};

export default SidebarList;
