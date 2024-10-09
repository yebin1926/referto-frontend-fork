import { Copy, Upload } from "lucide-react";
import ReferenceList from "../components/Reference/list";
import SidebarList from "../components/Sidebar/list";
import FileUploadModal from "../components/Modals/FileUpload";
import SuccessModal from "../components/Modals/SuccessModal";
import StyleList from "../components/Style/list";
import BlockMobileModal from "../components/Modals/BlockMobile.jsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPaperInfos, getAssignment } from "../apis/api.js";
// document.body.classList.add('overflow-hidden');

const HomePage = (props) => {
  const [referencesList, setReferencesList] = useState([]);
  const [selectedStyleName, setSelectedStyleName] = useState("APA");
  const [currAssignment, setCurrAssignment] = useState([]);
  const [copySuccessModalIsOpen, setCopySuccessModalIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth < 1100);

  const { assignmentId } = useParams();
  const selectedAssignmentId = Number(assignmentId);

  useEffect(() => {
    if (assignmentId) {
      const getReferencesAPI = async () => {
        const references = await getPaperInfos(assignmentId);
        setReferencesList(references);
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

  useEffect(() => {
    const handleResize = () => {
      setIsScreenSmall(window.innerWidth < 1100);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    setCopySuccessModalIsOpen(true);
  };

  return (
    <div className="w-full h-screen flex flex-row justify-between">
      <div className="flex flex-col w-100% h-screen items-start gap-[50px] pl-[20px] pr-[10px] py-[30px] bg-neutral-200 overflow-hidden">
        <SidebarList isUserLoggedIn={props.isUserLoggedIn} />
      </div>
      <div className="w-full h-[850px] px-[100px] py-[70px] flex-col justify-start items-center gap-[50px] inline-flex overflow-auto">
        <div className="font-['Pretendard'] font-neutral-700 font-bold text-3xl text-left w-full">
          {currAssignment.name}
        </div>
        <div className="self-stretch justify-end items-center inline-flex">
          <StyleList
            selectedAssignmentId={selectedAssignmentId}
            selectedStyleName={selectedStyleName}
            setSelectedStyleName={setSelectedStyleName}
          />
          <div
            className="px-3 py-2 bg-neutral-900 rounded-md justify-center items-center gap-2.5 flex cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <div className="justify-center items-center gap-2.5 flex">
              <Upload className="text-white selection:w-[18px] h-[18px] relative" />
            </div>
            <div className="text-right text-white text-lg font-medium font-['Pretendard'] leading-normal">
              업로드
            </div>
          </div>
          {isOpen && <FileUploadModal setIsOpen={setIsOpen} />}
        </div>
        <div className="w-full h-full flex-col justify-start items-center inline-flex">
          <div className="self-stretch py-2.5 border-b-2 border-neutral-400 justify-start items-start gap-2.5 inline-flex">
            <div className="w-[53px] self-stretch px-2.5 flex-col justify-center items-center gap-2.5 inline-flex">
              <div className="text-center text-neutral-900 text-lg font-medium font-['Pretendard'] leading-[27px]">
                no.
              </div>
            </div>
            <div className="grow shrink basis-0 self-stretch justify-center items-center gap-2.5 flex">
              <div className="grow shrink basis-0 text-neutral-900 text-lg font-medium font-['Pretendard'] leading-[27px]">
                참고문헌
              </div>
            </div>
            <div className="w-11 self-stretch px-2.5 justify-start items-center gap-[15px] flex">
              <Copy
                className="text-neutral-500 w-6 h-6 relative cursor-pointer"
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
      {isScreenSmall && <BlockMobileModal />}
    </div>
  );
};

export default HomePage;
