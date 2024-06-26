import React from "react";
import "./RightSide.css";
import TrendCard from "../trendCard/TrendCard";
import { useState } from "react";
import ShareModal from "../shareModal/ShareModal";
import RightSideNav from "../rightSideNav/RightSideNav";

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <div className="RightSide">
      <RightSideNav />
      <TrendCard />
      <button className="button r-button" onClick={() => setModalOpened(true)}>
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default RightSide;
