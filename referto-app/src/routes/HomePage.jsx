import { Copy } from "lucide-react";
import ReferenceList from "../components/Reference/list";
import SidebarList from "../components/Sidebar/list";
import FileUpload from "../components/FileUpload";
import StyleList from "../components/Style/list";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPaperInfos, getAssignment } from "../apis/api.js";

const HomePage = (
  // referencesList,
  // setReferencesList,
  // handleReferenceDelete,
  // handleReferenceUpdate,
  // getAllReferences,
  // findIndexofReference,
  // isUserLoggedIn,
  // selectedStyleName,
  // setSelectedStyleName,
  props
) => {
  const [referencesList, setReferencesList] = useState([]);
  const [selectedStyleName, setSelectedStyleName] = useState("APA")
  const { isUserLoggedIn } = props
  // const [selectedStyleId, setSelectedStyleId] = useState(1);

  // 전체 복사 고치기
  // const handleCopyAll = () => {
  //   const allReferencesText = getAllReferences().join("\n");
  //   const textarea = document.createElement("textarea");
  //   document.body.appendChild(textarea);
  //   textarea.value = allReferencesText;
  //   textarea.select();
  //   document.execCommand("copy");
  //   document.body.removeChild(textarea);
  //   alert("All references copied to clipboard!");
  // };

  const { assignmentId } = useParams();
  const selectedAssignmentId = Number(assignmentId)

  useEffect(() => {
    if (assignmentId) {
      const getReferencesAPI = async () => {
        const references = await getPaperInfos(assignmentId);
        setReferencesList(references);
      };
      getReferencesAPI();
      const getAssignmentAPI = async () => {
        const assignment = await getAssignment(assignmentId);
        // console.log('get 잘 가져왔어용', assignment)
        setSelectedStyleName(assignment.reference_type);
      };
      getAssignmentAPI();
    }
  }, [assignmentId]);
  

  return (
    <div className="w-full flex flex-row justify-between">
      <div className="flex flex-col w-[280px] h-[850px] items-start gap-[50px] px-[20px] py-[50px] relative bg-neutral-200">
        <SidebarList isUserLoggedIn={isUserLoggedIn}/>
      </div>
      <div className="w-full h-[850px] px-[100px] py-[70px] flex-col justify-start items-center gap-[50px] inline-flex">
        <div className="self-stretch justify-end items-center inline-flex">
          <StyleList selectedAssignmentId={selectedAssignmentId} selectedStyleName={selectedStyleName} setSelectedStyleName={setSelectedStyleName}/>
          <FileUpload />
        </div>
        <div className="w-full h-[241px] flex-col justify-start items-center inline-flex">
          <div className="self-stretch py-2.5 border-b-2 border-neutral-400 justify-start items-start gap-2.5 inline-flex">
            <div className="w-[53px] self-stretch px-2.5 flex-col justify-center items-center gap-2.5 inline-flex">
              <div className="text-center text-neutral-900 text-lg font-medium font-['Pretendard'] leading-[27px]">
                no.
              </div>
            </div>
            <div className="grow shrink basis-0 self-stretch justify-center items-center gap-2.5 flex">
              <div className="grow shrink basis-0 text-neutral-900 text-lg font-medium font-['Pretendard'] leading-[27px]">
                Reference
              </div>
            </div>
            <div className="w-11 self-stretch px-2.5 justify-start items-center gap-[15px] flex">
              <Copy
                className="text-neutral-500 w-6 h-6 relative cursor-pointer"
                // onClick={handleCopyAll}
              />
            </div>
          </div>
          <ReferenceList
            referencesList={referencesList}
            // handleReferenceDelete={handleReferenceDelete}
            // handleReferenceUpdate={handleReferenceUpdate}
            // findIndexofReference={findIndexofReference}
            selectedStyleName={selectedStyleName}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
