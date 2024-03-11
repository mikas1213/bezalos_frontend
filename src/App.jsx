import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Homepage from './pages/Homepage';
import Virtuve from './pages/Virtuve';
import Receptai from './pages/Receptai';
import Paslaugos from './pages/Paslaugos';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='/virtuve' element={<Virtuve />} />
                <Route path='/receptai' element={<Receptai />} />
                <Route path='/paslaugos' element={<Paslaugos />} />
                {/* <Route path='/profilis' element={<Profilis />}>

                </Route> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
