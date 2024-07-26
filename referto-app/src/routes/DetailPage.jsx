import React, { useState, useEffect } from "react";
import ReferenceItemDetail from "../components/Reference/itemdetail";
import { useLocation } from "react-router-dom";
import PDFViewer from "../components/PDFView";
import ReferenceMemo from "../components/memos/memo";
import { getPaper } from "../apis/api";
import BlockMobileModal from "../components/Modals/BlockMobile.jsx";

const DetailPage = () => {
  const location = useLocation();
  const {
    index,
    reference,
    referenceId,
    referenceName,
    assignmentId,
    paperId,
    selectedStyleName,
    referencesList,
  } = location.state || {};

  const [paperUrl, setPaperUrl] = useState(null);
  const [content, setContent] = useState(referenceName);
  const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth < 1100);

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

  useEffect(() => {
    const handleResize = () => {
      setIsScreenSmall(window.innerWidth < 1100);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePrevPage = () => {
    reference = referencesList[index - 1];
    referenceId = reference["paperInfo_id"];
    referenceName = reference[selectedStyleName];
    setContent(referenceName);
    paperId = reference["paper"];
    window.location.reload();
  };

  const handleNextPage = () => {
    reference = referencesList[index + 1];
    referenceId = reference["paperInfo_id"];
    referenceName = reference[selectedStyleName];
    setContent(referenceName);
    paperId = reference["paper"];
    window.location.reload();
  };

  return (
    <div className="w-full h-[959px] px-[100px] pt-[50px] pb-[100px] flex-col justify-start items-center inline-flex">
      {isScreenSmall && <BlockMobileModal />}
      <ReferenceItemDetail
        index={index}
        referenceId={referenceId}
        content={content}
        setContent={setContent}
        selectedStyleName={selectedStyleName}
        assignmentId={assignmentId}
        paperId={paperId}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />
      <div className="w-full h-full justify-start items-start inline-flex">
        <div className="w-full h-full p-5 flex-row justify-start items-start inline-flex">
          <div className="w-full h-full self-stretch px-2.5 py-3 rounded-lg border border-neutral-400 justify-center items-start gap-4 inline-flex">
            {paperUrl ? (
              <PDFViewer pdfUrl={paperUrl} />
            ) : (
              <div>파일 로딩 중...</div>
            )}
          </div>
        </div>

        <div className="w-[413px] h-full px-6 py-5 border-neutral-400 flex-col justify-start items-center gap-[15px] inline-flex">
          <ReferenceMemo paperId={paperId} content={content} />
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
