import { Worker, Viewer, SpecialZoomLevel, Button, Position, Tooltip } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import packageJson from "../../../package.json";
import { highlightPlugin, MessageIcon } from '@react-pdf-viewer/highlight';

const PDFViewer = ({ pdfUrl }) => {
  const pdfjsVersion = packageJson.dependencies["pdfjs-dist"];
  const renderHighlightTarget = ( props ) => {
    const handleButtonClick = (event) => {
      event.stopPropagation(); // 이벤트 전파(stop propagation)를 막음
      props.toggle(); // props로 전달된 toggle 함수 호출
  };

  return (
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
                  <Button onClick={handleButtonClick}>
                      <MessageIcon />
                  </Button>
              }
              content={() => <div style={{ width: '100px' }}>Add a note</div>}
              offset={{ left: 0, top: -8 }}
          />
      </div>
  );
};

  const highlightPluginInstance = highlightPlugin({
    renderHighlightTarget,
  });

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
