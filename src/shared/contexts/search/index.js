import React, {useState} from 'react';

export const CtxSearch = React.createContext(null);

export const SearchContext = ({ children }) => {
  const [search, setSearch] = useState('');


  return (
    <CtxSearch.Provider value={{ search, dispatch: setSearch }}>
      {children}
    </CtxSearch.Provider>
  );
};

