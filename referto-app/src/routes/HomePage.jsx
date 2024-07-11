import { Copy } from "lucide-react";
import ReferenceList from "../components/Reference/list";
import SidebarList from "../components/Sidebar/list";
import FileUpload from "../components/FileUpload";

const HomePage = ({ referencesList, handleReferenceDelete, handleReferenceUpdate, getAllReferences, findIndexofReference }) => {
  const handleCopyAll = () => {
    const allReferencesText = getAllReferences().join("\n");
    const textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    textarea.value = allReferencesText;
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("All references copied to clipboard!");
  };
  //referencesList에서 reference각주부분만 가져와서 리스트로 만든 것 -> allReferences리스트로 업데이트해주기.
  //굳이 allReferences리스트가 필요할까? 그냥 getAllReferences()의 값을 바로 복사하면 안되나? 
  //logic을 보자. 내가 item에서 각주부분을 수정한다 -> 수정을 완료후 체크버튼을 누르면 handleReferenceUpdate(referenceId, content)가 실행되고 
  //이 함수에 의해 referencesList가 변경된 값으로 업데이트된다. 즉 내가 각주를 하나 수정할때마다 referencesList는 업데이트된다. 
  //그리고 getAllReferences 함수를 실행할때마다 업데이트된 referencesList를 기반으로 거기에서 각주부분만 가져온다.
  //굳이 allReferences 값을 따로 관리하고 set해줄 필요가 없다. 
  //그렇다면 내가 전체복사버튼을 눌렀을때 -> handleCopyAll에서 getAllReference함수를 호출한 뒤, getAllReference함수에서 반환해준 각주부분 모음들을 다 모아서 복사할 수 있게 하면된다. 
  return (
    <div className="w-full flex flex-row justify-between">
      <div className="flex flex-col w-[280px] h-[959px] items-start gap-[50px] px-[20px] py-[50px] relative bg-neutral-200">
        <SidebarList />
      </div>
      <div className="w-full h-[959px] px-[100px] py-[70px] flex-col justify-start items-center gap-[50px] inline-flex">
        <div className="self-stretch justify-end items-center inline-flex">
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
                onClick={handleCopyAll}
              />
            </div>
          </div>
          <ReferenceList 
            referencesList={referencesList}
            handleReferenceDelete={handleReferenceDelete}
            handleReferenceUpdate={handleReferenceUpdate}
            findIndexofReference={findIndexofReference}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
