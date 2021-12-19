import logo from "../../styles/images/logo1.png";

const Layout = (props) => {
  return (
    <div className="layout">
      <div className="layout__bg" />

      <div className="layout__container">
        <div className="layout__part layout__left">
          <img src={logo} alt="logo" className="logo logo--large" />

          <div className="title__wrapper">
            <div className="title__container">
              <div className="title__part title__part--1">
                <div className="polygon"></div>
                <div className="title__text">Dormitory</div>
              </div>

              <div className="title__part title__part--2">
                <div className="polygon"></div>
                <div className="title__text">Check-in</div>
              </div>
            </div>
          </div>
        </div>

        <div className="layout__part layout__right">
          <div className="form__wrapper">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
