import Main from "../components/UI/Main";
import Navbar from "../components/navbar/Navbar";
import WelcomeSection from "../components/homepage/WelcomeSection";
import AboutSection from "../components/homepage/AboutSection";
import ExperienceSection from '../components/homepage/ExperienceSection';
import BenefitsSection from "../components/homepage/BenefitsSection";
import TestimonialSection from '../components/homepage/TestimonialSection';

import { useState, useRef, useEffect } from "react";

const Homepage = () => {

    const ref = useRef(null);
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        document.body.style.backgroundColor = "#084747";
        document.title = "Be žalos";
        window.scrollTo(0, 0);
    }, []);
    
    useEffect(() => {
        const revealSection = (entries/*, observer*/) => {
            const [entry] = entries;
            setIsIntersecting(entry.isIntersecting);
            if(!isIntersecting) return;
            entry.target.classList.remove('section--hidden');
        };

        const sectionObserver = new IntersectionObserver(revealSection, {
            root: null,
            threshold: 0.15
        });

        ref.current.querySelectorAll(".section--hidden").forEach((section) => {
            sectionObserver.observe(section)
        });

        return () => sectionObserver.disconnect();
                     
    }, [isIntersecting]);
    
    return (
        <>
            <Navbar isHome={true} />
            <Main isHome={true} myRef={ref}>
                <WelcomeSection />
                <ExperienceSection />
                <AboutSection />
                <BenefitsSection />
                <TestimonialSection />
            </Main>
        </>
    );
};

export default Homepage;
