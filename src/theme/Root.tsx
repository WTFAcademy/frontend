import React, {useState} from 'react';
import GlobalContext from "@site/src/contexts/GlobalContext";
import {Toaster} from "react-hot-toast";

// Default implementation, that you can customize
export default function Root({children}) {
    const [uid, setUid] = useState(undefined);

    return (
        <GlobalContext.Provider value={{uid, setUid}}>
            {children}
            <Toaster position="top-center"/>
        </GlobalContext.Provider>
    );
}
