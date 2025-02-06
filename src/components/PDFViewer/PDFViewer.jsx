import React, { useState, useRef, useEffect } from "react";
import { getNotes, createNote, deleteNote } from "../../apis/api";
import {
  Worker,
  Viewer,
  SpecialZoomLevel,
  Button,
} from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import "@react-pdf-viewer/highlight/lib/styles/index.css";
import { highlightPlugin } from "@react-pdf-viewer/highlight";
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import packageJson from '../../../package.json';

const PDFViewer = ({ pdfUrl, paperId, setNotes, notes, jumpToHighlightArea }) => {
  const pdfjsVersion = packageJson.dependencies['pdfjs-dist'];
  const [message, setMessage] = useState("");
  const noteEles = useRef(new Map());
  const [currentDoc, setCurrentDoc] = useState(null);

  useEffect(() => {
    if (!notes || notes.length === 0) {
      const getNoteAPI = async () => {
        const notesData = await getNotes(paperId);
        if (notesData) {
          setNotes(Array.isArray(notesData) ? notesData : []);
        }
      };
      getNoteAPI();
    }
  }, [paperId, setNotes, notes]);

  const handleDocumentLoad = (e) => {
    setCurrentDoc(e.doc);
    if (currentDoc && currentDoc !== e.doc) {
      setCurrentDoc(e.doc);
    }
  };

  const scrollToHighlightArea = (highlightArea) => {
    const pageIndex = highlightArea.pageIndex;
    const pageElement = document.querySelector(`[data-testid="core__page-layer-${pageIndex}"]`);
    const viewerContainer = document.querySelector('.rpv-core__viewer');
    
    if (!pageElement || !viewerContainer) {
      // 요소가 아직 로드되지 않았다면, 약간의 지연 후 다시 시도
      setTimeout(() => {
        const retryPageElement = document.querySelector(`[data-testid="core__page-layer-${pageIndex}"]`);
        const retryViewerContainer = document.querySelector('.rpv-core__viewer');
        
        if (retryPageElement && retryViewerContainer) {
          const pageHeight = retryPageElement.offsetHeight;
          const yOffset = (highlightArea.top / 100) * pageHeight;
          
          retryViewerContainer.scrollTo({
            top: yOffset,
            behavior: 'smooth'
          });
        }
      }, 500); // 500ms 후 재시도
      return;
    }
    
    const pageHeight = pageElement.offsetHeight;
    const yOffset = (highlightArea.top / 100) * pageHeight;
    
    viewerContainer.scrollTo({
      top: yOffset,
      behavior: 'smooth'
    });
  };

  const jumpToNote = (note) => {
    if (noteEles.current.has(note.id)) {
      noteEles.current.get(note.id).scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (jumpToHighlightArea) {
      scrollToHighlightArea(jumpToHighlightArea);
    }
  }, [jumpToHighlightArea]);

  // Initialize the plugins
  const highlightPluginInstance = highlightPlugin({
    renderHighlightTarget: ({ selectionRegion, toggle }) => {
      if (selectionRegion.pageIndex === undefined) {
        return null;
      }
      
      return (
        <div
          style={{
            background: "#fff",
            border: "1px solid rgba(0, 0, 0, 0.2)",
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            display: "flex",
            padding: "8px",
            position: "absolute",
            left: `${selectionRegion.left}%`,
            top: `${selectionRegion.top + selectionRegion.height}%`,
            transform: "translate(0, 8px)",
            zIndex: 1000,
          }}
        >
          <Button
            onClick={toggle}
            style={{
              background: "#E5E5E5",
              color: "#171717",
              borderRadius: "4px",
              cursor: "pointer",
              padding: "4px 8px",
            }}
          >
            메모 추가
          </Button>
        </div>
      );
    },
    renderHighlightContent: ({
      selectionRegion,
      highlightAreas,
      selectedText,
      cancel,
    }) => {
      const addNote = async () => {
        if (message !== "") {
          // 페이지별로 하이라이트 영역 분리
          const groupedHighlights = highlightAreas.reduce((acc, area) => {
            const pageIndex = area.pageIndex;
            if (!acc[pageIndex]) {
              acc[pageIndex] = [];
            }
            acc[pageIndex].push(area);
            return acc;
          }, {});

          // 각 페이지별로 노트 생성
          const notes = Object.entries(groupedHighlights).map(([pageIndex, areas]) => ({
            content: message,
            highlightAreas: areas,
            quote: selectedText, // 필요한 경우 페이지별로 quote도 분리
            pageIndex: parseInt(pageIndex),
          }));

          // 각 노트를 개별적으로 저장
          for (const note of notes) {
            await createNote(paperId, note);
          }

          // 노트 목록 업데이트
          const updatedNotes = await getNotes(paperId);
          setNotes(updatedNotes);
          setMessage("");
          cancel();
        }
      };

      return (
        <div
          id="Note_input"
          style={{
            background: "#fff",
            border: "1px solid rgba(0, 0, 0, .3)",
            borderRadius: "2px",
            padding: "8px",
            position: "absolute",
            left: `${selectionRegion.left}%`,
            top: `${selectionRegion.top + selectionRegion.height}%`,
            zIndex: 1,
          }}
        >
          <div>
            <textarea
              rows={3}
              className="border border-[rgba(0,0,0,0.3)] w-full box-border p-1"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "8px",
            }}
          >
            <div style={{ marginRight: "8px" }}>
              <Button
                onClick={addNote}
                style={{
                  background: "#007bff",
                  color: "#fff",
                  borderRadius: "10px",
                  padding: "4px 8px",
                }}
              >
                추가
              </Button>
            </div>
            <Button
              onClick={cancel}
              style={{
                background: "#6c757d",
                color: "#fff",
                borderRadius: "4px",
                padding: "4px 8px",
              }}
            >
              취소
            </Button>
          </div>
        </div>
      );
    },
    renderHighlights: ({ pageIndex, getCssProperties, rotation }) => (
      <div>
        {notes.map((note) => (
          <React.Fragment key={`note-${note.note_id}`}>
            {note.highlightAreas
              .filter((area) => area.pageIndex === pageIndex)
              .map((area, idx) => (
                <div
                  key={`highlight-${note.note_id}-${idx}`}
                  style={{
                    background: "yellow",
                    opacity: 0.4,
                    ...getCssProperties(area, rotation),
                  }}
                  onClick={() => jumpToNote(note)}
                  ref={(ref) => {
                    noteEles.current.set(note.id, ref);
                  }}
                />
              ))}
          </React.Fragment>
        ))}
      </div>
    ),
  });

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Worker
        workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}
      >
        <Viewer
          fileUrl={pdfUrl}
          defaultScale={SpecialZoomLevel.PageFit}
          plugins={[highlightPluginInstance, defaultLayoutPluginInstance]}
          onDocumentLoad={handleDocumentLoad}
        />
      </Worker>
    </div>
  );
};

export default PDFViewer;
