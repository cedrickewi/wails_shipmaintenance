import MaintenanceReportPDF from "@/components/pdfstyles/DeclarationPan"
import { GetLogIssueReportByID } from "../../../wailsjs/go/db/DatabaseService"
import { PDFViewer } from "@react-pdf/renderer"
import { db } from "wailsjs/go/models";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useIssueContext } from "@/context/IssueContext";

function PrintDeclarationPanne() {
  const { id } = useParams();
  const {logIssues}= useIssueContext()

  const [issue, setIssue] = useState<db.LogIssueReport | null>(null);

  useEffect(() => {
    if (id && logIssues) {
      const foundIssue = logIssues.find(issue => issue.issue_id === Number(id));
      if (foundIssue) {
        setIssue(foundIssue); // Add reporter_id with a default value
        setLoading(false);
      } else {
        setError("Issue not found");
        setLoading(false);
      }
    }
  }, [id, logIssues]);
 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!issue) return <div>No issue found</div>;

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        style={{
          margin: '10px',
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Back
      </button>
      <PDFViewer style={{ width: '100%', height: '90vh' }}>
        <MaintenanceReportPDF issue={issue} />
      </PDFViewer>
    </div>
  )
}

export default PrintDeclarationPanne