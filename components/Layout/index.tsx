import React from "react";

// import styles from "../../styles/Browse.module.scss";
import NavBar from "../NavBar/NavBar";

interface Layout {
  children: React.ReactNode;
}

export default function Layout({ children }: Layout) {
  return (
    <div className="min-h-[100vh] flex-col text-white bg-black">
      <NavBar />
      {children}
      {/* <Footer /> */}
    </div>
  );
}
