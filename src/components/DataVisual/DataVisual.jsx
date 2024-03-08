import React from "react";
import "../DataVisual/DataVisual.css";
import AreaChart from "./AreaChart";
import { BsArrowLeftShort } from "react-icons/bs";

function DataVisual({ chartData, setDataVisual }) {
  return (
    <div className="data">
      <div className="move-back">
        <BsArrowLeftShort onClick={() => setDataVisual((state) => !state)} />
      </div>
      <div>
        <h4>Here is your stats, always strive for better</h4>
      </div>
     
        <AreaChart chartData={chartData} />
      
    </div>
  );
}

export default DataVisual;
