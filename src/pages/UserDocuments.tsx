import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Table, Button, Spinner, Alert } from "react-bootstrap";
import axiosInstance from "../api/axiosInstance";

interface Document {
  id: number;
  fileName: string;
  fileType: string;
  uploadedBy: string;
  uploadedAt: string;
  fileUrl: string;
}

const UserDocuments: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await axiosInstance.get(`/api/projects/${projectId}/documents`);
        setDocuments(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load documents.");
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [projectId]);

  return (
    <Container style={{ paddingTop: "20px" }}>
      <Button variant="secondary" className="mb-3" onClick={() => navigate(-1)}>
        ← Back
      </Button>

      <Card className="shadow-sm">
        <Card.Body>
          <h3>Project Documents</h3>
          {loading ? (
            <div className="text-center my-3"><Spinner animation="border" /></div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : documents.length === 0 ? (
            <Alert variant="info">No documents available.</Alert>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>File Name</th>
                  <th>Type</th>
                  <th>Uploaded By</th>
                  <th>Uploaded At</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((d) => (
                  <tr key={d.id}>
                    <td>{d.id}</td>
                    <td>{d.fileName}</td>
                    <td>{d.fileType}</td>
                    <td>{d.uploadedBy}</td>
                    <td>{new Date(d.uploadedAt).toLocaleString()}</td>
                    <td>
                      <a href={d.fileUrl} target="_blank" rel="noopener noreferrer">
                        Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserDocuments;
