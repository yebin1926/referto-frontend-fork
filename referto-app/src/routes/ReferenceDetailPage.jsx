import ReferenceItem from "../components/Reference/item";
import { useParams } from "react-router-dom";
//import references from "../data/references";
import PDFViewer from "../components/PDFView";
import PDF1 from "../data/PDFs/PDF1.pdf";
import ReferenceMemo from "../components/Reference/memo";
import { getPaperInfos } from "../apis/api";
import { useState, useEffect } from "react";

const ReferenceDetailPage = ({
  referencesList,
  setReferencesList,
  handleReferenceDelete,
  handleReferenceUpdate,
  findIndexofReference,
}) => {
  const { referenceId } = useParams();
  const [referencesList2, setReferencesList2] = useState(referencesList);

  useEffect(() => {
    console.log("ReferencesList Length: " + referencesList2.length);
    if (referencesList2.length === 0) {
      const getReferencesAPI = async () => {
        const references = await getPaperInfos(0);
        setReferencesList2(references);
        setReferencesList(references);
      };
      getReferencesAPI();
    }
  }, []);

  console.log("References List: " + referencesList2);

  const reference = referencesList2.find(
    (ref) => ref.paperInfo_id === Number(referenceId)
  );

  const referenceName = reference.mla_reference;

  const pdfUrl = PDF1;
  return (
    <div className="w-full h-[959px] px-[100px] pt-[50px] pb-[100px] flex-col justify-start items-center inline-flex">
      <ReferenceItem
        reference={reference}
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
