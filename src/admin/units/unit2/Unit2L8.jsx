import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import NavA from "../../NavA";
import Sunny from "../../../assets/Unit1/Bike.jpeg";
import found from "../../../assets/Unit1/Kite.jpeg";
import thirsty from "../../../assets/Unit1/Listen.jpeg";
import water from "../../../assets/Unit1/Advice.jpeg";
import Lessonbar2 from "./Unit2-Lessonbar/Lessonbar2";

const Unit2L8 = () => {
  const [wordData] = useState(["Bike", "Kite", "Listen", "Advice"]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [correctness, setCorrectness] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { sectionID } = useParams();

  useEffect(() => {
    const voices = window.speechSynthesis.getVoices();
    setSelectedVoice(voices[0]);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const speakWord = (index) => {
    setCurrentWordIndex(index);

    const wordToSpeak = wordData[index];
    if (wordToSpeak) {
      const utterance = new SpeechSynthesisUtterance(wordToSpeak);

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleVoiceChange = (voiceName) => {
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find((v) => v.name === voiceName);
    if (voice) {
      setSelectedVoice(voice);
    }
  };

  const startListening = () => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.lang = "en-US";
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        checkCorrectness(transcript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      console.error("SpeechRecognition not supported in this browser.");
      setErrorMessage("SpeechRecognition not supported in this browser.");
    }
  };

  const checkCorrectness = (transcript) => {
    const currentWord = wordData[currentWordIndex];
    const cleanedTranscript = transcript.trim().toLowerCase();
    const cleanedWord = currentWord.toLowerCase();

    if (cleanedTranscript === cleanedWord) {
      setCorrectness("Correct");
    } else {
      setCorrectness("Wrong");
    }
  };

  return (
    <div style={{ overflowY: "hidden", overflowX: "hidden" }}>
      <NavA />
      <div className='class-section-main'>
        <div className='class-section-wrapper'>
          <div className='class-section-sidebar'>
            <Lessonbar2 />
          </div>
          <div className='class-section-content'>
            <div className='title-voice-changer-control'>
              {/* wllplyd */}
              <h2>Mike Rides a Bike</h2>
              <select
                onChange={(e) => handleVoiceChange(e.target.value)}
                value={selectedVoice ? selectedVoice.name : ""}>
                {window.speechSynthesis.getVoices().map((voice) => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='img-words-main-container'>
              <div className='img-words-special-container'>
                <div className='img-words-sub-container-1'>
                  <div className='img-words-container'>
                    <div className='img-control-unit'>
                      <img className='image-div' src={Sunny} alt='' />
                    </div>
                    <div className='word-control'>
                      <h3
                        className='h3-word-control'
                        onClick={() => speakWord(0)}>
                        {wordData[0]}
                      </h3>
                    </div>
                  </div>
                  <div className='img-words-container'>
                    <div className='img-control-unit'>
                      <img className='image-div' src={found} alt='' />
                    </div>
                    <div className='word-control'>
                      <h3
                        className='h3-word-control'
                        onClick={() => speakWord(1)}>
                        {wordData[1]}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className='img-words-sub-container-2'>
                  <div className='img-words-container'>
                    <div className='img-control-unit'>
                      <img className='image-div' src={thirsty} alt='' />
                    </div>
                    <div className='word-control'>
                      <h3
                        className='h3-word-control'
                        onClick={() => speakWord(2)}>
                        {wordData[2]}
                      </h3>
                    </div>
                  </div>
                  <div className='img-words-container'>
                    <div className='img-control-unit'>
                      <img className='image-div' src={water} alt='' />
                    </div>
                    <div className='word-control'>
                      <h3
                        className='h3-word-control'
                        onClick={() => speakWord(3)}>
                        {wordData[3]}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className='img-words-sub-container-3'>
                <div className='units-control'>
                  <div className='control-wrapper'>
                    <div className='control-word'>
                      <h2>{wordData[currentWordIndex]}</h2>
                    </div>
                    <div className='control-trigger-button'>
                      <button
                        className='lesson-1-btn-wrapper-green'
                        onClick={startListening}>
                        Speak
                      </button>
                    </div>
                    <div className='indicator-wrapper'>
                      <div
                        className={`control-indicator ${
                          correctness === "Correct" ? "green" : "red"
                        }`}>
                        {correctness}
                      </div>
                    </div>
                    <div className='indicator-wrapper'>
                      <div
                        className={`indicator ${
                          isListening ? "active-listening" : ""
                        }`}></div>
                    </div>{" "}
                    <div className='error-message'>
                      {errorMessage && errorMessage}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unit2L8;
