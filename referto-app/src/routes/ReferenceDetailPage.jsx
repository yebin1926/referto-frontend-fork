import { NotepadText, Save, Copy } from "lucide-react";
import ReferenceItem from "../components/Reference/item";
import { useParams } from "react-router-dom";
import references from "../data/references";
import PDFViewer from "../components/PDFView";
import PDF1 from "../data/PDFs/PDF1.pdf";

const ReferenceDetailPage = () => {
  const { referenceId } = useParams();
  const reference = references.find((ref) => ref.paperInfo_id === referenceId);
  const referenceName = reference.reference;

  const pdfUrl = PDF1;

  return (
    <div className="w-full h-[959px] px-[100px] pt-[50px] pb-[100px] flex-col justify-start items-center inline-flex">
      <ReferenceItem
        referenceId={referenceId}
        referenceName={referenceName}
        isVisible={false}
      />
      <div className="w-full h-full justify-start items-start inline-flex">
        <div className="w-full h-full p-5 flex-row justify-start items-start inline-flex">
          <div className="w-full h-full self-stretch px-2.5 py-3 rounded-lg border border-neutral-400 justify-center items-start gap-4 inline-flex">
            <PDFViewer pdfUrl={pdfUrl} />
          </div>
        </div>
        <div className="w-[413px] h-full px-6 py-5 bg-white border-l border-neutral-400 flex-col justify-start items-center gap-[15px] inline-flex">
          <div className="self-stretch justify-start items-center inline-flex">
            <div className="grow shrink basis-0 h-100% justify-start items-center gap-[7px] flex">
              <NotepadText className="w-6 h-6 relative" />
              <div className="text-neutral-700 text-lg font-semibold font-['Pretendard'] leading-[27px]">
                Memo
              </div>
            </div>
          </div>
          <div className="self-stretch h-100% px-[15px] py-2.5 rounded-lg border border-neutral-400 flex-col justify-start items-center gap-[13px] flex">
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
              <div className="px-4 py-2 rounded-md border border-neutral-700 justify-center items-center gap-2.5 flex">
                <Save className="w-[18px] h-[18px] relative text-neutral-700" />
                <div className="text-right text-neutral-700 text-lg font-medium font-['Pretendard'] leading-normal">
                  Save
                </div>
              </div>
              <div className="px-4 py-2 bg-neutral-900 rounded-md justify-center items-center gap-2.5 flex">
                <div className="justify-center items-center gap-2.5 flex">
                  <Copy className="w-[18px] h-[18px] relative text-white" />
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
