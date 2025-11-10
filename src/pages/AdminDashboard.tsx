/*import React from "react";
import { useAuth } from "../context/AuthContext";

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: 24 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1>Admin Dashboard</h1>
        <div>
          <span style={{ marginRight: 12 }}>{user?.username} ({user?.role})</span>
          <button onClick={logout} style={{ padding: "6px 10px" }}>Logout</button>
        </div>
      </header>
      <div>
        <p>Welcome, admin! Here you can manage the system.</p>
        {/* Add admin-specific UI here *//*}
      </div>
    </div>
  );
};

export default AdminDashboard;*/  

/*import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { Table, Button, Navbar, Nav, Container, Spinner, Card } from "react-bootstrap";

// Interfaces
interface User {
  id: string;
  username: string;
  role: string;
  fullName?: string;
}

interface Project {
  id: string;
  title: string;
  summary: string;
  status: string;
  pi?: User;
  tags?: string;
  startDate?: string;
  endDate?: string;
}

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loadingProjects, setLoadingProjects] = useState<boolean>(true);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true);

  // Fetch all projects
  const fetchProjects = async () => {
    setLoadingProjects(true);
    try {
      const res = await axiosInstance.get<Project[]>("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingProjects(false);
    }
  };

  // Fetch all users
  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await axiosInstance.get<User[]>("/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    // Only allow ADMIN
    if (user?.role !== "ADMIN") {
      navigate("/login");
    }
    fetchProjects();
    fetchUsers();
  }, [user]);

  return (
    <div>
      {/* Navbar *//*}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Research Tracker - Admin</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Item>
              <span style={{ color: "#fff", marginRight: 16 }}>
                {user?.username} ({user?.role})
              </span>
            </Nav.Item>
            <Button variant="outline-light" onClick={logout}>
              Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <Container style={{ marginTop: 24 }}>
        {/* Projects Section *//*}
        <h2>Projects</h2>
        {loadingProjects ? (
          <Spinner animation="border" />
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>PI</th>
                <th>Tags</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td>{project.status}</td>
                  <td>{project.pi?.username || "N/A"}</td>
                  <td>{project.tags}</td>
                  <td>
                    <Button size="sm" variant="primary" className="me-2">
                      Edit
                    </Button>
                    <Button size="sm" variant="danger">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {/* Users Section *//*}
        <h2 className="mt-5">Users</h2>
        {loadingUsers ? (
          <Spinner animation="border" />
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Username</th>
                <th>Full Name</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.username}</td>
                  <td>{u.fullName || "N/A"}</td>
                  <td>{u.role}</td>
                  <td>
                    <Button size="sm" variant="primary" className="me-2">
                      Edit
                    </Button>
                    <Button size="sm" variant="danger">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {/* Quick Add Project Card *//*}
        <Card className="mt-5">
          <Card.Body>
            <Card.Title>Add New Project</Card.Title>
            <Button variant="success">Add Project</Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default AdminDashboard;*/  


