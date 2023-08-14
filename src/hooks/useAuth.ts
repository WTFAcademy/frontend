import {useContext} from "react";
import {AuthContext} from "@site/src/contexts/AuthContext";

const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("in provider!")
    }

    return context;
};

export default useAuth;
