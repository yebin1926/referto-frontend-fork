import { Copy } from "lucide-react";
import ReferenceList from "../components/Reference/list";
import SidebarList from "../components/Sidebar/list";
import StyleList from "../components/Style/list";
import FileUpload from "../components/FileUpload";

const HomePage = () => {
  return (
    <div className="w-full flex flex-row justify-between">
      <div className="flex flex-col w-[280px] h-[959px] items-start gap-[50px] px-[20px] py-[50px] relative bg-neutral-200">
        <SidebarList />
      </div>
      <div className="w-full h-[959px] px-[100px] py-[70px] flex-col justify-start items-center gap-[50px] inline-flex">
        <div className="self-stretch justify-between items-center inline-flex">
          <div className="h-5 w-1000px justify-start items-center gap-[30px] flex">
            <StyleList />
          </div>
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
              <Copy className="text-neutral-500 w-6 h-6 relative" />
            </div>
          </div>
          <ReferenceList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