/*import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface Project {
  id?: number;
  title: string;
  summary: string;
  status: string;
  startDate: string;
  endDate: string;
}

const AdminDashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<Project>({
    title: "",
    summary: "",
    status: "PLANNING",
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string>("");

  const navigate = useNavigate();
  const { logout } = useAuth(); // ✅ use same AuthContext logout

  // ✅ Logout handler
  const handleLogout = () => {
    logout(); // clear user + token
    navigate("/login");
  };

  // ✅ Fetch all projects
  const fetchProjects = async () => {
    try {
      const res = await axiosInstance.get("/api/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setMessage("❌ Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ✅ Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Add new project
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    try {
      await axiosInstance.post("/api/projects", form);
      setMessage("✅ Project added successfully!");
      setForm({
        title: "",
        summary: "",
        status: "PLANNING",
        startDate: "",
        endDate: "",
      });
      fetchProjects();
    } catch (err) {
      console.error("Error adding project:", err);
      setMessage("❌ Failed to add project.");
    }
  };

  // ✅ Delete project
  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      await axiosInstance.delete(`/api/projects/${id}`);
      setMessage("🗑️ Project deleted successfully.");
      fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
      setMessage("❌ Failed to delete project.");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        background: "#f9fafb",
        minHeight: "100vh",
      }}
    >
      {/* ✅ Header with Logout *//*}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h2>Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          style={{
            background: "#dc2626",
            color: "#fff",
            border: "none",
            borderRadius: 5,
            padding: "8px 14px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>

      {/* ✅ Message *//*}
      {message && (
        <div
          style={{
            marginBottom: 20,
            padding: "10px",
            background:
              message.startsWith("✅") || message.startsWith("🗑️")
                ? "#d1fae5"
                : "#fee2e2",
            color:
              message.startsWith("✅") || message.startsWith("🗑️")
                ? "#065f46"
                : "#b91c1c",
            borderRadius: 5,
            textAlign: "center",
          }}
        >
          {message}
        </div>
      )}

      {/* ✅ Add Project Form *//*}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "10px",
          background: "#fff",
          padding: 20,
          borderRadius: 8,
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          marginBottom: 30,
        }}
      >
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="summary"
          placeholder="Summary"
          value={form.summary}
          onChange={handleChange}
          required
        />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="PLANNING">PLANNING</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="ON_HOLD">ON_HOLD</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="ARCHIVED">ARCHIVED</option>
        </select>
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          style={{
            gridColumn: "1 / -1",
            background: "#2563eb",
            color: "#fff",
            padding: "10px 0",
            border: "none",
            borderRadius: 5,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Add Project
        </button>
      </form>

      {/* ✅ Project Table *//*}
      {loading ? (
        <p>Loading projects...</p>
      ) : projects.length === 0 ? (
        <p style={{ textAlign: "center" }}>No projects found.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <thead>
            <tr style={{ background: "#e5e7eb" }}>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>ID</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                Title
              </th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                Summary
              </th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                Status
              </th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                Start
              </th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>End</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {p.id}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {p.title}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {p.summary}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {p.status}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {p.startDate}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {p.endDate}
                </td>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  <button
                    onClick={() => handleDelete(p.id)}
                    style={{
                      background: "#dc2626",
                      color: "#fff",
                      border: "none",
                      borderRadius: 4,
                      padding: "6px 12px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;*/   


/*import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Navbar,
  Nav,
  Table,
  Button,
  Form,
  Spinner,
  Alert,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

interface Project {
  id?: number;
  title: string;
  summary: string;
  status: string;
  startDate: string;
  endDate: string;
}

const AdminDashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<Project>({
    title: "",
    summary: "",
    status: "PLANNING",
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // ✅ Enforce admin-only access
  useEffect(() => {
    if (user?.role !== "ADMIN") {
      navigate("/login");
    }
  }, [user, navigate]);

  // ✅ Fetch all projects
  const fetchProjects = async () => {
    try {
      const res = await axiosInstance.get("/api/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ✅ Handle form changes (universal fix for Bootstrap Form.Control)
  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Add new project
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await axiosInstance.post("/api/projects", form);
      setMessage("✅ Project added successfully!");
      setForm({
        title: "",
        summary: "",
        status: "PLANNING",
        startDate: "",
        endDate: "",
      });
      fetchProjects();
    } catch (err) {
      console.error("Error adding project:", err);
      setError("Failed to add project.");
    }
  };

  // ✅ Delete project
  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      await axiosInstance.delete(`/api/projects/${id}`);
      setMessage("🗑️ Project deleted successfully.");
      fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
      setError("Failed to delete project.");
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* ✅ Navbar *//*}
      <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand>Research Tracker (Admin)</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/admin">Projects</Nav.Link>
              <Nav.Link as={Link} to="/milestones">Milestones</Nav.Link>
              <Nav.Link as={Link} to="/documents">Documents</Nav.Link>
            </Nav>
            <Nav>
              <Navbar.Text className="me-3">
                {user?.username} ({user?.role})
              </Navbar.Text>
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        {/* ✅ Feedback Messages *//*}
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* ✅ Add Project Form *//*}
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <h4>Add New Project</h4>
            <Form onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col md={4}>
                  <Form.Control
                    name="title"
                    placeholder="Project Title"
                    value={form.title}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col md={4}>
                  <Form.Control
                    name="summary"
                    placeholder="Summary"
                    value={form.summary}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col md={4}>
                  <Form.Select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="PLANNING">PLANNING</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="ON_HOLD">ON_HOLD</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </Form.Select>
                </Col>
                <Col md={6}>
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col xs={12}>
                  <Button type="submit" variant="primary" className="w-100">
                    Add Project
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>

        {/* ✅ Projects Table *//*}
        <Card className="shadow-sm">
          <Card.Body>
            <h4>Project List</h4>
            {loading ? (
              <div className="text-center my-3">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : projects.length === 0 ? (
              <p>No projects available.</p>
            ) : (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Summary</th>
                    <th>Status</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.title}</td>
                      <td>{p.summary}</td>
                      <td>{p.status}</td>
                      <td>{p.startDate}</td>
                      <td>{p.endDate}</td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(p.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default AdminDashboard;*/

