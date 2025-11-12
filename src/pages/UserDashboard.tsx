

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Table, Button, Alert, Spinner } from "react-bootstrap";
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

const UserDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  // Fetch only this user's projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axiosInstance.get(`/api/projects/user/${user?.username}`);
        console.log(res.data);
        setProjects(res.data || []);
      } catch (err) {
        console.error("Error loading projects:", err);
        setError("Failed to load projects.");
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    if (user?.username) fetchProjects();
  }, [user]);

  // Logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Container style={{ paddingTop: "20px", paddingBottom: "40px" }}>
      {/* Top Bar */}
      <Card className="mb-4 p-3 bg-primary text-white shadow-sm">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ margin: 0 }}>Research Tracker</h2>
            <small>
              Welcome, <strong>{user?.username}</strong> ({user?.role})
            </small>
          </div>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Card>

      {/* Feedback */}
      {error && <Alert variant="danger">{error}</Alert>}

      <h3 style={{ color: "#1e293b", marginBottom: "15px" }}>My Assigned Projects</h3>

      {/* Loading Spinner */}
      {loading ? (
        <div className="text-center my-3">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : projects.length === 0 ? (
        <Alert variant="info">No assigned projects available.</Alert>
      ) : (
        <Card className="shadow-sm">
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Summary</th>
                  <th>Status</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Actions</th>
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
                      {/* Updated routes for read-only user view */}
                      <Button
                        variant="primary"
                        size="sm"
                        className="me-2 mb-1"
                        onClick={() => navigate(`/user/projects/${p.id}/milestones`)}
                      >
                        View Milestones
                      </Button>
                      <Button
                        variant="success"
                        size="sm"
                        className="mb-1"
                        onClick={() => navigate(`/user/projects/${p.id}/documents`)}
                      >
                        View Documents
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default UserDashboard;


