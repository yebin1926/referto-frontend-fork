import dotDark from "../../assets/images/dot-dark.svg";
import dotLight from "../../assets/images/dot-light.svg";
import { Link, useParams, useNavigate} from "react-router-dom";
import { Ellipsis } from 'lucide-react';
import { useState, useRef, useEffect } from "react";
import AssignmentModal from "../Modals/AssignmentModal";
import { updateAssignment, deleteAssignment } from '../../apis/api';


const SidebarItem = ({
  assignmentId,
  assignmentName,
  assignmentsList
}) => {

  const [isEdit, setIsEdit] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [content, setContent] = useState(assignmentName);
  const [onChangeValue, setOnChangeValue] = useState(content);
  const ref = useRef(null);
  const navigate = useNavigate()
  const { assignmentId: selectedAssignmentIdString } = useParams();
  const selectedAssignmentId = Number(selectedAssignmentIdString)

  const handleAssignment = () => {
    console.log("handleAssignment 함수가 호출됨");
    if (ref.current) {
      console.log("ref.current입니다.")
      const rect = ref.current.getBoundingClientRect();
      setModalPosition({top: rect.bottom, left: rect.left});
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    } else {
      console.log("ref.current가 아닙니다.");
      console.log(ref.current);
    }
  }

  const handleEditAssignment = async() => {
    if (onChangeValue.trim().length < 1) {
      alert("Assignment name must be at least 1 character long!");
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

    setIsOpen(!isOpen)

    if (assignmentsList.length === 1) {
      alert("Cannot delete the last remaining assignment.");
      return;
    } else {
    const confirmDelete = window.confirm('Do you really want to delete?')
    if (!confirmDelete) return; 
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



  // const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  // const [name, setName] = useState(assignmentName);
  // const [isRename, setIsRename] = useState(false);
  // const buttonRef = useRef(null);
  // const editRef = useRef(null);
  // const setIsRenameTrue = () => {
  //   setIsRename(true);
  // };
  // const handleAssignment = () => {
  //   if (buttonRef.current) {
  //     const rect = buttonRef.current.getBoundingClientRect();
  //     setModalPosition({top: rect.bottom, left: rect.left});
  //     setIsOpen(true);
  //     document.body.style.overflow = 'hidden';
  //   }
  // };
  // const handleCloseClick = () => {
  //   setIsOpen(false);
  //   document.body.style.overflow = 'auto';
  // };
  // const handleNameChange = (event) => {
  //   setName(event.target.value);
  // };
  // const handleNameUpdate = () => {
  //   if (name.length < 1) {
  //     alert("Assignment name must be at least 1 character long!")
  //   } else {
  //     handleAssignmentUpdate(assignmentId, name);
  //     setIsRename(!isRename);
  //   }
  // };
  // useEffect(() => {
  //   const handleClickOutsideRename = (event) => {
  //     if (editRef.current && !editRef.current.contains(event.target)) {
  //       handleNameUpdate();
  //     }
  //   };
  //   document.addEventListener('mousedown', handleClickOutsideRename);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutsideRename);
  //   }
  // },);



  return (
    <div
      id="item"
      className="rounded flex items-center justify-start gap-1.5 px-3.5 py-2.5 relative self-stretch w-full flex-[0_0_auto] overflow-hidden"
    >
      {selectedAssignmentId === assignmentId ? (
        <div className="bg-neutral-300 rounded-[20px] flex items-center justify-start gap-1.5 px-3.5 py-2.5 relative self-stretch w-full flex-[0_0_auto] overflow-hidden">
          <img alt="dot" src={dotDark} className="h-2 w-2 relative" />
          <div className="font-bold text-neutral-700 leading-6 text-lg tracking-0">
          {isEdit ? (
            <input
              className="border text-neutral-700 w-20 h-10 p-1"
              value={onChangeValue}
              onChange={(e) => setOnChangeValue(e.target.value)}
              // ref={ref}
              minLength="1"
              required
            />
          ) : (
            content
          )}
          </div>
          <div className="flex-grow"></div>
          <Ellipsis 
            className="text-neutral-700 selection:w-[18px] h-[18px] relative cursor-pointer" 
            onClick={handleAssignment} 
            ref={ref}/>
        </div>
      ) : (
        <Link
          to={`/${assignmentId}`}
          className="rounded flex items-center justify-start gap-1.5 px-3.5 py-2.5 relative self-stretch w-full flex-[0_0_auto] overflow-hidden"
        >
          <img alt="dot" src={dotLight} className="h-2 w-2 relative" />
          <div className="font-bold text-neutral-400 leading-6 text-lg tracking-0">
            {content}
          </div>
        </Link>
      )}
      {isOpen && <AssignmentModal 
        assignmentId={assignmentId} 
        position={modalPosition}
        handleEditAssignment={handleEditAssignment} 
        handleDeleteAssignment={handleDeleteAssignment}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        setIsOpen={setIsOpen}/>}
    </div>
  );
};

export default SidebarItem;
