import React from "react";
import { Link } from "react-router-dom";
import "../css/Preview.css";
import findFacet from "../utils/findFacet";
import noImage from "../images/noImage.png";

export default function Preview(props /* replace with { key names }*/) {
    const data = props.data;
    // only pass in certain props later then refactor, keeping full data for dev now

    return (
        <div className="Preview">
            <Link to={`/attractions/${data.attraction_id}`}>
                <img
                    src={
                        data.attraction_image.includes("data")
                            ? noImage
                            : data.attraction_image
                    }
                    alt=""
                />
            </Link>
            <label className="Preview__city">{findFacet(data, "city")}</label>
            <br />
            <label>
                <b>{data.attraction_name}</b>
            </label>
        </div>
    );
}
