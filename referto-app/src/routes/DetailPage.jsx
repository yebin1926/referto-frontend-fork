import ReferenceItemDetail from "../components/Reference/itemdetail";
import { useParams, useLocation } from "react-router-dom";
// import references from "../data/references";
import PDFViewer from "../components/PDFView";
import PDF1 from "../data/PDFs/PDF1.pdf";
import ReferenceMemo from "../components/memos/memo";
import { getPaper } from "../apis/api";
import { useState, useEffect } from "react";
import { PackagePlus } from "lucide-react";

const DetailPage = (
  {
    // handleReferenceDelete,
    // handleReferenceUpdate,
    // findIndexofReference,
    // selectedStyleName,
  }
) => {
  // const { assignmentId, referenceId } = useParams();
  const location = useLocation();
  const {
    index,
    reference,
    referenceId,
    referenceName,
    assignmentId,
    paperId,
    selectedStyleName,
  } = location.state || {};


  const [paperUrl, setPaperUrl] = useState(null);
  const [content, setContent] = useState(referenceName);

  useEffect(() => {
    const fetchPaper = async () => {
      try {
        const paperBlobUrl = await getPaper(paperId);
        setPaperUrl(paperBlobUrl);
      } catch (error) {
        console.error("Error fetching paper:", error);
      }
    };

    if (paperId) {
      fetchPaper();
    }
  }, [paperId]);

  return (
    <div className="w-full h-[959px] px-[100px] pt-[50px] pb-[100px] flex-col justify-start items-center inline-flex">
      <ReferenceItemDetail
        index={index}
        referenceId={referenceId}
        content={content}
        setContent={setContent}
        selectedStyleName={selectedStyleName}
        assignmentId={assignmentId}
        paperId={paperId}
      />
      <div className="w-full h-full justify-start items-start inline-flex">
        <div className="w-full h-full p-5 flex-row justify-start items-start inline-flex">
          <div className="w-full h-full self-stretch px-2.5 py-3 rounded-lg border border-neutral-400 justify-center items-start gap-4 inline-flex">
            {paperUrl ? (
              <PDFViewer pdfUrl={paperUrl} />
            ) : (
              <div>Loading PDF...</div>
            )}
          </div>
        </div>

        <div className="w-[413px] h-full px-6 py-5 border-neutral-400 flex-col justify-start items-center gap-[15px] inline-flex">
          <ReferenceMemo paperId={paperId} content={content}/>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
