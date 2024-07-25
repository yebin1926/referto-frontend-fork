import dotDark from "../../assets/images/dot-dark.svg";
import dotLight from "../../assets/images/dot-light.svg";
import { Link, useParams, useNavigate} from "react-router-dom";
import { EllipsisVertical  } from 'lucide-react';
import { useState, useRef, useEffect } from "react";
import AssignmentModal from "../Modals/AssignmentModal";
import { updateAssignment, deleteAssignment } from '../../apis/api';
import DeleteConfirmModal from "../Modals/DeleteConfirmModal";


const SidebarItem = ({
  assignmentId,
  assignmentName,
  assignmentsList
}) => {

  const [isEdit, setIsEdit] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [content, setContent] = useState(assignmentName);
  const [onChangeValue, setOnChangeValue] = useState(content);
  const ref = useRef(null);
  const renameRef = useRef(null);
  const navigate = useNavigate()
  const { assignmentId: selectedAssignmentIdString } = useParams();
  const selectedAssignmentId = Number(selectedAssignmentIdString)

  document.body.style.overflow = 'hidden';

  const handleAssignment = () => {
    // console.log("handleAssignment 함수가 호출됨");
    if (ref.current) {
      // console.log("ref.current입니다.")
      const rect = ref.current.getBoundingClientRect();
      setModalPosition({top: rect.bottom, left: rect.left});
      setIsOpen(true);
    } else {
      // console.log("ref.current가 아닙니다.");
      // console.log(ref.current);
    }
  }

  const handleEditAssignment = async() => {
    if (onChangeValue.trim().length < 1) {
      alert("Assignment name must be at least 1 character long!");
      setTimeout(() => {
        if (renameRef.current) {
          renameRef.current.focus();
        }
      }, 0); // Set a timeout to ensure it runs after the alert is dismissed
      return;
    }
    setIsEdit(false)
    setIsOpen(false)
    try {
      const data = await updateAssignment(selectedAssignmentId , {name: onChangeValue});
      console.log('Assignment name updated successfully:', data);
      setContent(data.name)
    } catch (error) {
      console.error('Error updating assignment name:', error);
    }
  };

  const handleDeleteAssignment = async() => {
    const currentIndex = assignmentsList.findIndex((elem) => elem.assignment_id === assignmentId)

    // setIsOpen(!isOpen)

    if (assignmentsList.length === 1) {
      alert("Cannot delete the last remaining assignment.");
      return ;
    } 

    try {
      await deleteAssignment(assignmentId);
      console.log('Assignment deleted successfully');

      if ((currentIndex + 1) === assignmentsList.length) {
        window.location.href = (`/${assignmentsList[currentIndex - 1].assignment_id}`)
      } else {
        window.location.href = (`/${assignmentsList[currentIndex + 1].assignment_id}`)
      }
    } catch (error) {
      console.error('Error deleting assignment:', error);
    }
  };

  const handleDeleteAssignmentCancel = () => {
    setDeleteModalIsOpen(false);
    return; 
  }

  useEffect(() => {
    const handleClickOutsideRename = (event) => {
      if (renameRef.current && !renameRef.current.contains(event.target)) {
        handleEditAssignment();
      }
    };
    document.addEventListener('mousedown', handleClickOutsideRename);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideRename);
    }
  },);

  useEffect(() => {
    if (isEdit && renameRef.current) {
      renameRef.current.focus();
      renameRef.current.select();
    }
  }, [isEdit]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleEditAssignment();
    }
  };

  return (
    <div
      id="item"
      className="rounded flex items-center justify-start gap-1.5 px-3.5 py-1.5 self-stretch w-full flex-[0_0_auto] overflow-hidden"
    >
      {selectedAssignmentId === assignmentId ? (
        <div className="bg-neutral-300 rounded-[20px] flex items-center justify-start gap-1.5 px-3.5 py-2 self-stretch w-full flex-[0_0_auto] overflow-hidden">
          <img alt="dot" src={dotDark} className="h-1.5 w-1.5 flex-none" />
          <div className="font-medium text-neutral-700 leading-6 text-lg tracking-0 truncate">
          {isEdit ? (
            <input
              className="border text-neutral-700 w-full"
              value={onChangeValue}
              onChange={(e) => setOnChangeValue(e.target.value)}
              onKeyDown={handleKeyDown}
              ref={renameRef}
              minLength="1"
              required
            />
          ) : (
            content
          )}
          </div>
          <div className="flex-grow"></div>
          <div className="flex-none">
            <EllipsisVertical  
              className="text-neutral-700 selection:w-[18px] h-[18px] cursor-pointer" 
              onClick={handleAssignment} 
              ref={ref}/>
          </div>
        </div>
      ) : (
        <Link
          to={`/${assignmentId}`}
          className="rounded flex items-center justify-start gap-1.5 px-3.5 py-2 w-full truncate"
        >
          <img alt="dot" src={dotLight} className="h-1.5 w-1.5 flex-none" />
          <div className="font-medium text-neutral-400 leading-6 text-lg tracking-0 truncate">
            {content}
          </div>
        </Link>
      )}
      {isOpen && <AssignmentModal 
        assignmentId={assignmentId} 
        position={modalPosition}
        handleEditAssignment={handleEditAssignment} 
        setDeleteModalIsOpen={setDeleteModalIsOpen}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        setIsOpen={setIsOpen}/>}
      {deleteModalIsOpen && <DeleteConfirmModal 
        handleDelete={handleDeleteAssignment}
        handleDeleteCancel={handleDeleteAssignmentCancel}
     />}
    </div>
  );
};

export default SidebarItem;
