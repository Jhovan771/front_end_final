import { useEffect, useState } from "react";
import NavA from "./NavA";
import { useNavigate } from "react-router-dom";

const server_url = import.meta.env.VITE_SERVER_LINK;

const Assessment = () => {
  const [inputValue, setInputValue] = useState("");
  const [addedWords, setAddedWords] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [stories, setStories] = useState([]);
  const [sections, setSections] = useState([]);
  const navigate = useNavigate();

  const handleAdd = () => {
    if (inputValue.trim() !== "") {
      const updatedWords = [...addedWords, inputValue];
      setAddedWords(updatedWords);

      setInputValue("");
    }
  };

  const handleSubmit = async () => {
    // Fetch the UserID and token from local storage
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const response = await fetch(`${server_url}/submit-story`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
      },
      body: JSON.stringify({ title, content, addedWords, userId }), // Include userId in the request body
    });

    if (response.ok) {
      console.log("Story submitted successfully.");
      alert("SUBMITTED SUCCESSFULLY");
      setTitle("");
      setContent("");
      setInputValue("");
      setAddedWords("");
      window.location.reload();
    } else {
      console.error("Error submitting story.");
    }
  };

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${server_url}/get-stories`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const storiesData = await response.json();
          setStories(storiesData);
        } else {
          console.error("ERROR FETCHING STORIES.");
        }
      } catch (error) {
        console.error("ERROR FETCHING STORIES", error);
      }
    };

    const fetchSections = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${server_url}/api/sectionList`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const sectionsData = await response.json();
          console.log("Sections Data:", sectionsData);
          setSections(sectionsData);
        } else {
          console.error("ERROR FETCHING SECTIONS.");
        }
      } catch (error) {
        console.error("ERROR FETCHING SECTIONS", error);
      }
    };

    fetchStories();
    fetchSections();
  }, []);

  const handleDelete = async (storyId) => {
    console.log("Deleting story with id:", storyId);

    const isConfirmed = window.confirm(
      "Are you sure you want to delete this story?"
    );
    if (!isConfirmed) {
      return;
    }

    try {
      const response = await fetch(`${server_url}/delete-story/${storyId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Story deleted successfully.");
        const updatedStories = stories.filter(
          (story) => story.stories_id !== storyId
        );
        setStories(updatedStories);
      } else {
        console.error("Error deleting story.");
      }
    } catch (error) {
      console.error("Error deleting story:", error);
    }
  };

  const reroute = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      <NavA />
      <div className='assessment-main-wrapper'>
        <div className='assessment-sub-wrapper'>
          <div className='bx1-bx2-wrapper'>
            <div className='assessment-box-1'>
              <div style={{ width: "100%", padding: "2px" }}>
                <input
                  type='text'
                  placeholder='Enter Title for your Story'
                  className='input-for-title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div
                className='input-for-story-wrapper'
                style={{ width: "100%" }}>
                <textarea
                  className='input-for-story'
                  placeholder='INPUT STORY HERE'
                  name=''
                  id=''
                  cols='40'
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows='10'></textarea>
              </div>
              <div
                className='input-and-btn-wrapper'
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "center",
                }}>
                <input
                  className='input-for-adding'
                  type='text'
                  placeholder='ADD THE WORDS TO BE PRONOUNCED'
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button className='btn-for-adding' onClick={handleAdd}>
                  ADD
                </button>
                {addedWords.length > 0 && (
                  <div style={{ overflow: "auto", width: "100%" }}>
                    <ul
                      style={{
                        width: "100%",
                        backgroundColor: "white",
                        textAlign: "center",
                      }}>
                      {addedWords.map((word, index) => (
                        <li key={index}>
                          <input
                            style={{
                              textAlign: "center",
                              textTransform: "uppercase",
                            }}
                            type='text'
                            value={word}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <button className='btn-sumbit-story' onClick={handleSubmit}>
                SUBMIT
              </button>
            </div>
            <div className='assessment-box-2'>
              <div className='box-for-stories'>
                <div style={{ maxHeight: " 560px", overflow: "auto" }}>
                  <table className='table-main-wrapper'>
                    <thead>
                      <tr>
                        <th className='title-column'>TITLE</th>
                        <th>MENU</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stories.map((story) => (
                        <tr key={story.title}>
                          <td>{story.title}</td>
                          <td>
                            <button
                              className='dlt-btn'
                              onClick={() => {
                                handleDelete(story.stories_id);
                              }}>
                              DELETE
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
