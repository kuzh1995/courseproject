// App.js
import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentList, { StudentDetails, UpdateStudent, DeleteStudent } from './components/student/student';
import {
  // CreateCourse,
  CourseList,
  // CourseDetails,
  // UpdateCourse,
  // DeleteCourse,
} from './components/course/course';
import Header from './components/header/header';
import Coursedetail from './components/course/coursedetail';
import Studentdetail from './components/student/studentdetail';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        <section>
          {children}
        </section>
      </main>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><CourseList /></Layout>} />
        <Route path="/courses/details/:id" element={<Layout><Coursedetail /></Layout>} />
        <Route path="/dashboards" element={<Layout><StudentList /></Layout>} />
        <Route path="/students/details/:id" element={<Layout><Studentdetail /></Layout>} />

        {/* Uncomment the routes and components below if needed in the future */}
        {/* <Route path="/students/create" element={<CreateStudent />} />
        <Route path="/students/:id" element={<StudentDetails />} />
        <Route path="/students/:id/update" element={<UpdateStudent />} />
        <Route path="/students/:id/delete" element={<DeleteStudent />} />
        <Route path="/students" element={<StudentList />} /> */}

        {/* <Route path="/courses/create" element={<CreateCourse />} /> */}
        {/* <Route path="/courses/:id" element={<CourseDetails />} /> */}
        {/* <Route path="/courses/:id/update" element={<UpdateCourse />} /> */}
        {/* <Route path="/courses/:id/delete" element={<DeleteCourse />} /> */}
        {/* <Route path="/courses" element={<CourseList />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
