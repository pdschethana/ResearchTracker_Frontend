   

/*import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Table, Button, Alert } from "react-bootstrap";
import axiosInstance from "../api/axiosInstance";

interface Milestone {
  id?: number;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

const UserMilestones: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchMilestones = async () => {
    try {
      const res = await axiosInstance.get(`/api/projects/${projectId}/milestones`);
      setMilestones(res.data);
    } catch {
      setError("Failed to load milestones");
    }
  };

  useEffect(() => {
    fetchMilestones();
  }, [projectId]);

  // ✅ Updated to call new /status endpoint
  const updateStatus = async (id: number, completed: boolean) => {
    try {
      await axiosInstance.put(`/api/milestones/${id}/status`, { completed });
      setMessage("✅ Status updated successfully");
      fetchMilestones();
    } catch {
      setError("Failed to update status");
    }
  };

  return (
    <Container className="mt-4">
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <h4>My Milestones</h4>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {milestones.map((m) => (
            <tr key={m.id}>
              <td>{m.title}</td>
              <td>{m.description}</td>
              <td>{m.dueDate}</td>
              <td>{m.completed ? "✅ Completed" : "❌ Not Completed"}</td>
              <td>
                <Button
                  size="sm"
                  variant={m.completed ? "secondary" : "success"}
                  onClick={() => updateStatus(m.id!, !m.completed)}
                >
                  {m.completed ? "Mark Not Completed" : "Mark Completed"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserMilestones;*/ 

/*import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Table, Button, Alert, Form, Card } from "react-bootstrap";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

interface Milestone {
  id?: number;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

interface ProjectFile {
  id?: number;
  fileName: string;
  uploadedBy: string;
}

const UserMilestones: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { user } = useAuth();
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [projectFiles, setProjectFiles] = useState<ProjectFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ✅ Fetch milestones
  const fetchMilestones = async () => {
    try {
      const res = await axiosInstance.get(`/api/projects/${projectId}/milestones`);
      setMilestones(res.data);
    } catch {
      setError("Failed to load milestones");
    }
  };

  // ✅ Fetch uploaded project files
  const fetchFiles = async () => {
    try {
      const res = await axiosInstance.get(`/api/projects/${projectId}/files`);
      setProjectFiles(res.data);
    } catch {
      setError("Failed to load project files");
    }
  };

  useEffect(() => {
    fetchMilestones();
    fetchFiles();
  }, [projectId]);

  // ✅ Update milestone status
  const updateStatus = async (id: number, completed: boolean) => {
    try {
      await axiosInstance.put(`/api/milestones/${id}/status`, { completed });
      setMessage("✅ Status updated successfully");
      fetchMilestones();
    } catch {
      setError("Failed to update status");
    }
  };

  // ✅ Handle file upload (Final Project)
  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !user) return;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("uploadedBy", user?.username || "Unknown");

    try {
      await axiosInstance.post(`/api/projects/${projectId}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("✅ File uploaded successfully!");
      fetchFiles();
      setSelectedFile(null);
    } catch {
      setError("Failed to upload file");
    }
  };

  return (
    <Container className="mt-4">
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* ✅ Milestones Table *//*}
      <h4>My Milestones</h4>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {milestones.map((m) => (
            <tr key={m.id}>
              <td>{m.title}</td>
              <td>{m.description}</td>
              <td>{m.dueDate}</td>
              <td>{m.completed ? "✅ Completed" : "❌ Not Completed"}</td>
              <td>
                <Button
                  size="sm"
                  variant={m.completed ? "secondary" : "success"}
                  onClick={() => updateStatus(m.id!, !m.completed)}
                >
                  {m.completed ? "Mark Not Completed" : "Mark Completed"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* ✅ Final Project Upload Section *//*}
      <Card className="mt-5 shadow-sm">
        <Card.Body>
          <h4>📁 Upload Final Project</h4>
          <Form onSubmit={handleFileUpload}>
            <Form.Control
              type="file"
              onChange={(e) =>
                setSelectedFile((e.target as HTMLInputElement).files?.[0] || null)
              }
              className="mb-3"
              required
            />
            <Button type="submit" variant="primary">
              Upload Final Project
            </Button>
          </Form>

          {/* ✅ Uploaded Files Table *//*}
          <h5 className="mt-4">Uploaded Files</h5>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>File Name</th>
                <th>Uploaded By</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {projectFiles.length > 0 ? (
                projectFiles.map((f) => (
                  <tr key={f.id}>
                    <td>{f.fileName}</td>
                    <td>{f.uploadedBy}</td>
                    <td>
                      <a
                        href={`/api/projects/files/download/${f.fileName}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center">
                    No files uploaded yet.
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

export default UserMilestones;*/ 

