import { Copy, Upload, ArrowUpDown } from "lucide-react";
import ReferenceList from "../components/Reference/ReferenceList.jsx";
import SidebarList from "../components/Sidebar/SidebarList.jsx";
import FileUploadModal from "../components/Modals/FileUpload.jsx";
import SuccessModal from "../components/Modals/SuccessModal.jsx";
import StyleList from "../components/Style/StyleList.jsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPaperInfos, getAssignment } from "../apis/api.js";
import Header from "../components/Header/Header.jsx";
import { trackEvent } from '../utils/analytics.js';

const HomePage = ({ isUserLoggedIn, setIsUserLoggedIn, isSidebarOpen, setIsSidebarOpen, setIsDetailPage }) => {
  const [referencesList, setReferencesList] = useState([]);
  const [selectedStyleName, setSelectedStyleName] = useState("APA");
  const [currAssignment, setCurrAssignment] = useState([]);
  const [copySuccessModalIsOpen, setCopySuccessModalIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { assignmentId } = useParams();
  const selectedAssignmentId = Number(assignmentId);

  useEffect(() => {
    setIsDetailPage(false);
    if (assignmentId) {
      const getReferencesAPI = async () => {
        try {
          const paperInfos = await getPaperInfos(assignmentId);
          setReferencesList(paperInfos);
        } catch (error) {
          setReferencesList([]);
          throw error;
        }
      };
      getReferencesAPI();
      
      const getAssignmentAPI = async () => {
        const assignment = await getAssignment(assignmentId);
        setCurrAssignment(assignment);
        setSelectedStyleName(assignment.reference_type);
      };
      getAssignmentAPI();
    }
  }, [assignmentId]);

  const handleCopyAll = () => {
    const referencesListText = [];
    referencesList.forEach((item) => {
      if (item[selectedStyleName]) {
        referencesListText.push(item[selectedStyleName]);
      }
    });
    const textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    textarea.value = referencesListText.join("\n\n");
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    trackEvent('copy_all_references', { style: selectedStyleName });
    setCopySuccessModalIsOpen(true);
  };

  const handleSortReferences = () => {
    trackEvent('sort_references', { style: selectedStyleName });
    const sortedList = [...referencesList].sort((a, b) => {
      if (!a[selectedStyleName] || !b[selectedStyleName]) return 0;
      return a[selectedStyleName].localeCompare(b[selectedStyleName]);
    });
    setReferencesList(sortedList);
  };

  const handleUploadClick = () => {
    trackEvent('open_upload_modal', { page: 'home' });
    setIsOpen(true);
  };

  return (
    <>
      <Header
        isUserLoggedIn={isUserLoggedIn}
        setIsUserLoggedIn={setIsUserLoggedIn}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isDetailPage={false}
        firstAssignmentId={selectedAssignmentId}
      />
      <div className="w-full flex h-[calc(100vh-65px)]">
        <div className={`
          fixed sm:sticky top-[55px] h-[calc(100vh-65px)]
          w-[200px] sm:w-[300px]
          flex flex-col items-start gap-[30px] sm:gap-[50px] 
          px-3 sm:px-[20px] py-5 sm:py-[30px] 
          bg-neutral-200
          transition-transform duration-300
          sm:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          z-50
          overflow-y-auto
        `}>
          <SidebarList isUserLoggedIn={isUserLoggedIn} />
        </div>
        <div 
          className="flex-1 overflow-y-auto h-[calc(100vh-55px)] px-6 sm:px-[100px] py-8 sm:py-[70px] flex-col justify-start items-center gap-6 sm:gap-[50px] inline-flex"
          onClick={() => {
            if (window.innerWidth < 640 && isSidebarOpen) {
              setIsSidebarOpen(false);
            }
          }}
        >
          <div className="w-full flex flex-row justify-between items-center">
            <div className="font-['Pretendard'] font-neutral-700 font-bold text-xl sm:text-3xl">
              {currAssignment.name}
            </div>
            <div className="sm:hidden">
              <div
                className="px-3 py-2 bg-neutral-900 rounded-md justify-center items-center gap-2 flex cursor-pointer"
                onClick={() => setIsOpen(true)}
              >
                <Upload className="text-white w-4 h-4 relative" />
                <div className="text-right text-white text-sm font-medium font-['Pretendard'] leading-normal">
                  업로드
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch justify-end items-center inline-flex flex-wrap gap-6 sm:gap-2">
            <StyleList
              selectedAssignmentId={selectedAssignmentId}
              selectedStyleName={selectedStyleName}
              setSelectedStyleName={setSelectedStyleName}
            />
            <div
              className="hidden sm:flex px-3 py-2 bg-neutral-900 rounded-md justify-center items-center gap-2.5 cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              <div className="justify-center items-center gap-2.5 flex">
                <Upload className="text-white w-[18px] h-[18px] relative" />
              </div>
              <div className="text-right text-white text-lg font-medium font-['Pretendard'] leading-normal">
                업로드
              </div>
            </div>
            {isOpen && <FileUploadModal setIsOpen={setIsOpen} />}
          </div>
          <div className="w-full h-full flex-col justify-start items-center inline-flex">
            <div className="self-stretch py-2 sm:py-2.5 border-b-2 border-neutral-400 justify-start items-start gap-2 sm:gap-2.5 inline-flex">
              <div className="w-[32px] sm:w-[53px] self-stretch px-2 sm:px-2.5 flex-col justify-center items-center inline-flex">
                <div className="text-center text-neutral-900 text-md sm:text-lg font-medium font-['Pretendard'] leading-[27px]">
                  no.
                </div>
              </div>
              <div className="grow shrink basis-0 self-stretch justify-center items-center gap-2 sm:gap-2.5 flex">
                <div className="grow shrink basis-0 text-neutral-900 text-md sm:text-lg font-medium font-['Pretendard'] leading-[27px]">
                  참고문헌
                </div>
              </div>
              <div className="w-16 sm:w-20 self-stretch px-2 sm:px-2.5 justify-start items-center gap-[10px] sm:gap-[15px] flex">
                <ArrowUpDown
                  className="text-neutral-500 w-4 sm:w-6 h-4 sm:h-6 relative cursor-pointer"
                  onClick={handleSortReferences}
                />
                <Copy
                  className="text-neutral-500 w-4 sm:w-6 h-4 sm:h-6 relative cursor-pointer"
                  onClick={handleCopyAll}
                />
              </div>
            </div>
            <ReferenceList
              referencesList={referencesList}
              setReferencesList={setReferencesList}
              selectedStyleName={selectedStyleName}
            />
          </div>
        </div>
        {copySuccessModalIsOpen && (
          <SuccessModal
            text={"클립보드에 복사되었습니다."}
            setModalOpen={setCopySuccessModalIsOpen}
          />
        )}
      </div>
    </>
  );
};

export default HomePage;
