import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Table, Button, Form, Alert, Card } from "react-bootstrap";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext"; // ✅ Add this

interface Document {
  id?: number;
  fileName: string;
  fileType: string;
  fileUrl: string;
  uploadedAt: string;
  uploadedBy: string;
}

const DocumentDashboard: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { user } = useAuth(); // ✅ Get logged-in user
  const [documents, setDocuments] = useState<Document[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ✅ Fetch all documents for this project
  const fetchDocuments = async () => {
    try {
      const res = await axiosInstance.get(`/api/projects/${projectId}/documents`);
      setDocuments(res.data);
    } catch {
      setError("Failed to load documents");
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [projectId]);

  // ✅ Handle file upload (both ADMIN and MEMBER allowed)
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!file) return setError("Please select a file.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axiosInstance.post(`/api/projects/${projectId}/documents`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("✅ File uploaded successfully!");
      setFile(null);
      fetchDocuments();
    } catch {
      setError("File upload failed.");
    }
  };

  // ✅ Handle delete (ADMIN only)
  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this document?")) return;

    try {
      await axiosInstance.delete(`/api/documents/${id}`);
      setMessage("🗑️ Document deleted successfully.");
      fetchDocuments();
    } catch {
      setError("Failed to delete document.");
    }
  };

  return (
    <Container className="mt-4">
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* ✅ Upload Form */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h4>Upload Document</h4>
          <Form onSubmit={handleUpload}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Control
                type="file"
                onChange={(e) => setFile((e.target as HTMLInputElement).files?.[0] || null)}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Upload
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* ✅ Documents Table */}
      <Card>
        <Card.Body>
          <h4>Documents</h4>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>File Name</th>
                <th>Type</th>
                <th>Uploaded At</th>
                <th>Uploaded By</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {documents.length > 0 ? (
                documents.map((d) => (
                  <tr key={d.id}>
                    <td>{d.id}</td>
                    <td>
                      <a href={d.fileUrl} target="_blank" rel="noopener noreferrer">
                        {d.fileName}
                      </a>
                    </td>
                    <td>{d.fileType}</td>
                    <td>{d.uploadedAt}</td>
                    <td>{d.uploadedBy}</td>
                    <td>
                      {/* ✅ Only show Delete for Admin */}
                      {user?.role === "ADMIN" && (
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDelete(d.id)}
                        >
                          Delete
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">
                    No documents found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DocumentDashboard;
