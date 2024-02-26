import Navbar from "./Navbar";
import Pers from "../assets/jay-ann.png";
import Amefie from "../assets/amefie.jpg";
import Jhovan from "../assets/me.jpg";

const About = () => {
  return (
    <div>
      <Navbar />
      <div className='about-main'>
        <div className='about-wrapper'>
          <div className='content-wrapper'>
            <div className='content-control'>
              <img className='img-control' src={Pers} alt='' />
              <span className='AName-control'>Jay Ann Robles</span>
              <span className='ATitle'>Leader</span>
              <span className='AQoute'>
                “We cannot solve problems with the kind of thinking we employed
                when we came up with them.” - Albert Einstein
              </span>
            </div>
            <div className='content-control'>
              <img className='img-control' src={Amefie} alt='' />
              <span className='AName-control'>Amefie Fabro</span>
              <span className='ATitle'>Member</span>
              <span className='AQoute'>
                “Stay away from those people who try to disparage your
                ambitions. Small minds will always do that, but great minds will
                give you a feeling that you can become great too.” — Mark Twain
              </span>
            </div>
            <div className='content-control'>
              <img className='img-control' src={Jhovan} alt='' />
              <span className='AName-control'>Jhovan Ahig</span>
              <span className='ATitle'>Programmer</span>
              <span className='AQoute'>
                “Success is not final; failure is not fatal: It is the courage
                to continue that counts.” — Winston Churchill
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
