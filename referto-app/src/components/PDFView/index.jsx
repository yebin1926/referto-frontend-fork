import { Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import packageJson from "../../../package.json";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// import { toolbarPlugin } from "@react-pdf-viewer/toolbar";

const PDFViewer = ({ pdfUrl }) => {
  const pdfjsVersion = packageJson.dependencies["pdfjs-dist"];
  // const toolbarPluginInstance = toolbarPlugin();
  // const { Toolbar } = toolbarPluginInstance;
  return (
    <div style={{ width: "100%", height: "100%", overflowY: "auto" }}>
      <Worker
        workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}
      >
        <Viewer
          fileUrl={pdfUrl}
          defaultScale={SpecialZoomLevel.PageFit}
          // plugins={[toolbarPluginInstance]}
        />

        {/* <Toolbar /> */}
      </Worker>
    </div>
  );
};

export default PDFViewer;
