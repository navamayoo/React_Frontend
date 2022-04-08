import React from 'react';
import { BrowserRouter} from "react-router-dom";
import XDrawer from '../components/layout/XDrawer'
import Notes from '../components/pages/Notes';

function App() {
  return (
    <>
    <BrowserRouter>
    <XDrawer>

     <Notes/>
    </XDrawer>

   
    </BrowserRouter>
    
    </>
  );
}

export default App;
