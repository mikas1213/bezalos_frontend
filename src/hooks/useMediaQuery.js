import { useContext } from 'react';
import MediaQueryContext from '../context/MediaQueryProvider';

const useMediaQuery = () => {
    const context = useContext(MediaQueryContext);
    if(context === undefined) throw new Error('MadiaQueryContext was used outside of the MediaQueryProvider');
    return context;
};

export default useMediaQuery;