/*import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Table, Button, Alert, Form, Card } from "react-bootstrap";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

interface Milestone {
  id?: number;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

interface ProjectFile {
  id?: number;
  fileName: string;
  uploadedBy: string;
}

const UserMilestones: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { user } = useAuth();
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [projectFiles, setProjectFiles] = useState<ProjectFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch milestones
  const fetchMilestones = async () => {
    try {
      const res = await axiosInstance.get(`/api/projects/${projectId}/milestones`);
      setMilestones(res.data);
    } catch {
      setError("Failed to load milestones");
    }
  };

  // Fetch uploaded project files
  const fetchFiles = async () => {
    try {
      const res = await axiosInstance.get(`/api/projects/${projectId}/files`);
      setProjectFiles(res.data);
    } catch {
      setError("Failed to load project files");
    }
  };

  useEffect(() => {
    fetchMilestones();
    fetchFiles();
  }, [projectId]);

  // Update milestone status
  const updateStatus = async (id: number, completed: boolean) => {
    try {
      await axiosInstance.put(`/api/milestones/${id}/status`, { completed });
      setMessage("✅ Status updated successfully");
      fetchMilestones();
    } catch {
      setError("Failed to update status");
    }
  };

  // Handle file upload
  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !user) return;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("uploadedBy", user.username || "Unknown");

    try {
      await axiosInstance.post(`/api/projects/${projectId}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("✅ File uploaded successfully!");
      fetchFiles(); // Refresh files table
      setSelectedFile(null);
    } catch {
      setError("Failed to upload file");
    }
  };

  return (
    <Container className="mt-4">
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Milestones Table *//*}
      <h4>My Milestones</h4>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {milestones.map((m) => (
            <tr key={m.id}>
              <td>{m.title}</td>
              <td>{m.description}</td>
              <td>{m.dueDate}</td>
              <td>{m.completed ? "✅ Completed" : "❌ Not Completed"}</td>
              <td>
                <Button
                  size="sm"
                  variant={m.completed ? "secondary" : "success"}
                  onClick={() => updateStatus(m.id!, !m.completed)}
                >
                  {m.completed ? "Mark Not Completed" : "Mark Completed"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Final Project Upload *//*}
      <Card className="mt-5 shadow-sm">
        <Card.Body>
          <h4>📁 Upload Final Project</h4>
          <Form onSubmit={handleFileUpload}>
            <Form.Control
              type="file"
              onChange={(e) =>
                setSelectedFile((e.target as HTMLInputElement).files?.[0] || null)
              }
              className="mb-3"
              required
            />
            <Button type="submit" variant="primary">
              Upload Final Project
            </Button>
          </Form>

          {/* Uploaded Files Table *//*}
          <h5 className="mt-4">Uploaded Files</h5>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>File Name</th>
                <th>Uploaded By</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {projectFiles.length > 0 ? (
                projectFiles.map((f) => (
                  <tr key={f.id}>
                    <td>{f.fileName}</td>
                    <td>{f.uploadedBy}</td>
                    <td>
                      <a
                        href={`/api/projects/files/download/${f.fileName}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center">
                    No files uploaded yet.
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

export default UserMilestones;*/  

