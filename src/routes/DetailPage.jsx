import { useState, useEffect, useRef } from "react";
import ReferenceItemDetail from "../components/Reference/ReferenceItemDetail";
import { useLocation, useNavigate } from "react-router-dom";
import PDFViewer from "../components/PDFViewer/PDFViewer";
import ReferenceMemo from "../components/ReferenceMemo/ReferenceMemo";
import { getPaper, getNotes, deleteNote, getAssignments } from "../apis/api";
import { NotepadText, Trash2 } from "lucide-react";
import Header from "../components/Header/Header";
import { trackEvent } from '../utils/analytics';

const DetailPage = ({ setIsDetailPage, isUserLoggedIn, setIsUserLoggedIn }) => {
  const location = useLocation();
  const {
    index,
    reference,
    selectedStyleName,
    referenceId,
    referenceName,
    assignmentId,
    paperId,
    referencesList,
  } = location.state || {};

  const [paperUrl, setPaperUrl] = useState(null);
  const [content, setContent] = useState(referenceName);
  const navigate = useNavigate();
  const [isMemoOpen, setIsMemoOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const notesRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [firstAssignmentId, setFirstAssignmentId] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setIsDetailPage(true);
    
    const fetchData = async () => {
      try {
        const assignments = await getAssignments();
        if (isMounted && assignments && assignments.length > 0) {
          setFirstAssignmentId(assignments[0].assignment_id);
        }

        if (paperId) {
          const notesData = await getNotes(paperId);
          if (isMounted && notesData) {
            setNotes(Array.isArray(notesData) ? notesData : []);
            notesRef.current = Array.isArray(notesData) ? notesData : [];
          }

          const paperBlobUrl = await getPaper(paperId);
          if (isMounted) {
            setPaperUrl(paperBlobUrl);
            setNotes(notesRef.current || []);
          }
        }
      } catch (error) {
        throw error;
      }
    };
  
    fetchData();
  
    return () => {
      isMounted = false;
    };
  }, [paperId, setIsDetailPage]);

  const handlePrevPage = async () => {
    trackEvent('navigate_reference', { direction: 'prev' });
    if (index > 1) {
      const newReference = referencesList[index - 2];
      const newReferenceId = newReference["paperInfo_id"];
      const newPaperId = newReference["paper"];

      try {
        const notesData = await getNotes(newPaperId);
        notesRef.current = Array.isArray(notesData) ? notesData : [];
        setNotes(notesRef.current);
        
        navigate(`/${assignmentId}/${newReferenceId}`, {
          state: {
            ...location.state,
            index: index - 1,
            reference: newReference,
            referenceId: newReferenceId,
            referenceName: newReference[selectedStyleName],
            paperId: newPaperId,
          },
          replace: true
        });
      } catch (error) {
        throw error;
      }
    }
  };

  const handleNextPage = async () => {
    trackEvent('navigate_reference', { direction: 'next' });
    if (index < referencesList.length) {
      const newReference = referencesList[index];
      const newReferenceId = newReference["paperInfo_id"];
      const newPaperId = newReference["paper"];

      try {
        const notesData = await getNotes(newPaperId);
        notesRef.current = Array.isArray(notesData) ? notesData : [];
        setNotes(notesRef.current);
        
        navigate(`/${assignmentId}/${newReferenceId}`, {
          state: {
            ...location.state,
            index: index + 1,
            reference: newReference,
            referenceId: newReferenceId,
            referenceName: newReference[selectedStyleName],
            paperId: newPaperId,
          },
          replace: true
        });
      } catch (error) {
        throw error;
      }
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId);
      const updatedNotes = notes.filter(note => note.note_id !== noteId);
      setNotes(updatedNotes);
      trackEvent('delete_note', { page: 'detail' });
    } catch (error) {
      throw error;
    }
  };

  const jumpToHighlightArea = (highlightArea) => {
    const viewerContainer = document.querySelector('.rpv-core__viewer');
    
    if (viewerContainer) {
        const pageContainer = viewerContainer.querySelector(
            `.rpv-core__inner-pages`
        );
        
        const pageElement = viewerContainer.querySelector(
            `[data-testid="core__page-layer-${highlightArea.pageIndex}"]`
        );

        if (pageElement && pageContainer) {
            const containerRect = pageContainer.getBoundingClientRect();
            const pageRect = pageElement.getBoundingClientRect();
            const relativeTop = pageRect.top - containerRect.top;
            
            const offsetInPage = (pageElement.offsetHeight * highlightArea.top) / 100;
            const finalPosition = relativeTop + offsetInPage + pageContainer.scrollTop;
            
            pageContainer.scrollTo({
                top: finalPosition - 50,
                behavior: 'smooth'
            });
        }
    }
  };

  const handleNoteClick = (note) => {
    if (note.highlightAreas && note.highlightAreas.length > 0) {
        const highlightArea = note.highlightAreas[0];
        jumpToHighlightArea(highlightArea);
    }
  };

  return (
    <>
      <Header
        isUserLoggedIn={isUserLoggedIn}
        setIsUserLoggedIn={setIsUserLoggedIn}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isDetailPage={true}
        firstAssignmentId={firstAssignmentId}
      />
      <div className="w-full h-[calc(100vh-65px)]">
        <div className="w-full h-[calc(100vh-65px)]">
          <div className="h-full overflow-y-auto">
            <div className="bg-white px-4 sm:px-[100px] pt-6 sm:pt-[50px]">
              <ReferenceItemDetail
                index={index}
                referenceId={referenceId}
                referenceName={referenceName}
                content={content}
                setContent={setContent}
                selectedStyleName={selectedStyleName}
                assignmentId={assignmentId}
                paperId={paperId}
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
              />
            </div>

            {/* Main Content */}
            <div className="px-4 sm:px-[100px]">
              <div className="w-full h-full flex flex-col lg:flex-row gap-4">
                {/* PDF Viewer Section */}
                <div className="w-full lg:w-2/3 p-3 sm:p-5">
                  <div className="w-full h-full p-2 sm:p-3">
                    {paperUrl ? (
                      <PDFViewer 
                        pdfUrl={paperUrl} 
                        paperId={paperId}
                        notes={notes}
                        setNotes={setNotes}
                        jumpToHighlightArea={jumpToHighlightArea}
                      />
                    ) : (
                      <div className="text-sm sm:text-base">파일 로딩 중...</div>
                    )}
                  </div>
                </div>

                {/* Desktop Memo Section */}
                <div className="hidden lg:block w-1/3 p-3 sm:p-5">
                  <div className="w-full">
                    <ReferenceMemo paperId={paperId} content={content} />
                    {/* Notes Section */}
                    <div className="mt-4">
                      <div className="grow shrink basis-0 h-100% flex items-center gap-[5px] sm:gap-[7px] mb-2">
                        <NotepadText className="w-5 h-5 sm:w-6 sm:h-6 relative" />
                        <div className="text-neutral-700 text-base sm:text-lg font-semibold font-['Pretendard'] leading-[27px]">
                          하이라이팅 메모
                        </div>
                      </div>
                      <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-380px)]">
                        {notes && notes.length > 0 ? (
                          notes.map((note) => (
                            <div
                              key={note.note_id}
                              className="p-4 border-2 border-neutral-300 rounded-md shadow-md hover:bg-neutral-100 cursor-pointer"
                              onClick={() => handleNoteClick(note)}
                            >
                              <div className="flex justify-end">
                                <Trash2
                                  className="text-red-400 w-4 h-4 cursor-pointer"
                                  onClick={() => handleDeleteNote(note.note_id)}
                                />
                              </div>
                              <div className="text-neutral-500 font-[Pretendard] font-medium break-words overflow-hidden">
                                {note.quote}
                              </div>
                              <div className="text-neutral-900 font-[Pretendard] font-medium">
                                {note.content}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-neutral-500 text-sm">저장된 메모가 없습니다.<span className="block">pdf 파일의 텍스트를 드래그해 추가하세요.</span></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Memo Handler */}
                <div className="lg:hidden fixed bottom-0 left-0 right-0 flex flex-col items-center">
                  <button
                    className="bg-white w-full px-4 py-4 border-t-2 border-gray-200 rounded-t-2xl flex items-center justify-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]"
                    onClick={() => setIsMemoOpen(!isMemoOpen)}
                  >
                    <div className="w-12 h-1 bg-gray-300 rounded-full" />
                  </button>
                </div>

                {/* Add padding at the bottom for mobile */}
                <div className="lg:hidden h-10"></div>

                {/* Mobile Memo Modal */}
                {isMemoOpen && (
                  <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
                    <div className="absolute bottom-0 w-full bg-white rounded-t-2xl p-4 animate-slide-up">
                      <button
                        className="w-full flex justify-center mb-2"
                        onClick={() => setIsMemoOpen(false)}
                      >
                        <div className="w-12 h-1 bg-neutral-300 rounded-full" />
                      </button>
                      <ReferenceMemo
                        paperId={paperId}
                        content={content}
                        onClose={() => setIsMemoOpen(false)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPage;
