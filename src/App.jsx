import { Routes, Route } from "react-router-dom";
import background from "./assets/backG.jpg";

import MLogin from "./pages/MLogin";
import MRegister from "./pages/MRegister";
import Navbar from "./pages/Navbar";
import About from "./pages/About";
import Home from "./pages/Home";
import HomeA from "./admin/HomeA";
import Dashboard from "./admin/Dashboard";
import Assessment from "./admin/Assessment";
import Student from "./admin/Student";
import Practice from "./pages/Practice";
import NormalPage from "./pages/NormalPage";
import HardPage from "./pages/HardPage";
import StartClass from "./admin/StartClass";
import Lesson1 from "./admin/units/Lesson1";
import L1Test1 from "./admin/activities/L1Test1";
import Lesson2 from "./admin/units/Lesson2";
import L2Test1 from "./admin/activities/L2Test1";
import Lesson3 from "./admin/units/Lesson3";
import L3Test1 from "./admin/activities/L3Test1";
import FinalExam from "./admin/units/FinalExam";
import Examination from "./admin/units/Examination";
import Lesson4 from "./admin/units/Lesson4";
import L4Test1 from "./admin/activities/L4Test1";
import Lesson5 from "./admin/units/Lesson5";
import L5Test1 from "./admin/activities/L5Test1";
import Unit2 from "./admin/units/unit2/Unit2";
import UT1 from "./admin/activities/act-unit2/UT1";
import Unit2L2 from "./admin/units/unit2/Unit2L2";
import UT2 from "./admin/activities/act-unit2/UT2";
import UT3 from "./admin/activities/act-unit2/UT3";
import Unit2L3 from "./admin/units/unit2/Unit2L3";
import Unit2L4 from "./admin/units/unit2/Unit2L4";
import UT4 from "./admin/activities/act-unit2/UT4";
import Unit2L5 from "./admin/units/unit2/Unit2L5";
import UT5 from "./admin/activities/act-unit2/UT5";
import Lesson6 from "./admin/units/Lesson6";
import L6Test1 from "./admin/activities/L6Test1";
import Unit2L6 from "./admin/units/unit2/Unit2L6";
import UT6 from "./admin/activities/act-unit2/UT6";
import Unit2L7 from "./admin/units/unit2/Unit2L7";
import UT7 from "./admin/activities/act-unit2/UT7";
import Unit2L8 from "./admin/units/unit2/Unit2L8";
import UT8 from "./admin/activities/act-unit2/UT8";
import Unit2L9 from "./admin/units/unit2/Unit2L9";
import UT9 from "./admin/activities/act-unit2/UT9";
import Unit3L1 from "./admin/units/unit3/Unit3L1";
import UT3L1 from "./admin/activities/act-unit3/UT3L1";
import Unit3L2 from "./admin/units/unit3/Unit3L2";
import UT3L2 from "./admin/activities/act-unit3/UT3L2";
import Unit3L3 from "./admin/units/unit3/Unit3L3";
import UT3L3 from "./admin/activities/act-unit3/UT3L3";
import Unit3L4 from "./admin/units/unit3/Unit3L4";
import UT3L4 from "./admin/activities/act-unit3/UT3L4";
import Unit3L5 from "./admin/units/unit3/Unit3L5";
import UT3L5 from "./admin/activities/act-unit3/UT3L5";
import Unit3L6 from "./admin/units/unit3/Unit3L6";
import UT3L6 from "./admin/activities/act-unit3/UT3L6";
import Unit3L7 from "./admin/units/unit3/Unit3L7";
import UT3L7 from "./admin/activities/act-unit3/UT3L7";
import Unit4L1 from "./admin/units/unit4/Unit4L1";
import UT4L1 from "./admin/activities/act-unit4/UT4L1";
import Unit4L2 from "./admin/units/unit4/Unit4L2";
import UT4L2 from "./admin/activities/act-unit4/UT4L2";
import Unit4L3 from "./admin/units/unit4/Unit4L3";
import UT4L3 from "./admin/activities/act-unit4/UT4L3";
import Unit4L4 from "./admin/units/unit4/Unit4L4";
import UT4L4 from "./admin/activities/act-unit4/UT4L4";
import Unit4L5 from "./admin/units/unit4/Unit4L5";
import UT4L5 from "./admin/activities/act-unit4/UT4L5";
import Unit4L6 from "./admin/units/unit4/Unit4L6";
import UT4L6 from "./admin/activities/act-unit4/UT4L6";
import Unit4L7 from "./admin/units/unit4/Unit4L7";
import UT4L7 from "./admin/activities/act-unit4/UT4L7";

