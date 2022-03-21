import React, { useState } from "react";
import Facets from "../components/Facets";
import PreviewList from "../components/PreviewList";
import NavBar from "../components/NavBar";

// query param string to be passed up from child checkboxes
export const QueryParamContext = React.createContext({
    queryParam: "",
    setQueryParam: () => {},
});

export default function AttractionsPage() {
    const [queryParam, setQueryParam] = useState("");
    const value = { queryParam, setQueryParam };

    return (
        <>
            <NavBar />
            <div className="content-body-container">
                <h1 className="page-title">Attractions</h1>
                <div className="flex justify-between">
                    <QueryParamContext.Provider value={value}>
                        <Facets />
                        <PreviewList />
                    </QueryParamContext.Provider>
                </div>
            </div>
        </>
    );
}
