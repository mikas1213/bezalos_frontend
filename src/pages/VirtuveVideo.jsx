import { useParams, useSearchParams } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Main from "../components/UI/Main";

import { jwtDecode } from "jwt-decode";
import useAuth  from '../hooks/useAuth';

const VirtuveVideo = () => {
    const { auth }  = useAuth();
    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    // document.querySelector('video').setAttribute('oncontextmenu', "return false;");
    console.log(searchParams.get('search'))
    console.log(searchParams.get('category'))


    return (
        <>
            <Navbar />
            <Main>
                {params.video}
                                {/* <video controls autoPlay={true} controlsList='nodownload' width='100%'>
                    <source src="https://d1cupj4wyzfq3d.cloudfront.net/videos/be-zalos-virtuve-qa-01.mp4?Expires=1714579473&Key-Pair-Id=KPQGMPR9KLNK4&Signature=CXfngJrYYB~CPWv3LxoNHNmrNqDWwSntCSHHCEeci77vQ3OS2vxw89zetGcYQYGwuLNFcTPDoUILdiAppBuLhnF4EyGRW3FPI65BoizQJmtf41XBt8dGCW8FDkYuuyTQdHEHbHN89BuW414RU0TFJ2cMr9QFAcNJFkSTVj1fGUiY1mQjFhwq4jPq8hLNoAn7UJAJp6Dn2BS4tbg0ey8BLOHAUp4JhFkz0ZHdEV92Kk7-gqAqL4h2Ltr8A1dHs~xcpck6thc4e2W6NPWRBBTH8H8mbazeP82UyR1~70eW5bBcV9~gflTzb8iMmoUcaZF4PQTx5lnjaMHHVmFN3KiBuQ__-" type='video/mp4' />
                </video> */}
            </Main>
        </>
    );
};

export default VirtuveVideo;
