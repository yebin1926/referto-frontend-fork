import SidebarItem from "./SidebarItem";
// import assignments from "../../data/assignments";
import { Plus } from 'lucide-react';
import { createAssignment, getAssignments, getUser } from '../../apis/api';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie, removeCookie } from "../../utils/cookie";
import { trackEvent } from '../../utils/analytics';

const SidebarList = (props) => {
  const navigate = useNavigate()
  const [user, setUser] = useState()
  const [assignmentsList, setAssignmentsList] = useState([]);
  const { isUserLoggedIn } = props

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        throw error;
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
          throw error;
        }
      }
    fetchAssignments()
  }, [isUserLoggedIn]);

  const addAssignment = async () => {
    try {
      const newAssignment = await createAssignment({
        name: 'untitled'
      });
      trackEvent('create_assignment', { 
        assignment_id: newAssignment.assignment_id 
      });
      setAssignmentsList([...assignmentsList, newAssignment]);
      navigate(`/${newAssignment.assignment_id}`);
    } catch (error) {
      throw error;
    }
  }

  return (
    <div className="w-full h-screen">
      <div className="w-full px-1.5 sm:px-2 py-1.5 sm:py-2 rounded-md justify-between items-center gap-2 sm:gap-2.5 flex">
        <div className="text-left text-lg sm:text-xl font-bold font-['Pretendard'] leading-normal pl-2 sm:pl-3 py-3 sm:py-5">
          내 과제
        </div>
        <div className="justify-center items-center gap-2 sm:gap-2.5 flex">
          <Plus className="w-4 sm:w-[18px] h-4 sm:h-[18px] relative cursor-pointer" onClick={addAssignment}/>
        </div>
      </div>
      <div className="w-full h-[550px] sm:h-[650px] overflow-auto">
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
    </div>
  );
};

export default SidebarList;
