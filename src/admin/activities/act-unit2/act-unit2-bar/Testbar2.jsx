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
                        to={`/unit2/${sectionID}`}>
                        Chad, the Honest Kid
                      </Link>
                    </div>
                    <div className='lesson-links-control'>
                      <Link
                        className='link-css-control'
                        to={`/ut1/${sectionID}`}>
                        Test: Chad, the Honest Kid
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
                        to={`/unit2l2/${sectionID}`}>
                        Tish and Her Wish
                      </Link>
                    </div>
                    <div className='lesson-links-control'>
                      <Link
                        className='link-css-control'
                        to={`/ut2/${sectionID}`}>
                        Test: Trish and Her Wish
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
                        to={`/unit2l3/${sectionID}`}>
                        Cake for Trish
                      </Link>
                    </div>
                    <div className='lesson-links-control'>
                      <Link
                        className='link-css-control'
                        to={`/ut3/${sectionID}`}>
                        Test: Cake for Trish
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
                        to={`/unit2l4/${sectionID}`}>
                        Jake's New Cape
                      </Link>
                    </div>
                    <div className='lesson-links-control'>
                      <Link
                        className='link-css-control'
                        to={`/ut4/${sectionID}`}>
                        Test: Jake's New Cape
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
                        to={`/unit2l5/${sectionID}`}>
                        Preparing for the Big Day
                      </Link>
                    </div>
                    <div className='lesson-links-control'>
                      <Link
                        className='link-css-control'
                        to={`/ut5/${sectionID}`}>
                        Test: Preparing for the Big Day
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
                        to={`/unit2l6/${sectionID}`}>
                        The Big Day
                      </Link>
                    </div>
                    <div className='lesson-links-control'>
                      <Link
                        className='link-css-control'
                        to={`/ut6/${sectionID}`}>
                        Test: The Big Day
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
                        to={`/unit2l7/${sectionID}`}>
                        Kale
                      </Link>
                    </div>
                    <div className='lesson-links-control'>
                      <Link
                        className='link-css-control'
                        to={`/ut7/${sectionID}`}>
                        Test: Kale
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
                  Activity 8
                </div>
                {isDropdownOpen && (
                  <div className='dropdown-content'>
                    <div className='lesson-links-control'>
                      <Link
                        className='link-css-control'
                        to={`/unit2l8/${sectionID}`}>
                        Mike Rides a Bike
                      </Link>
                    </div>
                    <div className='lesson-links-control'>
                      <Link
                        className='link-css-control'
                        to={`/ut8/${sectionID}`}>
                        Test: Mike Rides a Bike
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
                  Activity 9
                </div>
                {isDropdownOpen && (
                  <div className='dropdown-content'>
                    <div className='lesson-links-control'>
                      <Link
                        className='link-css-control'
                        to={`/unit2l9/${sectionID}`}>
                        Horsey, the King
                      </Link>
                    </div>
                    <div className='lesson-links-control'>
                      <Link
                        className='link-css-control'
                        to={`/ut9/${sectionID}`}>
                        Test: Horsey, the King
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