/*import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Navbar,
  Nav,
  Table,
  Button,
  Form,
  Spinner,
  Alert,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

interface Project {
  id?: number;
  title: string;
  summary: string;
  status: string;
  startDate: string;
  endDate: string;
}

const AdminDashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<Project>({
    title: "",
    summary: "",
    status: "PLANNING",
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // ✅ Enforce admin-only access
  useEffect(() => {
    if (user?.role !== "ADMIN") {
      navigate("/login");
    }
  }, [user, navigate]);

  // ✅ Fetch all projects
  const fetchProjects = async () => {
    try {
      const res = await axiosInstance.get("/api/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ✅ Handle form input
  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Add or Update project
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      if (form.id) {
        await axiosInstance.put(`/api/projects/${form.id}`, form);
        setMessage("✅ Project updated successfully!");
      } else {
        await axiosInstance.post("/api/projects", form);
        setMessage("✅ Project added successfully!");
      }

      setForm({
        title: "",
        summary: "",
        status: "PLANNING",
        startDate: "",
        endDate: "",
      });
      fetchProjects();
    } catch (err) {
      console.error("Error saving project:", err);
      setError("Failed to save project.");
    }
  };

  // ✅ Delete project
  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      await axiosInstance.delete(`/api/projects/${id}`);
      setMessage("🗑️ Project deleted successfully.");
      fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
      setError("Failed to delete project.");
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* ✅ Navbar *//*}
      <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand>Research Tracker (Admin)</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/admin">
                Projects
              </Nav.Link>
              <Nav.Link as={Link} to="/milestones">
                Milestones
              </Nav.Link>
              <Nav.Link as={Link} to="/documents">
                Documents
              </Nav.Link>
            </Nav>
            <Nav>
              <Navbar.Text className="me-3">
                {user?.username} ({user?.role})
              </Navbar.Text>
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        {/* ✅ Feedback Messages *//*}
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* ✅ Add/Update Project Form *//*}
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <h4>{form.id ? "Edit Project" : "Add New Project"}</h4>
            <Form onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col md={4}>
                  <Form.Control
                    name="title"
                    placeholder="Project Title"
                    value={form.title}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col md={4}>
                  <Form.Control
                    name="summary"
                    placeholder="Summary"
                    value={form.summary}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col md={4}>
                  <Form.Select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="PLANNING">PLANNING</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="ON_HOLD">ON_HOLD</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </Form.Select>
                </Col>
                <Col md={6}>
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col xs={12}>
                  <Button type="submit" variant="primary" className="w-100">
                    {form.id ? "Update Project" : "Add Project"}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>

        {/* ✅ Projects Table *//*}
        <Card className="shadow-sm">
          <Card.Body>
            <h4>Project List</h4>
            {loading ? (
              <div className="text-center my-3">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : projects.length === 0 ? (
              <p>No projects available.</p>
            ) : (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Summary</th>
                    <th>Status</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.title}</td>
                      <td>{p.summary}</td>
                      <td>{p.status}</td>
                      <td>{p.startDate}</td>
                      <td>{p.endDate}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => setForm(p)} // Prefill form for editing
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(p.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default AdminDashboard;*/ 

