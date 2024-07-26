import SidebarItem from "./item";
// import assignments from "../../data/assignments";
import { Plus } from 'lucide-react';
import { createAssignment, getAssignments, getUser } from '../../apis/api';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie, removeCookie } from "../../utils/cookie";

const SidebarList = (props) => {
  // const [assignmentsList, setAssignmentsList] = useState(assignments);
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
  const { isUserLoggedIn } = props
  // console.log('과제 리스트: ', assignmentsList)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    if (getCookie("access_token")) {
      fetchUser();
    }
  }, []);  

  useEffect(() => {
    const fetchAssignments = async () => {
        try {
          const assignments = await getAssignments(user);
          setAssignmentsList(assignments);
        } catch (error) {
          console.error('Error fetching assignments:', error);
        }
      }
    fetchAssignments()
  }, [isUserLoggedIn]);

  const addAssignment = async () => {
    try {
      const newAssignment = await createAssignment({
        name: '과제 이름'
      });
      setAssignmentsList([...assignmentsList, newAssignment]);
      navigate(`/${newAssignment.assignment_id}`);
    } catch (error) {
      console.error('Error creating assignment:', error);
    }
  }

  return (
    <div className="w-full h-screen">
      <div
        className="w-full px-2 py-2 rounded-md justify-between items-center gap-2.5 flex">
        <div className="text-left text-xl font-bold font-['Pretendard'] leading-normal pl-3 py-5">
          내 과제
        </div>
        <div className="justify-center items-center gap-2.5 flex">
          <Plus className="selection:w-[18px] h-[18px] relative cursor-pointer" onClick={addAssignment}/>
        </div>
      </div>
      <div className="w-full h-[650px] overflow-auto">
        {assignmentsList && (
        assignmentsList.map((assignment) => (
          <SidebarItem
            key={assignment.assignment_id}
            assignmentId={assignment.assignment_id}
            assignmentName={assignment.name}
            assignmentsList={assignmentsList}
          />
          ))
        )}
      </div>
      <div className="flex-col justify-start items-start gap-2.5 flex flex-1 overflow-hidden">
      </div>
    </div>
  );
};

export default SidebarList;
