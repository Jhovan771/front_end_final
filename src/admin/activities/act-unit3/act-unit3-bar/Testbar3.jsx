import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const Testbar2 = () => {
  const { sectionID } = useParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div className='class-section-sidebar-wrapper'>
      <div className='class-sidebar-header'>
        <h1>Activities</h1>
      </div>
      <div className='class-sidebar-menu'>
        <ul>
          <li>
            <div className='class-sidebar-semi-container'>
              <h3>
                <div onClick={toggleDropdown} className='h2-lesson-control'>
                  Activity 1
                </div>
                {isDropdownOpen && (
                  <div className='dropdown-content'>
                    <div className='lesson-links-control'>
                      <Link
                        className='link-css-control'
                        to={`/unit3l1/${sectionID}`}>
                        The Bundle of Sticks
                      </Link>
                    </div>
                    <div className='lesson-links-control'>
                      <Link
                        className='link-css-control'
                        to={`/ut3l1/${sectionID}`}>
                        Test: The Bundle of Sticks
                      </Link>
                    </div>
                  </div>
                )}
              </h3>
            </div>
          </li>

          <li>
            <div className='class-sidebar-semi-container'>
              <h3>
                <div onClick={toggleDropdown} className='h2-lesson-control'>
                  Activity 2
                </div>
                {isDropdownOpen && (
                  <div className='dropdown-content'>
                    <div className='lesson-links-control'>
                      <Link
                        className='link-css-control'
                        to={`/unit3l2/${sectionID}`}>
                        A House We Built Together
                      </Link>
                    </div>
                    <div className='lesson-links-control'>
                      <Link
                        className='link-css-control'
                        to={`/ut3l2/${sectionID}`}>
                        Test: A House We Built Together
                      </Link>
                    </div>
                  </div>
                )}
              </h3>
            </div>
          </li>

          <li>
            <div className='class-sidebar-semi-container'>
              <h3>
                <div onClick={toggleDropdown} className='h2-lesson-control'>
                  Activity 3
                </div>
                {isDropdownOpen && (
                  <div className='dropdown-content'>
                    <div className='lesson-links-control'>
                      <Link
                        className='link-css-control'
                        to={`/unit3l3/${sectionID}`}>
                        Cock a Doodle Doo
                      </Link>
                    </div>
                    <div className='lesson-links-control'>
                      <Link
                        className='link-css-control'
                        to={`/ut3l3/${sectionID}`}>
                        Test: Cock a Doodle Doo
                      </Link>
                    </div>
                  </div>
                )}
              </h3>
            </div>
          </li>

          <li>
            <div className='class-sidebar-semi-container'>
              <h3>
                <div onClick={toggleDropdown} className='h2-lesson-control'>
                  Activity 4
                </div>
                {isDropdownOpen && (
                  <div className='dropdown-content'>
                    <div className='lesson-links-control'>
                      <Link
                        className='link-css-control'
                        to={`/unit3l4/${sectionID}`}>
                        Muley Mule and the Duke
                      </Link>
                    </div>
                    <div className='lesson-links-control'>
                      <Link
                        className='link-css-control'
                        to={`/ut3l4/${sectionID}`}>
                        Test: Muley Mule and the Duke
                      </Link>
                    </div>
                  </div>
                )}
              </h3>
            </div>
          </li>

          <li>
            <div className='class-sidebar-semi-container'>
              <h3>
                <div onClick={toggleDropdown} className='h2-lesson-control'>
                  Activity 5
                </div>
                {isDropdownOpen && (
                  <div className='dropdown-content'>
                    <div className='lesson-links-control'>
                      <Link
                        className='link-css-control'
                        to={`/unit3l5/${sectionID}`}>
                        Roy and the Field of Soy
                      </Link>
                    </div>
                    <div className='lesson-links-control'>
                      <Link
                        className='link-css-control'
                        to={`/ut3l5/${sectionID}`}>
                        Test: Roy and the Field of Soy
                      </Link>
                    </div>
                  </div>
                )}
              </h3>
            </div>
          </li>

          <li>
            <div className='class-sidebar-semi-container'>
              <h3>
                <div onClick={toggleDropdown} className='h2-lesson-control'>
                  Activity 6
                </div>
                {isDropdownOpen && (
                  <div className='dropdown-content'>
                    <div className='lesson-links-control'>
                      <Link
                        className='link-css-control'
                        to={`/unit3l6/${sectionID}`}>
                        Troy and Roy
                      </Link>
                    </div>
                    <div className='lesson-links-control'>
                      <Link
                        className='link-css-control'
                        to={`/ut3l6/${sectionID}`}>
                        Test: Troy and Roy
                      </Link>
                    </div>
                  </div>
                )}
              </h3>
            </div>
          </li>

          <li>
            <div className='class-sidebar-semi-container'>
              <h3>
                <div onClick={toggleDropdown} className='h2-lesson-control'>
                  Activity 7
                </div>
                {isDropdownOpen && (
                  <div className='dropdown-content'>
                    <div className='lesson-links-control'>
                      <Link
                        className='link-css-control'
                        to={`/unit3l7/${sectionID}`}>
                        The Mouse and the Sow
                      </Link>
                    </div>
                    <div className='lesson-links-control'>
                      <Link
                        className='link-css-control'
                        to={`/ut3l7/${sectionID}`}>
                        Test: The Mouse and the Sow
                      </Link>
                    </div>
                  </div>
                )}
              </h3>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Testbar2;