/*import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Navbar,
  Nav,
  Table,
  Button,
  Form,
  Spinner,
  Alert,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

interface Project {
  id?: number;
  title: string;
  summary: string;
  status: string;
  startDate: string;
  endDate: string;
}

const AdminDashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<Project>({
    title: "",
    summary: "",
    status: "PLANNING",
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // ✅ Enforce admin-only access
  useEffect(() => {
    if (user?.role !== "ADMIN") {
      navigate("/login");
    }
  }, [user, navigate]);

  // ✅ Fetch all projects
  const fetchProjects = async () => {
    try {
      const res = await axiosInstance.get("/api/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ✅ Handle form input
  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Add or Update project
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      if (form.id) {
        await axiosInstance.put(`/api/projects/${form.id}`, form);
        setMessage("✅ Project updated successfully!");
      } else {
        await axiosInstance.post("/api/projects", form);
        setMessage("✅ Project added successfully!");
      }

      setForm({
        title: "",
        summary: "",
        status: "PLANNING",
        startDate: "",
        endDate: "",
      });
      fetchProjects();
    } catch (err) {
      console.error("Error saving project:", err);
      setError("Failed to save project.");
    }
  };

  // ✅ Delete project
  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      await axiosInstance.delete(`/api/projects/${id}`);
      setMessage("🗑️ Project deleted successfully.");
      fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
      setError("Failed to delete project.");
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* ✅ Navbar *//*}
      <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand>Research Tracker (Admin)</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/admin">
                Projects
              </Nav.Link>
              {/* Removed the direct Milestones link — navigation is project-specific *//*}
              <Nav.Link as={Link} to="/documents">
                Documents
              </Nav.Link>
            </Nav>
            <Nav>
              <Navbar.Text className="me-3">
                {user?.username} ({user?.role})
              </Navbar.Text>
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        {/* ✅ Feedback Messages *//*}
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* ✅ Add/Update Project Form *//*}
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <h4>{form.id ? "Edit Project" : "Add New Project"}</h4>
            <Form onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col md={4}>
                  <Form.Control
                    name="title"
                    placeholder="Project Title"
                    value={form.title}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col md={4}>
                  <Form.Control
                    name="summary"
                    placeholder="Summary"
                    value={form.summary}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col md={4}>
                  <Form.Select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="PLANNING">PLANNING</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="ON_HOLD">ON_HOLD</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </Form.Select>
                </Col>
                <Col md={6}>
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col xs={12}>
                  <Button type="submit" variant="primary" className="w-100">
                    {form.id ? "Update Project" : "Add Project"}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>

        {/* ✅ Projects Table *//*}
        <Card className="shadow-sm">
          <Card.Body>
            <h4>Project List</h4>
            {loading ? (
              <div className="text-center my-3">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : projects.length === 0 ? (
              <p>No projects available.</p>
            ) : (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Summary</th>
                    <th>Status</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.title}</td>
                      <td>{p.summary}</td>
                      <td>{p.status}</td>
                      <td>{p.startDate}</td>
                      <td>{p.endDate}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => setForm(p)} // Prefill form for editing
                        >
                          Edit
                        </Button>
                        <Button
                          variant="info"
                          size="sm"
                          className="me-2"
                          onClick={() => navigate(`/projects/${p.id}/milestones`)} // ✅ Navigate to milestones
                        >
                          View Milestones
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(p.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default AdminDashboard;*/  