/*import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Table, Button, Alert, Form, Card } from "react-bootstrap";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

interface Milestone {
  id?: number;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

interface ProjectFile {
  id?: number;
  fileName: string;
  uploadedBy: string;
  filePath?: string;
}

const UserMilestones: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { user } = useAuth();
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [projectFiles, setProjectFiles] = useState<ProjectFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchMilestones = async () => {
    try {
      const res = await axiosInstance.get(`/api/projects/${projectId}/milestones`);
      setMilestones(res.data);
    } catch {
      setError("Failed to load milestones");
    }
  };

  const fetchFiles = async () => {
    try {
      const res = await axiosInstance.get(`/api/projects/${projectId}/files`);
      setProjectFiles(res.data.map((f: any) => ({
        id: f.id,
        fileName: f.fileName,
        uploadedBy: f.uploadedBy,
        filePath: f.fileUrl
      })));
    } catch {
      setError("Failed to load project files");
    }
  };

  useEffect(() => {
    fetchMilestones();
    fetchFiles();
  }, [projectId]);

  const updateStatus = async (id: number, completed: boolean) => {
    try {
      await axiosInstance.put(`/api/milestones/${id}/status`, { completed });
      setMessage("✅ Status updated successfully");
      fetchMilestones();
    } catch {
      setError("Failed to update status");
    }
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !user) return;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("uploadedBy", user.username || "Unknown");

    try {
      await axiosInstance.post(`/api/projects/${projectId}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("✅ File uploaded successfully!");
      fetchFiles();
      setSelectedFile(null);
    } catch {
      setError("Failed to upload file");
    }
  };

  return (
    <Container className="mt-4">
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <h4>My Milestones</h4>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {milestones.map((m) => (
            <tr key={m.id}>
              <td>{m.title}</td>
              <td>{m.description}</td>
              <td>{m.dueDate}</td>
              <td>{m.completed ? "✅ Completed" : "❌ Not Completed"}</td>
              <td>
                <Button
                  size="sm"
                  variant={m.completed ? "secondary" : "success"}
                  onClick={() => updateStatus(m.id!, !m.completed)}
                >
                  {m.completed ? "Mark Not Completed" : "Mark Completed"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Card className="mt-5 shadow-sm">
        <Card.Body>
          <h4>📁 Upload Final Project</h4>
          <Form onSubmit={handleFileUpload}>
            <Form.Control
              type="file"
              onChange={(e) =>
                setSelectedFile((e.target as HTMLInputElement).files?.[0] || null)
              }
              className="mb-3"
              required
            />
            <Button type="submit" variant="primary">
              Upload Final Project
            </Button>
          </Form>

          <h5 className="mt-4">Uploaded Files</h5>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>File Name</th>
                <th>Uploaded By</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {projectFiles.length > 0 ? (
                projectFiles.map((f) => (
                  <tr key={f.id}>
                    <td>{f.fileName}</td>
                    <td>{f.uploadedBy}</td>
                    <td>
                      <a href={f.filePath} target="_blank" rel="noopener noreferrer">
                        Download
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center">
                    No files uploaded yet.
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

export default UserMilestones;*/  

/*import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Table, Button, Alert, Form, Card } from "react-bootstrap";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

interface Milestone { id?: number; title: string; description: string; dueDate: string; completed: boolean; }
interface ProjectFile { id?: number; fileName: string; uploadedBy: string; filePath?: string; }

const UserMilestones: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { user } = useAuth();
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [projectFiles, setProjectFiles] = useState<ProjectFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState(""); const [error, setError] = useState("");

  const fetchMilestones = async () => { try { const res = await axiosInstance.get(`/api/projects/${projectId}/milestones`); setMilestones(res.data); } catch { setError("Failed to load milestones"); } };
  const fetchFiles = async () => { try { const res = await axiosInstance.get(`/api/projects/${projectId}/files`); setProjectFiles(res.data.map((f:any)=>({ id:f.id,fileName:f.fileName,uploadedBy:f.uploadedBy,filePath:f.fileUrl }))); } catch { setError("Failed to load project files"); } };

  useEffect(() => { fetchMilestones(); fetchFiles(); }, [projectId]);

  const updateStatus = async (id:number,completed:boolean) => { try { await axiosInstance.put(`/api/milestones/${id}/status`, { completed }); setMessage("✅ Status updated"); fetchMilestones(); } catch { setError("Failed to update status"); } };
  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault(); if (!selectedFile || !user) return;
    const formData = new FormData(); formData.append("file", selectedFile); formData.append("uploadedBy", user.username || "Unknown");
    try { await axiosInstance.post(`/api/projects/${projectId}/upload`, formData, { headers: { "Content-Type": "multipart/form-data" } }); setMessage("✅ File uploaded!"); fetchFiles(); setSelectedFile(null); } catch { setError("Failed to upload file"); }
  };

  return (
    <Container className="mt-4">
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <h4>My Milestones</h4>
      <Table striped bordered hover responsive>
        <thead><tr><th>Title</th><th>Description</th><th>Due Date</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>{milestones.map(m=>(<tr key={m.id}><td>{m.title}</td><td>{m.description}</td><td>{m.dueDate}</td><td>{m.completed?"✅":"❌"}</td>
          <td><Button size="sm" variant={m.completed?"secondary":"success"} onClick={()=>updateStatus(m.id!,!m.completed)}>{m.completed?"Mark Not Completed":"Mark Completed"}</Button></td>
        </tr>))}</tbody>
      </Table>

      <Card className="mt-5 shadow-sm">
        <Card.Body>
          <h4>📁 Upload Final Project</h4>
          <Form onSubmit={handleFileUpload}>
            <Form.Control type="file" onChange={e=>setSelectedFile((e.target as HTMLInputElement).files?.[0]||null)} className="mb-3" required />
            <Button type="submit" variant="primary">Upload Final Project</Button>
          </Form>

          <h5 className="mt-4">Uploaded Files</h5>
          <Table striped bordered hover responsive>
            <thead><tr><th>File Name</th><th>Uploaded By</th><th>Download</th></tr></thead>
            <tbody>{projectFiles.length>0?projectFiles.map(f=>(<tr key={f.id}><td>{f.fileName}</td><td>{f.uploadedBy}</td>
              <td><a href={f.filePath} target="_blank" rel="noopener noreferrer">Download</a></td>
            </tr>)):<tr><td colSpan={3} className="text-center">No files uploaded yet.</td></tr>}</tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserMilestones;*/ 

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Table, Button, Alert, Form, Card } from "react-bootstrap";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

