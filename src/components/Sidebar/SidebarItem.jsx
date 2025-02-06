import dotDark from "../../assets/images/dot-dark.svg";
import dotLight from "../../assets/images/dot-light.svg";
import alertTriangle from "../../assets/images/alert-triangle.svg";
import { Link, useParams, useNavigate} from "react-router-dom";
import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react';
import { useState, useRef, useEffect } from "react";
import AssignmentModal from "../Modals/AssignmentModal";
import { updateAssignment, deleteAssignment } from '../../apis/api';
import DeleteConfirmModal from "../Modals/DeleteConfirmModal";
import AlertModal from "../Modals/AlertModal";
import { trackEvent } from '../../utils/analytics';

const SidebarItem = ({
  assignmentId,
  assignmentName,
  assignmentsList
}) => {

  const [isEdit, setIsEdit] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [editAlertModalIsOpen, setEditAlertModalIsOpen] = useState(false);
  const [deleteAlertModalIsOpen, setDeleteAlertModalIsOpen] = useState(false);
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
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setModalPosition({
        top: rect.top - 25,
        left: rect.left - 50
      });
      setIsOpen(true);
    }
  }

  const handleEditAssignment = async() => {
    if (onChangeValue.trim().length < 1) {
      setEditAlertModalIsOpen(true);
      return;
    }
    setIsEdit(false)
    setIsOpen(false)
    try {
      const data = await updateAssignment(selectedAssignmentId , {name: onChangeValue});
      setContent(data.name);
      window.location.reload();
    } catch (error) {
      throw error;
    }
  };

  const handleEditAlertCancel = () => {
    setEditAlertModalIsOpen(false);
    if (renameRef.current) {
      renameRef.current.focus();
    };
  };

  const handleDeleteAlertCancel = () => {
    setDeleteAlertModalIsOpen(false);
    setDeleteModalIsOpen(false);
  };

  const handleDeleteAssignment = async() => {
    const currentIndex = assignmentsList.findIndex((elem) => elem.assignment_id === assignmentId)

    if (assignmentsList.length === 1) {
      setDeleteAlertModalIsOpen(true);
      return ;
    } 

    try {
      await deleteAssignment(assignmentId);
      trackEvent('delete_assignment', { assignment_id: assignmentId });
      setDeleteModalIsOpen(false);

      if ((currentIndex + 1) === assignmentsList.length) {
        window.location.href = (`/${assignmentsList[currentIndex - 1].assignment_id}`)
      } else {
        window.location.href = (`/${assignmentsList[currentIndex + 1].assignment_id}`)
      }
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteAssignmentCancel = () => {
    setDeleteModalIsOpen(false);
    setDeleteAlertModalIsOpen(false);
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

  const assignmentMenuOptions = assignmentsList.length === 1 
    ? [
        {
          icon: <Pencil className="w-4 h-4 text-neutral-500" />,
          label: "수정",
          onClick: () => setIsEdit(true)
        }
      ]
    : [
        {
          icon: <Pencil className="w-4 h-4 text-neutral-500" />,
          label: "수정",
          onClick: () => setIsEdit(true)
        },
        {
          icon: <Trash2 className="w-4 h-4 text-red-400" />,
          label: "삭제",
          textColor: "text-red-400",
          onClick: () => setDeleteModalIsOpen(true)
        }
      ];

  return (
    <div
      id="item"
      className="w-full rounded flex items-center justify-start gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 self-stretch w-full flex-[0_0_auto] overflow-hidden"
    >
      {selectedAssignmentId === assignmentId ? (
        <div className="w-100% bg-neutral-300 rounded-[20px] flex items-center justify-start gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 self-stretch w-full flex-[0_0_auto] overflow-hidden">
          <img alt="dot" src={dotDark} className="h-1 sm:h-1.5 w-1 sm:w-1.5 flex-none" />
          <div className="w-[150px] sm:w-[180px] font-medium text-neutral-700 leading-5 sm:leading-6 text-base sm:text-lg tracking-0 truncate">
          {isEdit ? (
            <input
              className="border-2 border-neutral-300 rounded-md w-full h-100% px-1 focus:outline-none focus:border-neutral-500 text-base sm:text-lg"
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
              className="text-neutral-700 w-4 sm:w-[18px] h-4 sm:h-[18px] cursor-pointer" 
              onClick={handleAssignment} 
              ref={ref}/>
          </div>
        </div>
      ) : (
        <Link
          to={`/${assignmentId}`}
          className="w-100% rounded flex items-center justify-start gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 w-full truncate"
        >
          <img alt="dot" src={dotLight} className="h-1 sm:h-1.5 w-1 sm:w-1.5 flex-none" />
          <div className="w-[150px] sm:w-[180px] font-medium text-neutral-400 leading-5 sm:leading-6 text-base sm:text-lg tracking-0 truncate">
            {content}
          </div>
        </Link>
      )}
      {isOpen && (
        <AssignmentModal
          position={modalPosition}
          options={assignmentMenuOptions}
          setIsOpen={setIsOpen}
          setDeleteModalIsOpen={setDeleteModalIsOpen}
        />
      )}
      {deleteModalIsOpen && <DeleteConfirmModal 
        handleDelete={handleDeleteAssignment}
        handleDeleteCancel={handleDeleteAssignmentCancel}
     />}
      {editAlertModalIsOpen && <AlertModal 
        icon={alertTriangle}
        color={"#F59E0B"}
        handleAlertCancel={handleEditAlertCancel}
        text={"최소 1자 이상이어야 합니다."}
     />}
      {deleteAlertModalIsOpen && <AlertModal 
        icon={alertTriangle}
        color={"#F59E0B"}
        handleAlertCancel={handleDeleteAlertCancel}
        text={"하나 남은 과제는 삭제할 수 없습니다."}
     />}
    </div>
  );
};

export default SidebarItem;
