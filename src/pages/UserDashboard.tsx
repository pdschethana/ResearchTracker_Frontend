/*import React from "react";
import { useAuth } from "../context/AuthContext";

const UserDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: 24 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1>User Dashboard</h1>
        <div>
          <span style={{ marginRight: 12 }}>{user?.username} ({user?.role})</span>
          <button onClick={logout} style={{ padding: "6px 10px" }}>Logout</button>
        </div>
      </header>
      <div>
        <p>Welcome! Here you can view your projects and information.</p>
        {/* Add user-specific UI here *//*}
      </div>
    </div>
  );
};

export default UserDashboard;*/ 

/*import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { Spinner, Navbar, Nav, Container, Table, Button, Card } from "react-bootstrap";

// Interfaces
interface Project {
  id: number;
  title: string;
  description: string;
  status: string;
}

const UserDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Fetch projects from backend
  const fetchProjects = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axiosInstance.get<Project[]>("/projects"); // adjust endpoint as needed
      setProjects(res.data);
    } catch (err: any) {
      console.error(err);
      setError("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      {/* Navbar *//*}
      <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand>Research Project Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/projects">Projects</Nav.Link>
              <Nav.Link as={Link} to="/milestones">Milestones</Nav.Link>
              <Nav.Link as={Link} to="/documents">Documents</Nav.Link>
              {user?.role === "ADMIN" && <Nav.Link as={Link} to="/admin">Admin Panel</Nav.Link>}
            </Nav>
            <Nav>
              <Navbar.Text className="me-3">
                {user?.username} ({user?.role})
              </Navbar.Text>
              <Button variant="outline-danger" size="sm" onClick={logout}>Logout</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <h2 className="mb-4">Welcome, {user?.username}!</h2>

        {/* Loader / Error *//*}
        {loading && <Spinner animation="border" />}
        {error && <p className="text-danger">{error}</p>}

        {/* Projects Table *//*}
        <Card className="mb-4">
          <Card.Header>My Projects</Card.Header>
          <Card.Body>
            {projects.length === 0 && !loading ? (
              <p>No projects found.</p>
            ) : (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.title}</td>
                      <td>{p.description}</td>
                      <td>{p.status}</td>
                      <td>
                        <Button variant="primary" size="sm" onClick={() => navigate(`/projects/${p.id}`)}>View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>

        {/* Placeholder for Milestones / Documents *//*}
        <Card className="mb-4">
          <Card.Header>Milestones</Card.Header>
          <Card.Body>
            <p>Manage project milestones here.</p>
            <Button variant="success" size="sm">Add Milestone</Button>
          </Card.Body>
        </Card>

        <Card className="mb-4">
          <Card.Header>Documents</Card.Header>
          <Card.Body>
            <p>Upload or manage project documents here.</p>
            <Button variant="success" size="sm">Upload Document</Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default UserDashboard;*/  

/*import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";
import { Spinner, Navbar, Nav, Container, Table, Button, Card } from "react-bootstrap";

// Interfaces
interface Project {
  id: number;
  title: string;
  description: string;
  status: string;
}

const UserDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Fetch projects assigned to the user
    const fetchProjects = async () => {
      try {
        const res = await axiosInstance.get<Project[]>("/projects"); // Your backend endpoint
        setProjects(res.data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleView = (id: number) => {
    navigate(`/projects/${id}`);
  };

  const handleAddProject = () => {
    navigate("/projects/new");
  };

  return (
    <>
      {/* Navigation *//*}
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#">Research Tracker</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/projects">Projects</Nav.Link>
            <Nav.Link as={Link} to="/milestones">Milestones</Nav.Link>
            <Nav.Link as={Link} to="/documents">Documents</Nav.Link>
          </Nav>
          <Nav>
            <Navbar.Text className="me-3">
              Signed in as: {user?.username} ({user?.role})
            </Navbar.Text>
            <Button variant="outline-light" onClick={logout}>Logout</Button>
          </Nav>
        </Container>
      </Navbar>

      <Container>
        <h2>My Projects</h2>
        <Button className="mb-3" onClick={handleAddProject}>+ Add New Project</Button>

        {loading ? (
          <div className="d-flex justify-content-center my-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : projects.length === 0 ? (
          <p>No projects assigned yet.</p>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project.id}>
                  <td>{project.id}</td>
                  <td>{project.title}</td>
                  <td>{project.description}</td>
                  <td>{project.status}</td>
                  <td>
                    <Button size="sm" variant="primary" onClick={() => handleView(project.id)}>View</Button>{" "}
                    <Button size="sm" variant="warning">Edit</Button>{" "}
                    <Button size="sm" variant="danger">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>

      {/* Optional Card Section *//*}
      <Container className="mt-5">
        <Card>
          <Card.Body>
            <Card.Title>Welcome, {user?.username}!</Card.Title>
            <Card.Text>
              This dashboard allows you to track your research projects, milestones, and documents.
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default UserDashboard;*/

import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
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

const UserDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch projects assigned to user
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get<Project[]>("/projects"); // Backend should filter projects by user role
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    fetchProjects();
  }, [user]);

  return (
    <div>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Research Tracker - User</Navbar.Brand>
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
        <h2>My Projects</h2>
        {loading ? (
          <Spinner animation="border" />
        ) : projects.length === 0 ? (
          <p>No projects assigned.</p>
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
                    {/* Members can view details; PIs can manage milestones/documents */}
                    <Button
                      size="sm"
                      variant="primary"
                      className="me-2"
                      onClick={() => navigate(`/projects/${project.id}`)}
                    >
                      View
                    </Button>
                    {user?.role === "PI" && (
                      <Button size="sm" variant="success" className="me-2">
                        Manage
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {/* Quick Add Milestone/Document for PI or Member */}
        {user?.role !== "VIEWER" && (
          <Card className="mt-5">
            <Card.Body>
              <Card.Title>Add New Milestone or Document</Card.Title>
              <Button variant="success" className="me-2">
                Add Milestone
              </Button>
              <Button variant="info">Upload Document</Button>
            </Card.Body>
          </Card>
        )}
      </Container>
    </div>
  );
};

export default UserDashboard;