/*import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Navbar,
  Nav,
  Table,
  Button,
  Form,
  Spinner,
  Alert,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

interface Project {
  id?: number;
  title: string;
  summary: string;
  status: string;
  startDate: string;
  endDate: string;
}

const AdminDashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<Project>({
    title: "",
    summary: "",
    status: "PLANNING",
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Enforce admin-only access
  useEffect(() => {
    if (user?.role !== "ADMIN") {
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      const res = await axiosInstance.get("/api/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle form input
  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Add or Update project
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      if (form.id) {
        await axiosInstance.put(`/api/projects/${form.id}`, form);
        setMessage("✅ Project updated successfully!");
      } else {
        await axiosInstance.post("/api/projects", form);
        setMessage("✅ Project added successfully!");
      }

      setForm({
        title: "",
        summary: "",
        status: "PLANNING",
        startDate: "",
        endDate: "",
      });
      fetchProjects();
    } catch (err) {
      console.error("Error saving project:", err);
      setError("Failed to save project.");
    }
  };

  // Delete project
  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      await axiosInstance.delete(`/api/projects/${id}`);
      setMessage("🗑️ Project deleted successfully.");
      fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
      setError("Failed to delete project.");
    }
  };

  // Logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* Navbar *//*}
      <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand>Research Tracker (Admin)</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/admin">
                Projects
              </Nav.Link>
            </Nav>
            <Nav>
              <Navbar.Text className="me-3">
                {user?.username} ({user?.role})
              </Navbar.Text>
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        {/* Feedback Messages *//*}
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Add/Update Project Form *//*}
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <h4>{form.id ? "Edit Project" : "Add New Project"}</h4>
            <Form onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col md={4}>
                  <Form.Control
                    name="title"
                    placeholder="Project Title"
                    value={form.title}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col md={4}>
                  <Form.Control
                    name="summary"
                    placeholder="Summary"
                    value={form.summary}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col md={4}>
                  <Form.Select name="status" value={form.status} onChange={handleChange}>
                    <option value="PLANNING">PLANNING</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="ON_HOLD">ON_HOLD</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </Form.Select>
                </Col>
                <Col md={6}>
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col xs={12}>
                  <Button type="submit" variant="primary" className="w-100">
                    {form.id ? "Update Project" : "Add Project"}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>

        {/* Projects Table *//*}
        <Card className="shadow-sm">
          <Card.Body>
            <h4>Project List</h4>
            {loading ? (
              <div className="text-center my-3">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : projects.length === 0 ? (
              <p>No projects available.</p>
            ) : (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Summary</th>
                    <th>Status</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.title}</td>
                      <td>{p.summary}</td>
                      <td>{p.status}</td>
                      <td>{p.startDate}</td>
                      <td>{p.endDate}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => setForm(p)}
                        >
                          Edit
                        </Button>

                        <Button
                          variant="info"
                          size="sm"
                          className="me-2"
                          onClick={() => navigate(`/projects/${p.id}/milestones`)}
                        >
                          View Milestones
                        </Button>

                        <Button
                          variant="success"
                          size="sm"
                          className="me-2"
                          onClick={() => navigate(`/projects/${p.id}/documents`)}
                        >
                          View Documents
                        </Button>

                        <Button variant="danger" size="sm" onClick={() => handleDelete(p.id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default AdminDashboard;*/  


import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Navbar,
  Nav,
  Table,
  Button,
  Form,
  Spinner,
  Alert,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import Select from "react-select"; // ✅ Added for user multi-select
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

interface Project {
  id?: number;
  title: string;
  summary: string;
  status: string;
  startDate: string;
  endDate: string;
  assignedUsers?: string[]; // usernames
}

interface UserOption {
  value: string;
  label: string;
}

const AdminDashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<Project>({
    title: "",
    summary: "",
    status: "PLANNING",
    startDate: "",
    endDate: "",
    assignedUsers: [],
  });
  const [users, setUsers] = useState<UserOption[]>([]);
  const [assignedUsers, setAssignedUsers] = useState<UserOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Enforce admin-only access
  useEffect(() => {
    if (user?.role !== "ADMIN") {
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const res = await axiosInstance.get("/api/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch users for assignment
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("/api/users"); // return list of users
        setUsers(res.data.map((u: any) => ({ value: u.username, label: u.username })));
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle form input
  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle edit click
  const handleEdit = (p: Project) => {
    setForm(p);
    setAssignedUsers((p.assignedUsers || []).map(u => ({ value: u, label: u })));
  };

  // Add or update project
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const payload = {
        ...form,
        assignedUsers: assignedUsers.map(u => u.value),
      };

      if (form.id) {
        await axiosInstance.put(`/api/projects/${form.id}`, payload);
        setMessage("✅ Project updated successfully!");
      } else {
        await axiosInstance.post("/api/projects", payload);
        setMessage("✅ Project added successfully!");
      }

      setForm({
        title: "",
        summary: "",
        status: "PLANNING",
        startDate: "",
        endDate: "",
        assignedUsers: [],
      });
      setAssignedUsers([]);
      fetchProjects();
    } catch (err) {
      console.error("Error saving project:", err);
      setError("Failed to save project.");
    }
  };

  // Delete project
  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      await axiosInstance.delete(`/api/projects/${id}`);
      setMessage("🗑️ Project deleted successfully.");
      fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
      setError("Failed to delete project.");
    }
  };

  // Logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand>Research Tracker (Admin)</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/admin">Projects</Nav.Link>
            </Nav>
            <Nav>
              <Navbar.Text className="me-3">
                {user?.username} ({user?.role})
              </Navbar.Text>
              <Button variant="danger" onClick={handleLogout}>Logout</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Add/Update Project Form */}
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <h4>{form.id ? "Edit Project" : "Add New Project"}</h4>
            <Form onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col md={4}>
                  <Form.Control
                    name="title"
                    placeholder="Project Title"
                    value={form.title}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col md={4}>
                  <Form.Control
                    name="summary"
                    placeholder="Summary"
                    value={form.summary}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col md={4}>
                  <Form.Select name="status" value={form.status} onChange={handleChange}>
                    <option value="PLANNING">PLANNING</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="ON_HOLD">ON_HOLD</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </Form.Select>
                </Col>

                <Col md={6}>
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control type="date" name="startDate" value={form.startDate} onChange={handleChange} required />
                </Col>
                <Col md={6}>
                  <Form.Label>End Date</Form.Label>
                  <Form.Control type="date" name="endDate" value={form.endDate} onChange={handleChange} required />
                </Col>

                {/* ✅ Assign Users */}
                <Col md={12}>
                  <Form.Label>Assign Users</Form.Label>
                  <Select
                    isMulti
                    options={users}
                    value={assignedUsers}
                    onChange={(selected: any) => setAssignedUsers(selected)}
                  />
                </Col>

                <Col xs={12}>
                  <Button type="submit" variant="primary" className="w-100">
                    {form.id ? "Update Project" : "Add Project"}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>

        {/* Projects Table */}
        <Card className="shadow-sm">
          <Card.Body>
            <h4>Project List</h4>
            {loading ? (
              <div className="text-center my-3"><Spinner animation="border" variant="primary" /></div>
            ) : projects.length === 0 ? (
              <p>No projects available.</p>
            ) : (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Summary</th>
                    <th>Status</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Assigned Users</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.title}</td>
                      <td>{p.summary}</td>
                      <td>{p.status}</td>
                      <td>{p.startDate}</td>
                      <td>{p.endDate}</td>
                      <td>{(p.assignedUsers || []).join(", ")}</td>
                      <td>
                        <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(p)}>Edit</Button>
                        <Button variant="info" size="sm" className="me-2" onClick={() => navigate(`/projects/${p.id}/milestones`)}>View Milestones</Button>
                        <Button variant="success" size="sm" className="me-2" onClick={() => navigate(`/projects/${p.id}/documents`)}>View Documents</Button>
                        <Button variant="danger" size="sm" onClick={() => handleDelete(p.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default AdminDashboard;