function App() {
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
      }}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/navbar' element={<Navbar />} />
        <Route path='/modified-login' element={<MLogin />} />
        <Route path='/homeA' element={<HomeA />} />
        <Route path='/register' element={<MRegister />} />
        <Route path='/about' element={<About />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/practice' element={<Practice />} />
        <Route path='/lvlNormal' element={<NormalPage />} />
        <Route path='/lvlHard' element={<HardPage />} />
        <Route path='/student/:sectionID' element={<Student />} />
        <Route path='/startClass/:sectionID' element={<StartClass />} />
        <Route path='/lesson1/:sectionID' element={<Lesson1 />} />
        <Route path='/l1t1/:sectionID' element={<L1Test1 />} />
        <Route path='/lesson2/:sectionID' element={<Lesson2 />} />
        <Route path='/lesson4/:sectionID' element={<Lesson4 />} />
        <Route path='/l2t1/:sectionID' element={<L2Test1 />} />
        <Route path='/lesson3/:sectionID' element={<Lesson3 />} />
        <Route path='/assessment' element={<Assessment />} />
        <Route path='/l3t1/:sectionID' element={<L3Test1 />} />
        <Route path='/finalExam/:sectionID' element={<FinalExam />} />
        <Route path='/examination/:studentID' element={<Examination />} />
        <Route path='/unit1/:sectionID' element={<StartClass />} />

        <Route path='/lesson5/:sectionID' element={<Lesson5 />} />
        <Route path='/lesson6/:sectionID' element={<Lesson6 />} />
        <Route path='/l4t1/:sectionID' element={<L4Test1 />} />
        <Route path='/l5t1/:sectionID' element={<L5Test1 />} />
        <Route path='/l6t1/:sectionID' element={<L6Test1 />} />

        <Route path='/unit2/:sectionID' element={<Unit2 />} />
        <Route path='/unit2l2/:sectionID' element={<Unit2L2 />} />
        <Route path='/unit2l3/:sectionID' element={<Unit2L3 />} />
        <Route path='/unit2l4/:sectionID' element={<Unit2L4 />} />
        <Route path='/unit2l5/:sectionID' element={<Unit2L5 />} />
        <Route path='/unit2l6/:sectionID' element={<Unit2L6 />} />
        <Route path='/unit2l7/:sectionID' element={<Unit2L7 />} />
        <Route path='/unit2l8/:sectionID' element={<Unit2L8 />} />
        <Route path='/unit2l9/:sectionID' element={<Unit2L9 />} />

        <Route path='/ut1/:sectionID' element={<UT1 />} />
        <Route path='/ut2/:sectionID' element={<UT2 />} />
        <Route path='/ut3/:sectionID' element={<UT3 />} />
        <Route path='/ut4/:sectionID' element={<UT4 />} />
        <Route path='/ut5/:sectionID' element={<UT5 />} />
        <Route path='/ut6/:sectionID' element={<UT6 />} />
        <Route path='/ut7/:sectionID' element={<UT7 />} />
        <Route path='/ut8/:sectionID' element={<UT8 />} />
        <Route path='/ut9/:sectionID' element={<UT9 />} />

        <Route path='/unit3l1/:sectionID' element={<Unit3L1 />} />
        <Route path='/unit3l2/:sectionID' element={<Unit3L2 />} />
        <Route path='/unit3l3/:sectionID' element={<Unit3L3 />} />
        <Route path='/unit3l4/:sectionID' element={<Unit3L4 />} />
        <Route path='/unit3l5/:sectionID' element={<Unit3L5 />} />
        <Route path='/unit3l6/:sectionID' element={<Unit3L6 />} />
        <Route path='/unit3l7/:sectionID' element={<Unit3L7 />} />

        <Route path='/ut3l1/:sectionID' element={<UT3L1 />} />
        <Route path='/ut3l2/:sectionID' element={<UT3L2 />} />
        <Route path='/ut3l3/:sectionID' element={<UT3L3 />} />
        <Route path='/ut3l4/:sectionID' element={<UT3L4 />} />
        <Route path='/ut3l5/:sectionID' element={<UT3L5 />} />
        <Route path='/ut3l6/:sectionID' element={<UT3L6 />} />
        <Route path='/ut3l7/:sectionID' element={<UT3L7 />} />

        <Route path='/unit4l1/:sectionID' element={<Unit4L1 />} />
        <Route path='/unit4l2/:sectionID' element={<Unit4L2 />} />
        <Route path='/unit4l3/:sectionID' element={<Unit4L3 />} />
        <Route path='/unit4l4/:sectionID' element={<Unit4L4 />} />
        <Route path='/unit4l5/:sectionID' element={<Unit4L5 />} />
        <Route path='/unit4l6/:sectionID' element={<Unit4L6 />} />
        <Route path='/unit4l7/:sectionID' element={<Unit4L7 />} />

        <Route path='/ut4l1/:sectionID' element={<UT4L1 />} />
        <Route path='/ut4l2/:sectionID' element={<UT4L2 />} />
        <Route path='/ut4l3/:sectionID' element={<UT4L3 />} />
        <Route path='/ut4l4/:sectionID' element={<UT4L4 />} />
        <Route path='/ut4l5/:sectionID' element={<UT4L5 />} />
        <Route path='/ut4l6/:sectionID' element={<UT4L6 />} />
        <Route path='/ut4l7/:sectionID' element={<UT4L7 />} />
      </Routes>
    </div>
  );
}

export default App;
