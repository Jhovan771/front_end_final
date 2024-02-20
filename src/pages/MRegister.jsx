import { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const server_url = import.meta.env.VITE_SERVER_LINK;

const MRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordisMatch, setPasswordIsMatch] = useState(true);
  const [username, setUserName] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [showUsernameError, setShowUsernameError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);

    if (password === e.target.value) {
      setPasswordIsMatch(true);
    } else {
      setPasswordIsMatch(false);
    }
  };

  const handleRegister = () => {
    setShowUsernameError(false);
    setShowPasswordError(false);

    if (password === confirmPassword && password.length >= 8) {
      if (username && email && username.includes("")) {
        Axios.post(`${server_url}/api/insert`, {
          username: username,
          password: password,
          email: email,
        })
          .then((response) => {
            console.log("Response received:", response.data);
            const responseData = response.data;

            if (responseData.generatedUserID) {
              console.log("Data inserted successfully");

              Axios.post(`${server_url}/api/insert`, {
                email: email,
                username: username,
                password: password,
              })
                .then((emailResponse) => {
                  console.log("Email sent successfully:", emailResponse.data);
                })
                .catch((emailError) => {
                  console.error("Error sending email:", emailError);
                });

              setPassword("");
              setConfirmPassword("");
              setUserName("");
              setEmail("");
              setAccountNumber(responseData.generatedUserID);
              setRegistrationSuccess(true);
              setPasswordIsMatch(true);
            } else if (
              responseData.response &&
              responseData.response
                .toLowerCase()
                .includes("username is already taken")
            ) {
              console.log("Username is already taken");
              setShowUsernameError(true);
            } else {
              console.log(
                "Response data does not match: " + responseData.response
              );
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        setPasswordIsMatch(false);
        setShowUsernameError(true);
      }
    } else {
      setPasswordIsMatch(false);
      setShowPasswordError(true);
    }
  };

  return (
    <div className='register-main-container'>
      <div className='register-wrapper'>
        <div className='h3-register-wrapper'>
          <h3 className='h3-control-header'>CREATE ACCOUNT</h3>
        </div>
        <div className='textbox-wrapper'>
          <div className='textbox'>
            <h3 className='h3-control'>Username :</h3>
            <div className='textbox-control'>
              <input
                className='input-field'
                type='text'
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        {showUsernameError && (
          <p
            style={{
              color: "red",
              display: "flex",
              justifyContent: "space-evenly",
            }}>
            Username must not be empty.
          </p>
        )}
        <div className='textbox-wrapper'>
          <div className='textbox'>
            <h3 className='h3-control'>Password :</h3>
            <div className='textbox-control'>
              <input
                className={`input-field`}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className='textbox-icon'
                onClick={() => {
                  setShowPassword(!showPassword);
                }}>
                <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAABCRJREFUSEut123on1MYB/DPtSH2YGaTFckUpeTFWLPZTCll06YYE+aViBimRFFTK0mzpIR4IQ/NRlnZ/vMQb5g3Xnl+mBZjY8iYLcaOzn2f/+9/37+H/VLOm9/vPve5z3Vd3+t7fc91Qh6BVP3rjD5T7QVdn/WsHzIR1fv/wXCP00M8bxkuThwr+e2w0Te9HWagAWb3Z00bp+B93IH1PdiOTvQxPDw1IaRORvP60RyPDz5JnIFDWI4NfSkw3EpxsSxs/3RMNhddg2cxDn8LSyWbB0be/WIIV5qv64ib1A7LJC9iPA5iCUaESZKrMA8ziXGkA/gJP+MLPI+93QZGC2ag4UYOlmIjjsCfJd9X4ui2jz0VkR3dGKxJfNyp08KJATnuSUSO9NUBMP+KrwthMyFP6FqXg3wad+L3QTrRhrp+mhpsTpzXteEzWI1v2vMxhbRQWCLFCtKR5f27uFjY36JzqrHoHhOJd0jnlheZXBcKEyT7cBcuwgUF+k/xALaU9TOQHbykPI9gcamUFqO6DefcXl4mn8SNmI+tmDAA+l3B2akiWqfIn8ANJYGPZNgHkKvachUebmz+QzH6VYkwG68JNjrq3R7DrV1O5ap4GwvK/KJgS5PhozmeGtLOVEUV+0iTyoudWFjIND8YSWFil8Bvxz3CTMlDDQdmBB8mphM7SKdX+pA1qxH+LVSe55FL50xhdTHwbYl4R4VAGJFM7A3cXuK4rqPuarxQ1l5fBKoYrq2vxLpC/axgefG9xJqyUTaaYcsIZBHZGkzqOk1/xImVkbGIbsLjxfDN9f9oRTy1qM90fIZZyMp0Nx4sG20PFqSwS4q5pNcxmpK89ysNYmbrM0hZ0SYTv5BOLnu2DOcPVwrrSs29jCuKpx3SBV+mupR2Yy7eoAP7KmJtQSg79CbmtKOtn7rr+ChsI2ZVH4dHcwoKavmoXFuK5XOpgn2PMEfyVmU8HJQswnu1QzGvOLEN5zf7nJbhsulJkg86uapl87aiVrcj12QeWTgy2/eUqHLkk7FfpdNml8h2pTBb8l03GUfLqdkrnFryl+mfYfkr8RSeCxalcF9Jx0eVqjEluD+RWduU5lz/lwoZoTGMB0jmqGPTMrRY0adsxqbCbkmWyXbTWOdnabBpUE/X74Mx4UsVObI4LJaqY7Izes79cECqupZcu/mgyGJxmfDaYSPus1FTC47HtcFpKUyXYlpIx6RwSKqOyHwSvYQ/qnSwqTQT/1A1ELlKWk43n/v22O0Fh3lqNoE50rqZGK92bnmwoa3V/6FF7Q90s4NsbbYsWF+4lEXpLGQE+p7HPSENSUH/q8gYia9LqoPjnOD7OuLsaAP1Zk80hERFX3puPoMAqS4Jvefx8JD61XrrwjWW3nbjPgi+3itMT6i9N4DednVQQz2YPP8CoCloMPidYYsAAAAASUVORK5CYII=' />
              </span>
            </div>
          </div>
        </div>

        {showPasswordError && (
          <p
            style={{ color: "red", display: "flex", justifyContent: "center" }}>
            Password must be at least 8 characters.
          </p>
        )}
        <div className='textbox-wrapper'>
          <div className='textbox'>
            <h3 className='h3-control'>Confirm Password :</h3>
            <div className='textbox-control'>
              <input
                className={`input-field`}
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <span
                className='textbox-icon'
                onClick={() => {
                  setShowConfirmPassword(!showConfirmPassword);
                }}>
                <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAABCRJREFUSEut123on1MYB/DPtSH2YGaTFckUpeTFWLPZTCll06YYE+aViBimRFFTK0mzpIR4IQ/NRlnZ/vMQb5g3Xnl+mBZjY8iYLcaOzn2f/+9/37+H/VLOm9/vPve5z3Vd3+t7fc91Qh6BVP3rjD5T7QVdn/WsHzIR1fv/wXCP00M8bxkuThwr+e2w0Te9HWagAWb3Z00bp+B93IH1PdiOTvQxPDw1IaRORvP60RyPDz5JnIFDWI4NfSkw3EpxsSxs/3RMNhddg2cxDn8LSyWbB0be/WIIV5qv64ib1A7LJC9iPA5iCUaESZKrMA8ziXGkA/gJP+MLPI+93QZGC2ag4UYOlmIjjsCfJd9X4ui2jz0VkR3dGKxJfNyp08KJATnuSUSO9NUBMP+KrwthMyFP6FqXg3wad+L3QTrRhrp+mhpsTpzXteEzWI1v2vMxhbRQWCLFCtKR5f27uFjY36JzqrHoHhOJd0jnlheZXBcKEyT7cBcuwgUF+k/xALaU9TOQHbykPI9gcamUFqO6DefcXl4mn8SNmI+tmDAA+l3B2akiWqfIn8ANJYGPZNgHkKvachUebmz+QzH6VYkwG68JNjrq3R7DrV1O5ap4GwvK/KJgS5PhozmeGtLOVEUV+0iTyoudWFjIND8YSWFil8Bvxz3CTMlDDQdmBB8mphM7SKdX+pA1qxH+LVSe55FL50xhdTHwbYl4R4VAGJFM7A3cXuK4rqPuarxQ1l5fBKoYrq2vxLpC/axgefG9xJqyUTaaYcsIZBHZGkzqOk1/xImVkbGIbsLjxfDN9f9oRTy1qM90fIZZyMp0Nx4sG20PFqSwS4q5pNcxmpK89ysNYmbrM0hZ0SYTv5BOLnu2DOcPVwrrSs29jCuKpx3SBV+mupR2Yy7eoAP7KmJtQSg79CbmtKOtn7rr+ChsI2ZVH4dHcwoKavmoXFuK5XOpgn2PMEfyVmU8HJQswnu1QzGvOLEN5zf7nJbhsulJkg86uapl87aiVrcj12QeWTgy2/eUqHLkk7FfpdNml8h2pTBb8l03GUfLqdkrnFryl+mfYfkr8RSeCxalcF9Jx0eVqjEluD+RWduU5lz/lwoZoTGMB0jmqGPTMrRY0adsxqbCbkmWyXbTWOdnabBpUE/X74Mx4UsVObI4LJaqY7Izes79cECqupZcu/mgyGJxmfDaYSPus1FTC47HtcFpKUyXYlpIx6RwSKqOyHwSvYQ/qnSwqTQT/1A1ELlKWk43n/v22O0Fh3lqNoE50rqZGK92bnmwoa3V/6FF7Q90s4NsbbYsWF+4lEXpLGQE+p7HPSENSUH/q8gYia9LqoPjnOD7OuLsaAP1Zk80hERFX3puPoMAqS4Jvefx8JD61XrrwjWW3nbjPgi+3itMT6i9N4DednVQQz2YPP8CoCloMPidYYsAAAAASUVORK5CYII=' />
              </span>
            </div>
          </div>
        </div>
        {passwordisMatch ? null : (
          <p
            style={{ color: "red", display: "flex", justifyContent: "center" }}>
            Passwords do not match. Please try again.
          </p>
        )}

        <div className='textbox-wrapper'>
          <div className='textbox'>
            <h3 className='h3-control'>Gmail :</h3>
            <div className='textbox-control'>
              <input
                className='input-field'
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className='register-button-wrapper'>
          <button className='register-button' onClick={handleRegister}>
            R E G I S T E R
          </button>
        </div>
        {registrationSuccess && (
          <p
            style={{
              color: "green",
              display: "flex",
              justifyContent: "center",
            }}>
            Registration Successful.
          </p>
        )}
        {showUsernameError && (
          <p
            style={{
              color: "red",
              display: "flex",
              justifyContent: "center",
            }}>
            Username is already taken. Please choose a different one.
          </p>
        )}
        <div className='login-links'>
          <div className='login-or'>
            <p>Already have an Account?</p>
            <Link className='login-link' to='/modified-login'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MRegister;
