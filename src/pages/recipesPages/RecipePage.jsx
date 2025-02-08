// import { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Main from '../../components/UI/Main';
import Container from '../../components/UI/Container';
import Layout from '../../components/receptai/receptas/Layout';
import Image from '../../components/receptai/receptas/Image';
import Details from '../../components/receptai/receptas/Details';

const RecipePage = () => {
    
    // console.log(location)
    // document.body.style.backgroundColor = 'var(--color-bgr-light)';
        // background-color: var(--color-bgr-light);
    return (
        <>
            <Navbar />
            <Main>
                <Container>
                    <Layout>
                        <Image />
                        <Details />
                    </Layout>
                </Container>
            </Main>
        </>
    );
};

export default RecipePage;