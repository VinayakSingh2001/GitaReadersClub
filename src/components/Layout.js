import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Header2 from "./Header2";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="--pad" style={{ minHeight: "80vh" }}>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
