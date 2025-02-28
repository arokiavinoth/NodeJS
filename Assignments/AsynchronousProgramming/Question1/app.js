const express = require('express');
const fs = require('fs').promises;
const app = express();
const port = 3000;

const getEmployees = async () => {
  const data = await fs.readFile('employees.json', 'utf8');
  return JSON.parse(data);
};

const getProjects = async () => {
  const data = await fs.readFile('projects.json', 'utf8');
  return JSON.parse(data);
};

app.get('/employee/:id', async (req, res) => {
  console.log(req.params.id);
  const employees = await getEmployees();
  console.log(employees);
  const employee = employees.find((emp) => emp.id === req.params.id);
  console.log(employee);
  if (!employee) {
    return res.status(404).send('Employee not found');
  }
  res.send(employee);
});

app.get('/project/:id', async (req, res) => {
  const projects = await getProjects();
  const project = projects.find((proj) => proj.id === req.params.id);
  if (!project) {
    return res.status(404).send('Project not found');
  }
  res.send(project);
});

app.get('/getemployeedetails/:id', async (req, res) => {
  const employees = await getEmployees();
  const projects = await getProjects();
  const employee = employees.find((emp) => emp.id === req.params.id);
  if (!employee) {
    return res.status(404).send('Employee not found');
  }
  console.log(employee);
  const projectid = employee.projectId;
  console.log(projectid);
  if (projectid !== undefined && projectid !== null) {
    const employeeProject = projects.find((proj) => proj.id === projectid);
    console.log(employeeProject);
    return res.send({ ...employee, projects: employeeProject });
  } else {
    return res.status(404).send('Error while fetching records.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
