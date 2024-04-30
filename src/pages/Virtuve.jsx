import Main from '../components/UI/Main';
import Navbar from '../components/navbar/Navbar';
import InformationSoon from '../components/information_soon/InformationSoon';

import { useEffect } from 'react';
import axios from '../api/axios';



const Virtuve = () => {  
    useEffect(() => {

        // document.body.style.backgroundColor = '#eff1ef';
        document.title = 'Be žalos | Virtuvė';
        document.querySelector('video').setAttribute('oncontextmenu', "return false;");
        // const getData = async () => {
        //     await axios.get("/virtuve");
        // };
        // getData();



    }, []);
    
    return (
        <>
            <Navbar />
            <Main>
               <InformationSoon />
                {/* <video src="https://d1cupj4wyzfq3d.cloudfront.net/valgau-be-zalos-virtuve-vii-fizinis-ir-emocinis-alkis.mp4?Expires=1714426636&Key-Pair-Id=KPQGMPR9KLNK4&Signature=suo8AQXxiMiviKY7E1gE5tR9wcm2Idw0hZHPbwN8z3ctKQv9Uzu-FFSGe6G2wsgxtNXXoRHXTJeeBXacX7F18sTtL2LkivLM6ky64DWfAmtCxbH7rP804Ea8W1DuPS67yGVqpwhX37CnxdhV7rLyMF-2sWU6Uezf8Ultm2CaaiBWirKLiuhgBatLNwTPiZKOKw5Wq-mblb4RrHsj3-OSgeOEw9nGYlntrfPEHnjqRVVnFHb0c-IBa1My7uxF1TYleoNeIK1MTy9UxKx9Q8zJ~almQCDAa~RBBU1RTe4QKYmDCMxVJksDD-~ZEFm5KACz2wAYkIAmrio1QmNQvwgnGQ__" width="320" height="240" controls>
                    <source src="https://d1cupj4wyzfq3d.cloudfront.net/valgau-be-zalos-virtuve-vii-fizinis-ir-emocinis-alkis.mp4?Expires=1714426636&Key-Pair-Id=KPQGMPR9KLNK4&Signature=suo8AQXxiMiviKY7E1gE5tR9wcm2Idw0hZHPbwN8z3ctKQv9Uzu-FFSGe6G2wsgxtNXXoRHXTJeeBXacX7F18sTtL2LkivLM6ky64DWfAmtCxbH7rP804Ea8W1DuPS67yGVqpwhX37CnxdhV7rLyMF-2sWU6Uezf8Ultm2CaaiBWirKLiuhgBatLNwTPiZKOKw5Wq-mblb4RrHsj3-OSgeOEw9nGYlntrfPEHnjqRVVnFHb0c-IBa1My7uxF1TYleoNeIK1MTy9UxKx9Q8zJ~almQCDAa~RBBU1RTe4QKYmDCMxVJksDD-~ZEFm5KACz2wAYkIAmrio1QmNQvwgnGQ__" type="video/mp4" />
                </video> */}

                <video width="520"  controls 
                controlsList="nodownload"
                >
                    <source src="https://d1cupj4wyzfq3d.cloudfront.net/valgau-be-zalos-virtuve-vii-fizinis-ir-emocinis-alkis.mp4?Expires=1714695395&Key-Pair-Id=KPQGMPR9KLNK4&Signature=lDHy0lf5PPTcNWKD1CNxlL-py2is1ai5KAeNqph-f-CbPjpHX3UPxylA3iKAovBb1VB5fGKes1aUZ5p0eRg1NZp6AVHd6UQOpo1xICvfJ1BdfUdRyqBmgbo0kd6HqOAHRpIyxYacDka4JkPGuQ7asVUXixnucBK6fTK9GKt~8Ws1P4naSVysYY2OKcBlcHKiUyem-1OVW~eNg9L8Dx~udLfm6OtxOlZ9~U4~YTV-Ys6Wz2nbz2hcAMTRZg2sfPVOQ1yKIUSiOmdKhUe70RENk7Ntj4ju47oE4HfFy9wxDhnJptN4eSjMfEIj4Vh72V0blwJTr6p97B7v~oTc57Yz1Q__" type="video/mp4" />
                </video>
            </Main>
        </>
    );
};

export default Virtuve;