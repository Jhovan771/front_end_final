import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavA from "../NavA";
import Axios from "axios";
import Testbar from "./Testbar";

const server_url = import.meta.env.VITE_SERVER_LINK;

const L5Test1 = () => {
  const wordData = ["Bog", "Fog", "Hog", "Log"];
  const [quizItemsCorrectness, setQuizItemsCorrectness] = useState(
    Array(wordData.length).fill("")
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const { sectionID } = useParams();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    const allItemsAnswered = quizItemsCorrectness.every((item) => item !== "");
    const hasSelectedStudent = !!selectedStudent;

    if (allItemsAnswered && hasSelectedStudent) {
      updateTotalScore(selectedStudent.id, score);
    }
  }, [quizItemsCorrectness, selectedStudent, score]);

  const startListening = (index) => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.lang = "en-US";
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        checkCorrectness(transcript, index);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
      setIsListening(true);

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };
    } else {
      console.error("SpeechRecognition not supported in this browser.");
    }
  };

  const checkCorrectness = (transcript, index) => {
    const currentWord = wordData[index];
    const cleanedTranscript = transcript.trim().toLowerCase();
    const cleanedWord = currentWord.toLowerCase();

    if (cleanedTranscript === cleanedWord) {
      // Pronunciation is correct
      const updatedCorrectness = [...quizItemsCorrectness];
      updatedCorrectness[index] = "Correct";
      setQuizItemsCorrectness(updatedCorrectness);

      // Increment the score
      setScore((prevScore) => prevScore + 1);
    } else {
      // Pronunciation is wrong
      const updatedCorrectness = [...quizItemsCorrectness];
      updatedCorrectness[index] = "Wrong";
      setQuizItemsCorrectness(updatedCorrectness);
    }
  };

  let textToRead =
    "There is a log in the bog. A log in the bog in the fog. Along comes Tom. With his pretty mom. They sit on the log in the bog. On the log in the bog in the fog. 'Oh my God!' says Tom, 'On that log there is a hog!'. I wont sit on that log in the bog. On that log in the bog in the fog. Where is the log? Where is the log in the bog in the fog? What log, my dear? There is nothing here.";

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const readAloud = () => {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    const spanElements = document.querySelectorAll(".words-controller");
    const replacementTexts = [];

    spanElements.forEach((spanElement, index) => {
      const placeholder = `blank`;
      replacementTexts.push(spanElement.textContent);
      textToRead = textToRead.replace(replacementTexts[index], placeholder);
    });

    utterance.text = textToRead;
    speechSynthesis.speak(utterance);

    replacementTexts.forEach((replacementText) => {
      textToRead = textToRead.replace(`blank`, replacementText);
    });
  };

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await Axios.get(
          `${server_url}/api/studentList?sectionID=${sectionID}`
        );
        setStudentData(response.data);
      } catch (error) {
        console.error(error);
        alert("An error occurred while fetching student data.");
      }
    };
    fetchStudentData();
  }, [sectionID]);

  const updateTotalScore = async (studentID, newScore) => {
    try {
      const response = await Axios.post(`${server_url}/api/updateTotalScore`, {
        studentID,
        newScore,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const recordScore = () => {
    if (!selectedStudent) return;

    console.log("Recording score for student:", selectedStudent.id);

    const currentAttempts = attempts[selectedStudent.id] || 0;

    if (currentAttempts >= 3 || score > 4) {
      setDisabled(true);
      alert("Maximum attempts reached or maximum score achieved!");
      console.log("Attempts maxed out or score > 4");
    } else {
      const newAttempts = currentAttempts + 1;

      const newScore = score;
      const scorePercentage = newScore;

      console.log("Storing new score in local storage:", scorePercentage);
      localStorage.setItem(
        `${selectedStudent.id}_attempt_${newAttempts}`,
        scorePercentage
      );
      setAttempts((prevAttempts) => ({
        ...prevAttempts,
        [selectedStudent.id]: newAttempts,
      }));
      setScore(newScore);

      console.log("Updated score:", newScore);

      if (newAttempts >= 3) {
        setDisabled(true);
        alert("Maximum attempts reached!");
      }
    }
  };

  const fetchStudentById = async (studentID, maxAttempts) => {
    try {
      console.log("Fetching student by ID:", studentID);

      if (selectedStudent) {
        console.log(
          "Updating total score for previous student:",
          selectedStudent.id
        );
        updateTotalScore(selectedStudent.id, score);
      }

      setScore(0);
      setQuizItemsCorrectness(Array(wordData.length).fill(""));

      // Get the current attempt for the selected student
      const currentAttempt = attempts[studentID] || 0;
      console.log("Current attempt for student:", currentAttempt);

      const attemptsLeft = maxAttempts - currentAttempt;
      if (attemptsLeft > 0) {
        alert(`You have ${attemptsLeft} attempts left.`);
      } else {
        alert("Maximum attempts reached for this student.");
        console.log("Maximum attempts reached for student:", studentID);
      }

      const response = await Axios.get(
        `${server_url}/api/student?studentID=${studentID}`
      );
      setSelectedStudent(response.data);

      if (currentAttempt < maxAttempts) {
        setAttempts((prevAttempts) => ({
          ...prevAttempts,
          [studentID]: currentAttempt + 1,
        }));
      }

      if (currentAttempt >= maxAttempts) {
        console.log("Maximum attempts reached for student:", studentID);
      }

      if (score >= maxAttempts) {
        console.log("Maximum score reached for student:", studentID);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while fetching student data.");
    }
  };

  const calculateTotalScore = (studentID) => {
    let total = 0;
    for (let i = 1; i <= 3; i++) {
      const attemptScore = parseInt(
        localStorage.getItem(`${studentID}_attempt_${i}`) || 0
      );
      total += attemptScore;
    }
    return total;
  };

  // -------- COPY STARTS HERE -------- //
  useEffect(() => {
    sessionStorage.setItem("unit", "1");
    sessionStorage.setItem("act-num", "5");
    sessionStorage.setItem("title", "A log in the bog in the fog");
  }, []);

  const handleSubmit = async () => {
    const title = sessionStorage.getItem("title");

    if (selectedStudent) {
      const unitNumber = sessionStorage.getItem("unit");
      const activityNumber = sessionStorage.getItem("act-num");

      if (
        !unitNumber ||
        isNaN(unitNumber) ||
        !activityNumber ||
        isNaN(activityNumber)
      ) {
        alert(
          "Invalid input. Please enter valid numbers for unit and activity."
        );
        return;
      }

      const studentID = selectedStudent.id;
      const attemptScores = {};
      for (let i = 1; i <= 3; i++) {
        const attemptScore = parseInt(
          localStorage.getItem(`${studentID}_attempt_${i}`) || 0
        );
        attemptScores[`attempt_${i}`] = attemptScore;
      }

      const total = calculateTotalScore(studentID);

      console.log("Submitting attempt scores for student:", studentID);
      console.log("Unit number:", unitNumber);
      console.log("Activity number:", activityNumber);
      console.log("Attempt scores:", attemptScores);
      console.log("Total score:", total);
      console.log(title);

      try {
        const response = await Axios.post(
          `${server_url}/api/storeAttemptScores`,
          {
            studentID,
            unitNumber,
            activityNumber,
            attemptScores,
            title,
          }
        );
        console.log("Response:", response.data);
        alert("Successfully submitted. Everything up to date.");
      } catch (error) {
        console.error("Error submitting attempt scores:", error);
        alert("An error occurred while sending attempt scores to the server.");
      }
    }
  };

  // ------- COPY ENDS HERE ------ //

  return (
    <div>
      <NavA />
      <div className='class-section-main'>
        <div className='class-section-wrapper'>
          <div className='class-section-sidebar'>
            <Testbar />
          </div>
          <div className='class-section-content'>
            <div className='class-test-main-wrapper'>
              <div className='class-test-box-1'>
                A log in the Bog in the Fog
              </div>
              <div className='class-test-box-2'>
                There is a <span className='words-controller'>log</span> in the{" "}
                <span className='words-controller'>bog</span>. A{" "}
                <span className='words-controller'>log</span> in the{" "}
                <span className='words-controller'>bog</span> in the{" "}
                <span className='words-controller'>fog</span>. Along comes Tom.
                With his pretty mom. They sit on the{" "}
                <span className='words-controller'>log</span> in the{" "}
                <span className='words-controller'>bog</span>. On the{" "}
                <span className='words-controller'>log</span> in the{" "}
                <span className='words-controller'>bog</span> in the{" "}
                <span className='words-controller'>fog</span>. 'Oh my God!' says
                Tom, 'On that <span className='words-controller'>log</span>{" "}
                there is a <span className='words-controller'>hog</span>!'. I
                wont sit on that <span className='words-controller'>log</span>{" "}
                in the <span className='words-controller'>bog</span>. On that{" "}
                <span className='words-controller'>log</span> in the{" "}
                <span className='words-controller'>bog</span> in the{" "}
                <span className='words-controller'>fog</span>. Where is the{" "}
                <span className='words-controller'>log</span>? Where is the{" "}
                <span className='words-controller'>log</span> in the{" "}
                <span className='words-controller'>bog</span> in the{" "}
                <span className='words-controller'>fog</span>? What{" "}
                <span className='words-controller'>log</span>, my dear? There is
                nothing here.
              </div>
              <div className='class-test-box-3'>
                <button
                  className='class-test-button-control'
                  onClick={readAloud}>
                  Listen
                </button>
              </div>
              <div className='class-test-box-4'>
                <table className='class-test-table'>
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Attempt 1</th>
                      <th>Attempt 2</th>
                      <th>Attempt 3</th>
                      <th>Menu</th>
                    </tr>
                  </thead>
                  <tbody style={{ msOverflowY: "auto" }}>
                    {studentData.map((student, index) => (
                      <tr key={student.id}>
                        <td
                          style={{
                            textAlign: "center",
                            backgroundColor: "white",
                            color: "black",
                          }}>
                          {student.firstName}
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            backgroundColor: "white",
                            color: "black",
                          }}>
                          {student.lastName}
                        </td>
                        <td>
                          <td
                            style={{
                              textAlign: "center",
                              backgroundColor: "white",
                              color: "black",
                              display: "flex",
                              width: "100%",
                            }}>
                            {/* Display Attempt 1 score */}
                            <div className='progress-bar'>
                              {console.log(
                                "Attempt 1 score:",
                                localStorage.getItem(`${student.id}_attempt_1`)
                              )}
                              {`${
                                localStorage.getItem(
                                  `${student.id}_attempt_1`
                                ) || 0
                              }`}
                            </div>
                          </td>
                        </td>
                        <td>
                          <td
                            style={{
                              textAlign: "center",
                              backgroundColor: "white",
                              color: "black",
                              display: "flex",
                              width: "100%",
                            }}>
                            {/* Display Attempt 2 score */}
                            <div className='progress-bar'>
                              {console.log(
                                "Attempt 2 score:",
                                localStorage.getItem(`${student.id}_attempt_2`)
                              )}
                              {`${
                                localStorage.getItem(
                                  `${student.id}_attempt_2`
                                ) || 0
                              }`}
                            </div>
                          </td>
                        </td>
                        <td>
                          <td
                            style={{
                              textAlign: "center",
                              backgroundColor: "white",
                              color: "black",
                              display: "flex",
                              width: "100%",
                            }}>
                            {/* Display Attempt 3 score */}
                            <div className='progress-bar'>
                              {console.log(
                                "Attempt 3 score:",
                                localStorage.getItem(`${student.id}_attempt_3`)
                              )}
                              {`${
                                localStorage.getItem(
                                  `${student.id}_attempt_3`
                                ) || 0
                              }`}
                            </div>
                          </td>
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            backgroundColor: "white",
                            color: "black",
                          }}>
                          {/* Display Attempt 2 button */}
                          <button
                            className='l1t1-take-btn'
                            onClick={() => fetchStudentById(student.id)}>
                            Take
                          </button>
                          <button
                            className='l1t1-take-btn'
                            onClick={recordScore}
                            disabled={disabled || attempts[student.id] === 4}>
                            Record
                          </button>
                          <button
                            className='l1t1-take-btn'
                            onClick={handleSubmit}>
                            Submit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className='quiz-items-wrapper'>
            {wordData.map((word, index) => (
              <div className='quiz-items' key={index}>
                <div className='quiz-item'>{word}</div>
                <div className='quiz-item-btn'>
                  <button
                    className='qz-itm-btn'
                    onClick={() => startListening(index)}
                    disabled={quizItemsCorrectness[index] !== ""}>
                    PRONOUNCE
                  </button>
                </div>
                <div className='right-wrong-indicator'>
                  {quizItemsCorrectness[index]}
                </div>
              </div>
            ))}
            <div className='name-of-taker'>
              <div className='student-name'>
                <div
                  className='id-and-name-wrapper'
                  style={{ display: "flex", flexDirection: "row" }}>
                  <input
                    type='text'
                    placeholder='STUDENT ID'
                    style={{
                      color: "black",
                      maxWidth: "32px",
                      padding: "0",
                    }}
                    disabled
                    value={selectedStudent ? selectedStudent.id : ""}
                  />
                  <input
                    type='text'
                    placeholder='STUDENT NAME'
                    style={{ textAlign: "center", color: "black" }}
                    disabled
                    value={
                      selectedStudent
                        ? `${selectedStudent.firstName} ${selectedStudent.lastName}`
                        : ""
                    }
                  />
                </div>

                <div className='quiz-item-indicator-wrapper'>
                  <div
                    className={`quiz-item-indicator ${
                      isListening ? "active-listening-2" : ""
                    } `}></div>
                </div>
                <p style={{ height: "14px" }}>Your Score for this Quiz:</p>
                <input
                  type='text'
                  value={score}
                  style={{
                    textAlign: "center",
                    height: "34px",
                    fontSize: "28px",
                  }}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default L5Test1;
