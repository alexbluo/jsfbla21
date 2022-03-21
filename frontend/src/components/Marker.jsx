import React, { useState } from "react";

export default function Marker(props) {
    const [show, setShow] = useState(false);

    return (
        <div className="relative inline-flex flex-col-reverse items-center w-4 h-4 group">
            <div
                className={`absolute w-4 h-4 z-10 aspect-square border-2 rounded-full cursor-pointer ${
                    props.isCenter
                        ? "bg-white border-red"
                        : "bg-gold border-black"
                } hover:brightness-50 duration-300 ease-out`}
                onClick={props.onClick}
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
            ></div>
            {/* TODO: find better solution that actually works too */}
            {!props.isCenter && show && (
                <div className="absolute z-20 w-32 h-16 p-2 origin-bottom rounded-lg -top-16 bg-red animate-spring-scale-up">
                    <h2 className="text-xs text-white font-raleway">
                        {props.name}
                    </h2>
                </div>
            )}
        </div>
    );
}
