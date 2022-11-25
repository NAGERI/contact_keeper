import React, { Fragment, useContext, useEffect } from "react";
import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";
import ContactFilter from "../contacts/ContactFilter";
import AuthContext from "../../context/auth/authContext";

const Home = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    /** @TODO Authentication and Authorization of application needed now */
    authContext.loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const Home = (
    <Fragment>
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </Fragment>
  );
  return (
    <div className="grid-2">{authContext.isAuthenticated ? Home : null}</div>
  );
};

export default Home;
