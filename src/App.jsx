import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import Homepage from './pages/Homepage';
import Virtuve from './pages/Virtuve';
import Receptai from './pages/Receptai';
import Paslaugos from './pages/Paslaugos';
import NotFoundPage from './pages/NotFoundPages/NotFoundPage';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000,
        }
    }
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false}/>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Homepage />} />
                    <Route path='/virtuve' element={<Virtuve />} />
                    <Route path='/receptai' element={<Receptai />} />
                    <Route path='/paslaugos' element={<Paslaugos />} />
                    <Route path='*' element={<NotFoundPage />} />
                    {/* <Route path='*' element={<NotFound />} /> */}
                    {/* <Route path='/profilis' element={<Profilis />}>

                    </Route> */}
                    
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
