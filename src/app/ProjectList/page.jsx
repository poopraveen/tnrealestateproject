'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const ProjectList = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: 'SM Nager 1', plots: 25 },
    { id: 2, name: 'SM Nager 2', plots: 30 },
    { id: 3, name: 'SM Nager 3', plots: 20 },
    { id: 4, name: 'SM Nager 4', plots: 15 },
  ]);

  const handleDelete = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const handleAddProject = () => {
    const newProject = {
      id: Date.now(),
      name: `SM Nager ${projects.length + 1}`,
      plots: Math.floor(Math.random() * 50) + 10,
    };
    setProjects([...projects, newProject]);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-center">Projects</h2>
      <h3 className="text-lg font-medium mt-4">Available Projects</h3>
      <div className="mt-2 space-y-2">
              {projects.map((project) => (
                  <Link href="/PlotInfo">
                      <div key={project.id} className="flex justify-between items-center p-3 bg-gray-100 rounded-md shadow">
                          <div>
                              <p className="font-semibold">{project.name}</p>
                              <p className="text-sm text-gray-600">Number of Plots: {project.plots}</p>
                          </div>
                          <button onClick={() => handleDelete(project.id)} className="text-gray-500 hover:text-red-500">
                              🗑️
                          </button>
                      </div>
                  </Link>
              ))}
      </div>
      <button
        onClick={handleAddProject}
        className="w-full mt-4 p-3 bg-blue-500 text-white rounded-md text-center font-medium hover:bg-blue-600"
      >
        + Add New Project
      </button>
    </div>
  );
};

export default ProjectList;
