import React from "react";
import ProjectsTable from "../components/ProjectsTable/ProjectsTable";
import { useEffect, useState } from "react";
import axios from "./../axios";
import { projectEndpoints } from "../shared/config/endpoints";

const AvailableProjectsPage = () => {
  const formatDate = (date) => {
    const dateObject = new Date(date);
    return dateObject.toISOString().substring(0, 10);
  };

  const [projectsList, setProjectsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(projectEndpoints.getAvailableProjects, {
        params: {
          page: 0,
          size: 10,
          sort: "asc",
        },
      })
      .then((resp) => {
        setLoading(false);
        console.log(resp.data.content);
        setProjectsList(resp.data.content);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response);
      });
  }, []);

  return (
    <>
      <ProjectsTable
        formatDate={formatDate}
        projectsList={projectsList}
        setProjectsList={setProjectsList}
        loading={loading}
        setLoading={setLoading}
      />
    </>
  );
};

export default AvailableProjectsPage;
