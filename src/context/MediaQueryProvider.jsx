import { createContext, useContext, useState, useEffect } from 'react';

const MadiaQueryContext = createContext(0);

export const MediaQueryProvider = ({ children }) => {
    return (
        <MadiaQueryContext.Provider value={{test: 3000}}>
            {children}
        </MadiaQueryContext.Provider>
    );
};

export default MadiaQueryContext;