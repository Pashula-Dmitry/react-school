import './App.scss';
import React from 'react';
import Routes from '../shared/components/routes';
import StoreContext from './Store.jsx';
import {SearchContext} from "../shared/contexts/search";

const App = () => {


  return (
    <SearchContext>
      <StoreContext>
        <Routes />
      </StoreContext>
    </SearchContext>
  );
};

export default App;
