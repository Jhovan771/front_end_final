import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const Lessonbar4 = () => {
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
                        to={`/unit4l1/${sectionID}`}
                        className='link-css-control'>
                        Glimpse of a Polluted Future
                      </Link>
                    </div>
                    <div className='lesson-links-control'>
                      <Link
                        className='link-css-control'
                        to={`/ut4l1/${sectionID}`}>
                        Test: Glimpse of a Polluted Future
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
                        to={`/unit4l2/${sectionID}`}
                        className='link-css-control'>
                        A Bright Night for Little Might
                      </Link>
                    </div>
                    <div className='lesson-links-control'>
                      <Link
                        className='link-css-control'
                        to={`/ut4l2/${sectionID}`}>
                        Test: A Bright Night for Little Might
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
                        to={`/unit4l3/${sectionID}`}
                        className='link-css-control'>
                        Every Time I Climb a Tree
                      </Link>
                    </div>
                    <div className='lesson-links-control'>
                      <Link
                        className='link-css-control'
                        to={`/ut4l3/${sectionID}`}>
                        Test: Every Time I Climb a Tree
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
                        to={`/unit4l4/${sectionID}`}
                        className='link-css-control'>
                        Mother Earth
                      </Link>
                    </div>
                    <div className='lesson-links-control'>
                      <Link
                        className='link-css-control'
                        to={`/ut4l4/${sectionID}`}>
                        Test: Mother Earth
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
                        to={`/unit4l5/${sectionID}`}
                        className='link-css-control'>
                        The Future
                      </Link>
                    </div>
                    <div className='lesson-links-control'>
                      <Link
                        className='link-css-control'
                        to={`/ut4l5/${sectionID}`}>
                        Test: The Future
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
                        to={`/unit4l6/${sectionID}`}
                        className='link-css-control'>
                        It is Never Wrong to Say I Love You
                      </Link>
                    </div>
                    <div className='lesson-links-control'>
                      <Link
                        className='link-css-control'
                        to={`/ut4l6/${sectionID}`}>
                        Test: It is Never Wrong to Say I Love You
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
                        to={`/unit4l7/${sectionID}`}
                        className='link-css-control'>
                        Tina, the Lost Bird
                      </Link>
                    </div>
                    <div className='lesson-links-control'>
                      <Link
                        className='link-css-control'
                        to={`/ut4l7/${sectionID}`}>
                        Test: Tina, the Lost Bird
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

export default Lessonbar4;
