import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { BiHelpCircle } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";

function Header({ onToggleNav, showSidebar }) {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedDate = dateTime.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = dateTime.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const getInitials = (name) => {
    if (!name || typeof name !== 'string') {
      return '';
    }

    const isArabic = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFD\uFE70-\uFEFC]/.test(name);

    if (isArabic) {
      return name.substring(0, 1);
    } else {
      const words = name.split(" ");

      if (words.length === 1) {
        return name.substring(0, 2);
      } else {
        return (words[0].charAt(0) + (words.length > 1 ? words[1].charAt(0) : '')).toUpperCase();
      }
    }
  };

  const getCircleColor = (name) => {
    const colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6', '#999966'];
    const initial = name.charCodeAt(0) + name.charCodeAt(1);
    return colors[initial % colors.length];
  };

  const getGreeting = () => {
    const hour = dateTime.getHours();
    if (hour >= 5 && hour < 12) {
      return "Good Morning!";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon!";
    } else {
      return "Good Evening!";
    }
  };

  return (
    <header className={`header-container ${showSidebar ? "hidden" : "visible"}`} style={{ borderBottom: "1px solid #ccc", position: "relative" }}>
      <div>
        <IoIosArrowBack onClick={onToggleNav} className={`arrow ${showSidebar ? "hidden" : "visible"}`} />
        <GiHamburgerMenu onClick={onToggleNav} className={`burger ${showSidebar ? "hidden" : "visible"}`} />
      </div>
      <div style={{ display: "contents" }}>
        <div className="left-section">
          <h4>{getGreeting()}</h4>
          <div className="date-time" style={{ marginLeft: '5px' }}>
            {formattedDate} {formattedTime}
          </div>
        </div>

        <div className="right-section" style={{ display: "flex" }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}> <BiHelpCircle className="notification-icon" /></div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}><IoIosNotifications className="notification-icon" /></div>
          <div style={{ borderLeft: '2px solid rgb(221 211 211)', height: '30px', marginLeft: '15px' }}></div>

          <div style={{ display: "flex" }}>
            <p style={{ marginLeft: "10px", color: 'black', fontWeight: 'bold', marginTop: '3px' }}>Nader Amer</p>

            <div class="userCircle" style={{ backgroundColor: getCircleColor("Nader Amer"), marginLeft: '4px' }}>
              {getInitials("Nader Amer")}
            </div>
          </div>
          <MdKeyboardArrowDown style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '4px' }} />
        </div>
      </div>
    </header>
  );
}

export default Header;
