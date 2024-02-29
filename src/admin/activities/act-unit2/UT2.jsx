import { React, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavA from "../../NavA";
import Axios from "axios";
import Testbar from "./act-unit2-bar/Testbar2";

const server_url = import.meta.env.VITE_SERVER_LINK;

const UT2 = () => {
  const wordData = ["Prepare", "Market", "Excited", "Shelf"];
  const [quizItemsCorrectness, setQuizItemsCorrectness] = useState(
    Array(wordData.length).fill("")
  );
  const [studentData, setStudentData] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const { sectionID } = useParams();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [attemptScores, setAttemptScores] = useState([]);

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
    "Trish has a wish. She wishes to prepare a dish. She like fish in her dish. 'The fish must be fresh,' said Trish. Trish went to the market. She looked for some fresh veggies. She found everything she wanted. Now, she's excited to prepare her dish. Trish rushed home. She took the things from a shelf. She washed the fish. She sprinkled some salt on her dish. Trish look a heart-shaped shell. There she placed here tasty dish. Now, she's readu to serve it. A perfect dish from trish.";

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

      const currentAttempt = (attempts[studentID] || 0) + 1; // Get the current attempt
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

      setAttempts((prevAttempts) => ({
        ...prevAttempts,
        [studentID]: currentAttempt,
      }));

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

    const currentAttempts = attempts[selectedStudent.id];

    if (currentAttempts >= 4 || score >= 4) {
      setDisabled(true);
      console.log("Attempts maxed out or score >= 3");
    } else {
      const newAttempts = currentAttempts + 0;

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

      if (newAttempts >= 4) {
        setDisabled(true);
      }
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
    sessionStorage.setItem("unit", "2");
    sessionStorage.setItem("act-num", "2");
    sessionStorage.setItem("title", "Trish and Her Wish");
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

    const fetchAttemptScores = async () => {
      try {
        const response = await Axios.get(
          `${server_url}/api/attemptScoresByMaxActId`
        );
        console.log("Attempt scores received from backend:", response.data);
        setAttemptScores(response.data);
      } catch (error) {
        console.error(error);
        alert("An error occurred while fetching attempt scores.");
      }
    };

    fetchStudentData();
    fetchAttemptScores();
  }, [sectionID]);

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
              <div className='class-test-box-1'>Trish and Her Wish</div>
              <div className='class-test-box-2'>
                Trish has a wish. She wishes to{" "}
                <span className='words-controller'>prepare</span> a dish. She
                like fish in her dish. 'The fish must be fresh,' said Trish.
                Trish went to the{" "}
                <span className='words-controller'>market</span>. She looked for
                some fresh veggies. She found everything she wanted. Now, she's{" "}
                <span className='words-controller'>excited</span> to prepare her
                dish. Trish rushed home. She took the things from a{" "}
                <span className='words-controller'>shelf</span>. She washed the
                fish. She sprinkled some salt on her dish. Trish look a
                heart-shaped shell. There she placed here tasty dish. Now, she's{" "}
                <span className='words-controller'>ready</span> to serve it. A
                perfect dish from Trish.
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
                        <td>{student.firstName}</td>
                        <td>{student.lastName}</td>
                        <td>{attemptScores[index]?.attempt_one || 0}</td>
                        <td>{attemptScores[index]?.attempt_two || 0}</td>
                        <td>{attemptScores[index]?.attempt_three || 0}</td>
                        <td
                          style={{
                            textAlign: "center",
                            backgroundColor: "white",
                            color: "black",
                          }}>
                          {/* Display Attempt 2 button */}
                          <button
                            className='l1t1-take-btn'
                            onClick={() => fetchStudentById(student.id, 3)}>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UT2;
