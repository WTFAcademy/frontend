import React, {useState} from 'react';
import {Toaster} from "react-hot-toast";
import GlobalContext from "@site/src/contexts/GlobalContext";
import {WagmiConfig} from 'wagmi';
import {client} from '@site/src/utils/connect';

export default function Root({children}) {
    const [uid, setUid] = useState(undefined);

    return (
        <WagmiConfig client={client}>
            <GlobalContext.Provider value={{uid, setUid}}>
                {children}
                <Toaster position="top-center"/>
            </GlobalContext.Provider>
        </WagmiConfig>
    );
}
