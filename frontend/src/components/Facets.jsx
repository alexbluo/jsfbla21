import React, { useEffect, useState, useRef } from "react";
import Dropdown from "./Dropdown";

const categories = ["region", "city", "category", "amenity"];

export default function Facets() {
  return (
    <div className="inline-block w-[27%]">
      <div className="flex flex-col gap-1 bg-black border-4 rounded-md">
        {categories.map((category, index) => (
          <Dropdown category={category} key={index} />
        ))}
      </div>
    </div>
  );
}
