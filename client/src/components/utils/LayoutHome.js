import { useState, useRef, useEffect } from 'react';


import Header from "./Header";

const LayoutHome = (props) => {
  const [sticky, setSticky]=useState(false);
  const ref = useRef(null);
  const handleScroll = () => {
    if (ref.current) {
      setSticky(ref.current.getBoundingClientRect().top <= 0);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);

  return (
    <div className="layout__home">
      <div className="layout__bg layout__bg--home"></div>
      <div class="header__wappper">
      <div className={`header__sticky-wrapper${sticky ? ' header__sticky' : ''}`} ref={ref}>
        <Header />
      </div>
      </div>
      <div className="layout__body">{props.children}</div>
    </div>
  );
};

export default LayoutHome;
