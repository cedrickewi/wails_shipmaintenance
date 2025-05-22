import MaintenanceTrackingDocument from "@/components/pdfstyles/DeclarationPan"
import { PDFViewer } from "@react-pdf/renderer"

function PrintDeclarationPan() {
  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <MaintenanceTrackingDocument />
    </PDFViewer>
  )
}

export default PrintDeclarationPan