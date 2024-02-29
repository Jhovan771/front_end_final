import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import NavA from "./NavA";
import { Line } from "react-chartjs-2";

const server_url = import.meta.env.VITE_SERVER_LINK;

const Student = () => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const [totalScores, setTotalScores] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chartData, setChartData] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(null);
  const { sectionID } = useParams();

  const fetchTotalScores = async (studentID) => {
    try {
      console.log("Fetching total scores for student ID:", studentID);
      const response = await Axios.get(
        `${server_url}/api/studentTotalScores?studentId=${studentID}`
      );
      if (response.status === 200) {
        console.log(
          "Total scores fetched successfully:",
          response.data.totalScores
        );
        console.log(
          "Student info fetched successfully:",
          response.data.studentInfo
        );
        return response.data; // Return the entire response
      } else {
        throw new Error("Failed to fetch total scores");
      }
    } catch (error) {
      console.error("Error fetching total scores:", error.message);
      return {}; // Return an empty object on error
    }
  };

  const updateChart = async (studentID) => {
    try {
      console.log("Updating chart for student ID:", studentID);

      // Fetch total scores for the student
      const response = await fetchTotalScores(studentID);
      console.log("Response from fetchTotalScores:", response);

      // Ensure the response contains the expected data
      if (
        response &&
        Array.isArray(response.totalScores) &&
        response.totalScores.length > 0 &&
        response.studentInfo
      ) {
        // Extract totalScores and studentInfo from the response
        const { totalScores, studentInfo } = response;

        // Update local state with totalScores
        setTotalScores(totalScores);

        // Construct newChartData object for chart display
        const newChartData = {
          labels: totalScores.map(
            (score) =>
              `Activity ${score.activityNumber} - Unit ${score.unitNumber}`
          ),
          datasets: [
            {
              label: `${studentInfo.firstName} ${studentInfo.lastName}'s Personal Progress`,
              data: totalScores.map((score) => score.totalScore),
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        };

        console.log("New chart data:", newChartData);

        // Update chartData state with new chart data for the specific student
        setChartData((prevChartData) => ({
          ...prevChartData,
          [studentID]: newChartData,
        }));
      } else {
        console.error("Total scores or student info is empty");
      }
    } catch (error) {
      console.error("Error updating chart data:", error.message);
    }
  };

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        console.log("Fetching student data for section ID:", sectionID);
        const response = await Axios.get(
          `${server_url}/api/studentList?sectionID=${sectionID}`
        );
        console.log("Student data fetched successfully:", response.data);

        // Check if student data is not empty
        if (response.data.length > 0) {
          setStudentData(response.data);
          await updateChart(response.data[0].id);
        } else {
          console.error("Student data is empty");
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred while fetching student data");
      }
    };

    fetchStudentData();
  }, [sectionID]);

  const deleteStudent = async (id) => {
    // Implement delete functionality here
    try {
      const response = await Axios.delete(
        `${server_url}/api/studentData/${id}`
      );

      if (response.status === 204) {
        alert("Student Deleted Successfully.");
      } else {
        alert("Success Deleting Student.");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while deleting the student.");
    } finally {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  const openModal = async (studentId) => {
    // Update the state with the student ID
    setIsModalOpen(true);
    // Update the chart data for the selected student
    await updateChart(studentId);
    // Find and set the selected student
    const student = studentData.find((student) => student.id === studentId);
    if (student) {
      setSelectedStudent(student);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <NavA />
      <div className='addlist-main'>
        <div className='class-starter'></div>
        <div className='addlist-wrapper'>
          <table className='section-list'>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>#</th>
                <th className='section-th' style={{ textAlign: "center" }}>
                  First Name
                </th>
                <th className='section-th' style={{ textAlign: "center" }}>
                  Last Name
                </th>
                <th className='section-th' style={{ textAlign: "center" }}>
                  Section ID
                </th>
                <th className='section-th' style={{ textAlign: "center" }}>
                  Grade
                </th>
                <th className='section-th' style={{ textAlign: "center" }}>
                  Menu
                </th>
              </tr>
            </thead>
            <tbody>
              {studentData.map((student, index) => (
                <tr key={student.id}>
                  <td style={{ textAlign: "center" }}>{index + 1}</td>
                  <td style={{ textAlign: "center" }}>{student.firstName}</td>
                  <td style={{ textAlign: "center" }}>{student.lastName}</td>
                  <td style={{ textAlign: "center" }}>{sectionID}</td>
                  <td style={{ textAlign: "center" }}>
                    {student.final_grade}%
                  </td>
                  <td className='td-control'>
                    <button
                      className='final-class-btn'
                      onClick={() => openModal(student.id)}>
                      View
                    </button>
                    <button
                      className='final-class-btn'
                      onClick={() => deleteStudent(student.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={closeModal}>
              &times;
            </span>
            {selectedStudent && (
              <div>
                <h2>
                  {selectedStudent.firstName} {selectedStudent.lastName}
                </h2>
                <div className='chart-container'>
                  {chartData[selectedStudent.id] ? (
                    <Line data={chartData[selectedStudent.id]} />
                  ) : (
                    <div>No chart data available</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Student;
