import { createContext, useContext, useState } from "react";


const SignUpContext = createContext();

const SignUpProvider = ({ children }) => {

    const [signUpFor, setSignUpFor] = useState({
        user: true,
        doctor: false
    })

    return (
        <SignUpContext.Provider value={{signUpFor, setSignUpFor}}>
            {children}
        </SignUpContext.Provider>
    )
}

const useSignUp = () => useContext(SignUpContext);

export {SignUpProvider, useSignUp}