import ReferenceItem from "../components/Reference/item";
import { useParams } from "react-router-dom";
// import references from "../data/references";
import PDFViewer from "../components/PDFView";
import PDF1 from "../data/PDFs/PDF1.pdf";
import ReferenceMemo from "../components/Reference/memo";
import { getPaperInfos } from "../apis/api";
import { useState, useEffect } from "react";

const ReferenceDetailPage = ({
  handleReferenceDelete,
  handleReferenceUpdate,
  findIndexofReference,
  selectedStyleName,
}) => {
  const { assignmentId, referenceId } = useParams();
  console.log('assignmentId:', assignmentId )
  console.log('referenceId:', referenceId )
  // const [reference, setReference] = useState(null);

  // const getReferencesAPI = async () => {
  //   try {
  //     const references = await getPaperInfos(assignmentId);
  //     const reference = references.find((r) => r.paperInfo_id === parseInt(referenceId));
  //     console.log('detail page에서 보는 reference', reference);
  //     return reference;
  //   } catch (error) {
  //     console.error('Error getting references:', error);
  //   } 
  // };
  // const reference = getReferencesAPI();
  const [reference, setReference] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getReferencesAPI = async () => {
      try {
        const references = await getPaperInfos(assignmentId);
        const reference = references.find((r) => r.paperInfo_id === parseInt(referenceId));
        console.log('detail page에서 보는 reference', reference);
        setReference(reference);
        console.log('paper 찾기', reference.paper)
      } catch (error) {
        console.error('Error getting references:', error);
      } finally {
        setLoading(false); // 데이터 로드가 완료되면 로딩 상태를 false로 설정
      }
    };

    getReferencesAPI();
  }, [assignmentId, referenceId]);

  if (loading) {
    return <div>Loading...</div>; // 데이터가 로드될 때까지 로딩 메시지 표시
  }

  if (!reference) {
    return <div>Reference not found</div>; // reference가 없는 경우 메시지 표시
  }


  const pdfUrl = PDF1;

  return (
    <div className="w-full h-[959px] px-[100px] pt-[50px] pb-[100px] flex-col justify-start items-center inline-flex">
      <ReferenceItem
        reference={reference}
        isVisible={false}
        handleReferenceDelete={handleReferenceDelete}
        handleReferenceUpdate={handleReferenceUpdate}
        findIndexofReference={findIndexofReference}
        selectedStyleName={selectedStyleName}
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
          />
        </div>
      </div>
    </div>
  );
};

export default ReferenceDetailPage;
