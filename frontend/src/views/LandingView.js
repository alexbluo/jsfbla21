import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function LandingView() {
  return (
    <div>
      <h1>Maryland Attractions Searcher</h1>
      <Link to="/attractions">
        <button>Attractions</button>
      </Link>
      <Link to="/help">
        <button>Help</button>
      </Link>
      <Link to="/qna">
        <button>QnA</button>
      </Link>
      <Outlet />
    </div>
  );
}
