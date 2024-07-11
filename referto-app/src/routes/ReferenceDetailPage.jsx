import ReferenceItem from "../components/Reference/item";
import { useParams } from "react-router-dom";
import references from "../data/references";
import PDFViewer from "../components/PDFView";
import PDF1 from "../data/PDFs/PDF1.pdf";
import ReferenceMemo from "../components/Reference/memo";

const ReferenceDetailPage = ({ handleReferenceDelete, handleReferenceUpdate, findIndexofReference }) => {
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
        handleReferenceDelete={handleReferenceDelete}
        handleReferenceUpdate={handleReferenceUpdate}
        findIndexofReference={findIndexofReference}
      />
      <div className="w-full h-full justify-start items-start inline-flex">
        <div className="w-full h-full p-5 flex-row justify-start items-start inline-flex">
          <div className="w-full h-full self-stretch px-2.5 py-3 rounded-lg border border-neutral-400 justify-center items-start gap-4 inline-flex">
            <PDFViewer pdfUrl={pdfUrl} />
          </div>
        </div>

        <div className="w-[413px] h-full px-6 py-5 border-neutral-400 flex-col justify-start items-center gap-[15px] inline-flex">
          <ReferenceMemo
            referenceId={referenceId}
            referenceName={referenceName}
          />
        </div>
      </div>
    </div>
  );
};

export default ReferenceDetailPage;
