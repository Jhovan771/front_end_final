import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import mic from "../assets/Microphone.png";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const server_url = import.meta.env.VITE_SERVER_LINK;

const Practice = () => {
  const navigate = useNavigate();
  const [isCorrect, setIsCorrect] = useState(null);
  const [wordData, setWordData] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showWords, setShowWords] = useState(true);
  const [originalWordData, setOriginalWordData] = useState([]);
  const [overallScoreHistory, setOverallScoreHistory] = useState(
    JSON.parse(localStorage.getItem("overallScoreHistory")) || [0]
  );
  const [recognizedTextHistory, setRecognizedTextHistory] = useState(
    new Array(overallScoreHistory.length).fill("")
  );
  const scoreRef = useRef(0);
  const chartRef = useRef(null);
  const [recognizedText, setRecognizedText] = useState("");
  const [attemptNumber, setAttemptNumber] = useState(1);
  const [isRecognizing, setIsRecognizing] = useState(false);

  // Clear localStorage data when the component mounts
  useEffect(() => {
    localStorage.removeItem("overallScoreHistory");
    localStorage.removeItem("chartData");
    setOverallScoreHistory([0]);
    setRecognizedTextHistory([""]);
  }, []);

  const speakWord = () => {
    const wordToSpeak = wordData[currentWordIndex];
    if (wordToSpeak) {
      const utterance = new SpeechSynthesisUtterance(wordToSpeak);
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    // Fetch word data whenever needed
    const fetchWordData = () => {
      fetch(`${server_url}/api/wordDataNorm`)
        .then((response) => response.json())
        .then((data) => {
          setWordData(data);
          setOriginalWordData(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    fetchWordData();
  }, []);

  const handleRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsRecognizing(true);
      console.log("Recognition Started");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      const currentWord = wordData[currentWordIndex].toLowerCase();
      const isPronunciationCorrect = transcript === currentWord;

      setIsCorrect(isPronunciationCorrect);

      if (isPronunciationCorrect) {
        scoreRef.current += 1;
        setScore(scoreRef.current);
      }

      setCurrentWordIndex(currentWordIndex + 1);

      setRecognizedText(transcript);
      setRecognizedTextHistory((prevTexts) => {
        const updatedTexts = [...prevTexts];
        updatedTexts[attemptNumber - 1] = transcript;
        return updatedTexts;
      });

      setAttemptNumber((prevAttemptNumber) => prevAttemptNumber + 1);

      if (currentWordIndex >= wordData.length - 1) {
        setShowWords(false);
      }
    };

    recognition.onend = () => {
      setOverallScoreHistory((prevScoreHistory) => [
        ...prevScoreHistory,
        scoreRef.current,
      ]);
      setIsRecognizing(false);
      console.log("Recognition ended");
    };

    recognition.start();
  };

  const redirectToPageNormal = () => {
    navigate("/lvlNormal");
  };

  const redirectToPageEasy = () => {
    navigate("/practice");
  };

  const redirectToPageHard = () => {
    navigate("/lvlHard");
  };

  const allWordsPronounced = currentWordIndex >= wordData.length - 1;

  const handleRetake = () => {
    setScore(0);
    setCurrentWordIndex(0);
    setShowWords(true);
    setWordData([...originalWordData]);
    const updatedChartData = generateChartData();
    localStorage.setItem("chartData", JSON.stringify(updatedChartData));
  };

  const handleNext = () => {
    localStorage.setItem(
      "overallScoreHistory",
      JSON.stringify(overallScoreHistory)
    );

    setCurrentWordIndex(currentWordIndex + 1);

    if (currentWordIndex >= 9) {
      setScore(0);
      setCurrentWordIndex(0);
    }

    const updatedChartData = generateChartData();

    localStorage.setItem("chartData", JSON.stringify(updatedChartData));

    setShowWords(true);

    setOverallScoreHistory([]);

    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const generateChartData = () => {
    const attempts = overallScoreHistory.length;

    // Create an array to hold the attempt labels
    const labels = [];
    for (let i = 1; i <= attempts; i++) {
      // Display the recognized text for attempts that have been completed
      const recognizedText =
        i <= attemptNumber ? recognizedTextHistory[i - 1] : "";

      // Construct the label for the attempt
      const attemptLabel = recognizedText
        ? `Attempt ${i}: ${recognizedText}`
        : `Attempt ${i}`;

      labels.push(attemptLabel);
    }

    return {
      labels: labels,
      datasets: [
        {
          label: "Overall Score",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(75, 192, 192, 0.4)",
          hoverBorderColor: "rgba(75, 192, 192, 1)",
          data: overallScoreHistory,
        },
      ],
    };
  };

  const getChartImageURL = () => {
    if (chartRef.current) {
      return chartRef.current.toBase64Image();
    }
    return null;
  };

  const downloadChart = () => {
    const userName = prompt("Please enter your name:");

    if (userName) {
      const chartDataURL = getChartImageURL();

      if (chartDataURL) {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = 1000;
        canvas.height = 800;

        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);

        const chartImage = new Image();
        chartImage.src = chartDataURL;

        chartImage.onload = () => {
          context.drawImage(chartImage, 0, 0, canvas.width, canvas.height);

          context.font = "62px Arial";
          context.fillStyle = "black";
          context.textAlign = "center";
          context.fillText(userName, canvas.width / 2, 50);

          const finalDataURL = canvas.toDataURL("image/png");

          const a = document.createElement("a");
          a.href = finalDataURL;
          a.download = `score_chart_${userName}.png`;
          a.click();
        };
      }
    }
  };

  const chartData = generateChartData();

  return (
    <div>
      <Navbar />
      <div className='home-main'>
        <div className='home-wrapper'>
          <div className='box-main-control'>
            <div className='box-control-1'>
              <div className='box-1'>
                <h3 className='header-ctrl'>
                  LEVEL MODERATE{" "}
                  <span>
                    <button className='download-button' onClick={downloadChart}>
                      Download Chart
                    </button>
                  </span>
                </h3>
                <div className='box-content-1'>
                  {showWords && (
                    <p className='prac-p-controller' onClick={speakWord}>
                      {wordData[currentWordIndex] &&
                        `Say '${wordData[currentWordIndex]}'`}
                    </p>
                  )}
                </div>

                <div className='scores-graph' id='scores-chart'>
                  <Bar
                    data={chartData}
                    ref={chartRef}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      height: 200,
                    }}
                  />
                </div>
              </div>
              <div className='box-2'>
                <div className='box-content-2'>
                  {showWords && (
                    <button
                      id='startRecognitionButton'
                      className='start-button'
                      onClick={handleRecognition}>
                      <img
                        src={mic}
                        className='mic-controller'
                        alt='Microphone'
                      />
                      <h3 className='prac-h3-controller'>SPEAK</h3>
                      <div
                        className='prac-inidicator'
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}>
                        <div
                          style={{
                            backgroundColor: isRecognizing ? "blue" : "maroon",
                            height: "34px",
                            width: "34px",
                            borderRadius: "24px",
                            padding: "3px",
                          }}></div>
                      </div>
                    </button>
                  )}
                  {!showWords && (
                    <button className='retake-button' onClick={handleRetake}>
                      Retake
                    </button>
                  )}
                  {!showWords && (
                    <button className='next-button' onClick={handleNext}>
                      Next
                    </button>
                  )}
                </div>
                <div
                  className={`box-content-3 ${
                    isCorrect === true
                      ? "correct"
                      : isCorrect === false
                      ? "incorrect"
                      : ""
                  }`}>
                  <h2>
                    {allWordsPronounced
                      ? `Score: ${score}`
                      : isCorrect === true
                      ? "Correct!"
                      : isCorrect === false
                      ? "Incorrect!"
                      : ""}
                  </h2>
                </div>
              </div>
            </div>
            <div className='box-control-2'>
              <div className='box-3'>
                <div className='mini-box'>
                  <button className='mini-box' onClick={redirectToPageEasy}>
                    SIMPLE
                  </button>
                </div>
                <div className='mini-box'>
                  <button className='mini-box' onClick={redirectToPageNormal}>
                    MODERATE
                  </button>
                </div>
                <div className='mini-box'>
                  <button className='mini-box' onClick={redirectToPageHard}>
                    CHALLENGING
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Display recognized text */}
    </div>
  );
};

export default Practice;
