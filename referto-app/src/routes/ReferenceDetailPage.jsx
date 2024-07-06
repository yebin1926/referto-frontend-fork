import { NotepadText, Save, Copy } from "lucide-react";
import ReferenceTitle from "../components/ReferenceTitle";

const ReferenceDetailPage = () => {
  return (
    <div className="w-full h-[959px] px-[100px] pt-[50px] pb-[100px] flex-col justify-start items-center inline-flex">
      <ReferenceTitle />
      <div className="self-stretch grow shrink basis-0 justify-start items-start inline-flex">
        <div className="grow shrink basis-0 p-5 flex-col justify-start items-start inline-flex">
          <div className="self-stretch px-2.5 py-3 bg-white rounded-bl-lg rounded-br-lg border border-neutral-400 justify-start items-start gap-4 inline-flex">
            <div className="grow shrink basis-0 text-center text-neutral-900 text-lg font-normal font-['Gungsuh'] leading-[27px]">
              <br />
              <br />아 일하기 싫다.
              <br />
              박혜리
              <br />
              2020.06.15.
              <br />
              서울대학교 영어교육과
              <br />
              <br />
              <br />
              일하기 싫어서 이거 만들고 있습니다.
              <br />
              ㅁㄴㅇㄹㅇㄶㅁ
              <br />
              ㅁㅎㅁㅎㄻㅎㅇ
              <br />
              ㅁㅎㄹㅇㅎㅎㅎㅁㅎ모ㅗ
              <br />
              <br />
              <br />
              연구 결과
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              히히
              <br />
              <br />
              <br />
            </div>
            <div className="w-2 self-stretch justify-start items-center gap-2.5 flex">
              <div className="w-[130px] h-2 origin-top-left -rotate-90 bg-neutral-500 rounded-[100px]" />
            </div>
          </div>
        </div>
        <div className="w-[413px] self-stretch px-6 py-5 bg-white border-l border-neutral-400 flex-col justify-start items-center gap-[15px] inline-flex">
          <div className="self-stretch justify-start items-center inline-flex">
            <div className="grow shrink basis-0 h-[27px] justify-start items-center gap-[7px] flex">
              <NotepadText className="w-6 h-6 relative text-neutral-700" />
              <div className="text-neutral-700 text-lg font-semibold font-['Pretendard'] leading-[27px]">
                Memo
              </div>
            </div>
          </div>
          <div className="self-stretch h-[164px] px-[15px] py-2.5 rounded-lg border border-neutral-400 flex-col justify-start items-center gap-[13px] flex">
            <div className="self-stretch text-neutral-300 text-base font-medium font-['Pretendard'] leading-normal">
              Add your text here.
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
          </div>
          <div className="self-stretch justify-center items-center gap-[15px] inline-flex">
            <div className="grow shrink basis-0 h-10 justify-end items-center gap-[18px] flex">
              <div className="px-4 py-2 rounded-md border border-neutral-500 justify-center items-center gap-2.5 flex">
                <Save className="w-[18px] h-[18px] relative text-neutral-500" />
                <div className="text-right text-neutral-500 text-lg font-medium font-['Pretendard'] leading-normal">
                  Save
                </div>
              </div>
              <div className="px-4 py-2 bg-neutral-900 rounded-md justify-center items-center gap-2.5 flex">
                <div className="justify-center items-center gap-2.5 flex">
                  <Copy className="w-[18px] h-[18px] relative text-neutral-50" />
                </div>
                <div className="text-right text-white text-lg font-medium font-['Pretendard'] leading-normal">
                  Copy
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferenceDetailPage;
