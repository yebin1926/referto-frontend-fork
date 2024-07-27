import React, { useState, useRef } from 'react';
import { Worker, Viewer, SpecialZoomLevel, Button, Position, Tooltip } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import "@react-pdf-viewer/highlight/lib/styles/index.css";
import packageJson from "../../../package.json";
import { highlightPlugin, MessageIcon } from '@react-pdf-viewer/highlight';

const PDFViewer = ({ pdfUrl }) => {
    const pdfjsVersion = packageJson.dependencies["pdfjs-dist"];
    const [message, setMessage] = useState('');
    const [notes, setNotes] = useState([]);
    const noteEles = useRef(new Map());
    const [currentDoc, setCurrentDoc] = useState(null);
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    // Initialize the plugins
    const highlightPluginInstance = highlightPlugin({
        renderHighlightTarget: ({ selectionRegion, toggle }) => (
            <div
                style={{
                    background: '#eee',
                    display: 'flex',
                    position: 'absolute',
                    left: `${selectionRegion.left}%`,
                    top: `${selectionRegion.top + selectionRegion.height}%`,
                    transform: 'translate(0, 8px)',
                    zIndex: 1000,
                }}
            >
              <Tooltip
                position={Position.TopCenter}
                target={
                    <Button
                        onClick={toggle}
                        style={{
                            background: '#E5E5E5',
                            color: '#171717',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            zIndex: 1000,
                        }}
                    >
                        <MessageIcon />
                    </Button>
                }
                content={() => (
                    <div
                        className='font-[Pretendard]'
                        style={{
                            width: '120px',
                            padding: '8px',
                            background: 'white',
                            color: '#171717',          
                        }}
                    >
                        메모 추가하기
                    </div>
                  )}
                offset={{ left: 0, top: -8 }}
              />
            </div>
        ),
        renderHighlightContent: ({ selectionRegion, highlightAreas, selectedText, cancel }) => {
            const addNote = () => {
                if (message !== '') {
                    const note = {
                        id: notes.length + 1,
                        content: message,
                        highlightAreas,
                        quote: selectedText,
                    };
                    setNotes([...notes, note]);
                    setMessage('');
                    cancel();
                }
            };

            return (
                <div
                    style={{
                        background: '#fff',
                        border: '1px solid rgba(0, 0, 0, .3)',
                        borderRadius: '2px',
                        padding: '8px',
                        position: 'absolute',
                        left: `${selectionRegion.left}%`,
                        top: `${selectionRegion.top + selectionRegion.height}%`,
                        zIndex: 1,
                    }}
                >
                    <div>
                        <textarea
                            rows={3}
                            style={{
                                border: '1px solid rgba(0, 0, 0, .3)',
                                width: '100%',
                                boxSizing: 'border-box',
                                padding: '4px',
                            }}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            marginTop: '8px',
                        }}
                    >
                        <div style={{ marginRight: '8px' }}>
                            <Button
                                onClick={addNote}
                                style={{
                                    background: '#007bff',
                                    color: '#fff',
                                    borderRadius: '10px',
                                    padding: '4px 8px',
                                }}
                            >
                                추가
                            </Button>
                        </div>
                        <Button
                            onClick={cancel}
                            style={{
                                background: '#6c757d',
                                color: '#fff',
                                borderRadius: '4px',
                                padding: '4px 8px',
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
                    <React.Fragment key={note.id}>
                        {note.highlightAreas
                            .filter((area) => area.pageIndex === pageIndex)
                            .map((area, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        background: 'yellow',
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

    const handleDocumentLoad = (e) => {
        setCurrentDoc(e.doc);
        if (currentDoc && currentDoc !== e.doc) {
            setNotes([]);
        }
    };

    const jumpToHighlightArea = (highlightArea) => {
        if (currentDoc) {
            currentDoc.getPage(highlightArea.pageIndex + 1).then((pdfPage) => {
                const viewport = pdfPage.getViewport({ scale: 1 });
                const left = highlightArea.left * viewport.width;
                const top = highlightArea.top * viewport.height;
                window.scrollTo({
                    top,
                    left,
                    behavior: 'smooth',
                });
            });
        }
    };

    const jumpToNote = (note) => {
        if (noteEles.current.has(note.id)) {
            noteEles.current.get(note.id).scrollIntoView({ behavior: 'smooth' });
        }
    };

    const Sidebar = ({ notes, jumpToHighlightArea }) => (
        <div className="w-[250px] h-100% text-neutral-900 font-[Pretendard] font-bold py-2 pl-3 overflowY-auto" >
            메모
            {notes.map((note) => (
                <div
                    key={note.id}
                    onClick={() => jumpToHighlightArea(note.highlightAreas[0])}
                    className='cursor-pointer py-2 border-b-2 border-neutral-300'
                >
                    <div className="text-neutral-500 font-[Pretendard] font-medium">{note.quote}</div>
                    <div className="text-neutral-900 font-[Pretendard] font-medium">{note.content}</div>
                </div>
            ))}
        </div>
    );

    return (
        <div style={{ display: 'flex', width: "100%", height: "100vh" }}>
            <div style={{ flex: 1, position: 'relative' }}>
                <Worker
                    workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}
                >
                    <Viewer
                        fileUrl={pdfUrl}
                        defaultScale={SpecialZoomLevel.PageFit}
                        plugins={[highlightPluginInstance]}
                        onDocumentLoad={handleDocumentLoad}
                    />
                </Worker>
                <button 
                    onClick={toggleSidebar}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        padding: '8px 12px',
                        background: '#171717',
                        color: '#fff',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    {showSidebar ? '메모 닫기' : '메모 보기'}
                </button>
            </div>
            {showSidebar && <Sidebar notes={notes} jumpToHighlightArea={jumpToHighlightArea} />}
        </div>        
    );
};

export default PDFViewer;