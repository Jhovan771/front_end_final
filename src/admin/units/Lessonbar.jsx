import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const Lessonbar = () => {
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
                        to={`/lesson1/${sectionID}`}
                        className='link-css-control'>
                        The Crow and the Pitcher
                      </Link>
                    </div>
                    <div className='lesson-links-control'>
                      <Link
                        className='link-css-control'
                        to={`/l1t1/${sectionID}`}>
                        Test: The Crow and the Pitcher
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
                        to={`/lesson2/${sectionID}`}
                        className='link-css-control'>
                        My Two Pet Cats
                      </Link>
                    </div>
                    <div className='lesson-links-control'>
                      <Link
                        className='link-css-control'
                        to={`/l2t1/${sectionID}`}>
                        Test: My Two Pet Cats
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
                        to={`/lesson3/${sectionID}`}
                        className='link-css-control'>
                        Funny Macmac
                      </Link>
                    </div>
                    <div className='lesson-links-control'>
                      <Link
                        className='link-css-control'
                        to={`/l3t1/${sectionID}`}>
                        Test: Funny Macmac
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
                        to={`/lesson4/${sectionID}`}
                        className='link-css-control'>
                        Mox, the Fox
                      </Link>
                    </div>
                    <div className='lesson-links-control'>
                      <Link
                        className='link-css-control'
                        to={`/l4t1/${sectionID}`}>
                        Test: Mox, the Fox
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
                        to={`/lesson5/${sectionID}`}
                        className='link-css-control'>
                        A Log in the Bog in the Fog
                      </Link>
                    </div>
                    <div className='lesson-links-control'>
                      <Link
                        className='link-css-control'
                        to={`/l5t1/${sectionID}`}>
                        Test: A Log in the Bog in the Fog
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
                        to={`/lesson6/${sectionID}`}
                        className='link-css-control'>
                        A Jug in the Middle of a Rug
                      </Link>
                    </div>
                    <div className='lesson-links-control'>
                      <Link
                        className='link-css-control'
                        to={`/l6t1/${sectionID}`}>
                        Test: A Jug in the Middle of a Rug
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

export default Lessonbar;
