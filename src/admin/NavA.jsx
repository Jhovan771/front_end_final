import { Link } from "react-router-dom";

const NavA = () => {
  const handleLogout = (event) => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) {
      event.preventDefault(); // Prevent the default link behavior if logout is canceled
    } else {
      localStorage.removeItem("token");
      // Perform any additional logout actions if needed
    }
  };

  return (
    <div className='body'>
      <div className='header'>
        <div className='logo'>
          <h3>Logo</h3>
        </div>
        <input type='checkbox' id='nav_check' hidden />
        <nav>
          <div className='logo'>
            <h3>Logo</h3>
          </div>
          <ul>
            <li>
              <Link to='/homeA'>Home</Link>
            </li>
            <li>
              <Link to='/dashboard'>Dashboard</Link>
            </li>
            <li>
              <Link to='/assessment'>Assessment</Link>
            </li>
            <li>
              <Link
                to='/modified-login'
                className='active'
                onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </nav>
        <label htmlFor='nav_check' className='hamburger'>
          <div></div>
          <div></div>
          <div></div>
        </label>
      </div>
    </div>
  );
};

export default NavA;
