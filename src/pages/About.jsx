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
                “The road to success and the road to failure are almost exactly
                the same.” —Colin R. Davis
              </span>
            </div>
            <div className='content-control'>
              <img className='img-control' src={Amefie} alt='' />
              <span className='AName-control'>Amefie Fabro</span>
              <span className='ATitle'>Member</span>
              <span className='AQoute'>
                “It is better to fail in originality than to succeed in
                imitation.” —Herman Melville
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
