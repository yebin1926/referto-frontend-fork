import { Worker, Viewer, SpecialZoomLevel, Button, Position, Tooltip } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import packageJson from "../../../package.json";
import { highlightPlugin, MessageIcon, HighlightArea, SelectionData, RenderHighlightTargetProps } from '@react-pdf-viewer/highlight';
import { useState } from "react";


const PDFViewer = ({ pdfUrl }) => {
  const pdfjsVersion = packageJson.dependencies["pdfjs-dist"];
  
  const renderHighlightTarget = (props) => (
    <div
      style={{
        background: '#eee',
        display: 'flex',
        position: 'absolute',
        left: `${props.selectionRegion.left}%`,
        top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
        transform: 'translate(0, 8px)',
      }}
    >
      <Tooltip
        position={Position.TopCenter}
        target={
          <Button onClick={props.toggle}>
            <MessageIcon />
          </Button>
        }
        content={() => <div style={{ width: '100px' }}>Add a note</div>}
        offset={{ left: 0, top: -8 }}
      />
    </div>
  );
  
  const highlightPluginInstance = highlightPlugin({
    renderHighlightTarget,
  });

  const [message, setMessage] = useState('');
  const [notes, setNotes] = useState([]);
  let noteId = notes.length;

  const renderHighlightContent = (props) => {
      const addNote = () => {
          // Only add message if it's not empty
          if (message !== '') {
              const note = {
                  // Increase the id manually
                  id: ++noteId,
                  content: message,
                  highlightAreas: props.highlightAreas,
                  quote: props.selectedText,
              };
              setNotes(notes.concat([note]));

              // Close the form
              props.cancel();
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
                  left: `${props.selectionRegion.left}%`,
                  top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
                  zIndex: 1,
              }}
          >
              <div>
                  <textarea
                      rows={3}
                      style={{
                          border: '1px solid rgba(0, 0, 0, .3)',
                      }}
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
                      <Button onClick={addNote}>Add</Button>
                  </div>
                  <Button onClick={props.cancel}>Cancel</Button>
              </div>
          </div>
      );
  };
  

  return (
    <div style={{ width: "100%", height: "100%", overflowY: "auto" }}>
      <Worker
        workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}
      >
        <Viewer
          fileUrl={pdfUrl}
          defaultScale={SpecialZoomLevel.PageFit}
          plugins={[highlightPluginInstance]}
        />
      </Worker>
    </div>
  );
};

export default PDFViewer;
