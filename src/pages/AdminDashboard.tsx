


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
      {/* Navbar *//*}
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

        {/* Add/Update Project Form *//*/*}
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

                {/* ✅ Assign Users *//*}
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

        {/* Projects Table *//*}
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
import Select from "react-select";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

interface Project {
  id?: number;
  title: string;
  summary: string;
  status: string;
  startDate: string;
  endDate: string;
  assignedUsers?: string[];
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

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("/api/users");
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

  // Handle input change
  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle edit
  const handleEdit = (p: Project) => {
    setForm(p);
    setAssignedUsers((p.assignedUsers || []).map((u) => ({ value: u, label: u })));
  };

  // Submit (add/update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const payload = {
        ...form,
        assignedUsers: assignedUsers.map((u) => u.value),
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

  // Delete
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
              {/* ✅ Navigates to AllProjects */}
              <Nav.Link as={Link} to="/allprojects">
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
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Add / Update Project Form */}
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

                {/* Assign Users */}
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

        {/* Project List */}
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
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEdit(p)}
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

export default AdminDashboard;