interface Milestone { 
  id?: number; 
  title: string; 
  description: string; 
  dueDate: string; 
  completed: boolean; 
}

interface ProjectFile { 
  id?: number; 
  fileName: string; 
  uploadedBy: string;
  uploadedAt?: string;
  fileUrl?: string;
}

const UserMilestones: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { user } = useAuth();
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [projectFiles, setProjectFiles] = useState<ProjectFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const fetchMilestones = async () => {
    try {
      const res = await axiosInstance.get(`/api/projects/${projectId}/milestones`);
      setMilestones(res.data);
    } catch {
      setError("Failed to load milestones");
    }
  };

  const fetchFiles = async () => {
    try {
      const res = await axiosInstance.get(`/api/projects/${projectId}/files`);
      console.log("Fetched files:", res.data);
      setProjectFiles(res.data);
    } catch {
      setError("Failed to load project files");
    }
  };

  useEffect(() => {
    fetchMilestones();
    fetchFiles();
  }, [projectId]);

  const updateStatus = async (id: number, completed: boolean) => {
    try {
      await axiosInstance.put(`/api/milestones/${id}/status`, { completed });
      setMessage("✅ Status updated");
      fetchMilestones();
    } catch {
      setError("Failed to update status");
    }
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !user) return;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("uploadedBy", user.username || "Unknown");

    setUploading(true);
    try {
      const response = await axiosInstance.post(
        `/api/projects/${projectId}/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Upload response:", response.data);
      setMessage("✅ File uploaded!");
      fetchFiles();
      setSelectedFile(null);
      // Reset file input
      const fileInput = document.getElementById("fileInput") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.response?.data || "Failed to upload file");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Handle file download
  const handleDownload = (fileUrl: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container className="mt-4">
      {message && <Alert variant="success" dismissible onClose={() => setMessage("")}>{message}</Alert>}
      {error && <Alert variant="danger" dismissible onClose={() => setError("")}>{error}</Alert>}

      <h4>My Milestones</h4>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {milestones.map((m) => (
            <tr key={m.id}>
              <td>{m.title}</td>
              <td>{m.description}</td>
              <td>{m.dueDate}</td>
              <td>{m.completed ? "✅" : "❌"}</td>
              <td>
                <Button
                  size="sm"
                  variant={m.completed ? "secondary" : "success"}
                  onClick={() => updateStatus(m.id!, !m.completed)}
                >
                  {m.completed ? "Mark Not Completed" : "Mark Completed"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Card className="mt-5 shadow-sm">
        <Card.Body>
          <h4>📁 Upload Final Project</h4>
          <Form onSubmit={handleFileUpload}>
            <Form.Control
              id="fileInput"
              type="file"
              onChange={(e) =>
                setSelectedFile((e.target as HTMLInputElement).files?.[0] || null)
              }
              className="mb-3"
              required
              disabled={uploading}
            />
            <Button type="submit" variant="primary" disabled={uploading || !selectedFile}>
              {uploading ? "Uploading..." : "Upload Final Project"}
            </Button>
          </Form>

          <h5 className="mt-4">Uploaded Files</h5>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>File Name</th>
                <th>Uploaded By</th>
                <th>Uploaded At</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {projectFiles.length > 0 ? (
                projectFiles.map((f) => (
                  <tr key={f.id}>
                    <td>{f.fileName}</td>
                    <td>{f.uploadedBy}</td>
                    <td>{new Date(f.uploadedAt!).toLocaleString()}</td>
                    <td>
                      <Button
                        size="sm"
                        variant="success"
                        onClick={() => handleDownload(f.fileUrl!, f.fileName)}
                      >
                        Download
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center">
                    No files uploaded yet.
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

export default UserMilestones;



