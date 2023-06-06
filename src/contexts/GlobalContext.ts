import React from "react";

interface State {
    uid?: string;
    setUid?: (uid: string) => void;
}

const GlobalContext = React.createContext<State>(null);

export default GlobalContext;
