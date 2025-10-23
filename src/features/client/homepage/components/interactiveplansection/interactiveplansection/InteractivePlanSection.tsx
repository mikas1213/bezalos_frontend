import styles from './InteractivePlanSection.module.css';
import { useEffect, useState, type ReactNode } from 'react';
import { useMediaQuery } from '../../../../../../contexts/MediaQueryProvider';
import { InteractiveCard } from '../interactivecard/InteractiveCard';
import { Box, Container, Cluster, Stack } from '../../../../../../components/Shared';
import { Icon1, Icon2, Icon3, Icon4 } from '../icons';
import phone1 from '../../../../../../assets/images/homepage/phone-mitybos-planas.webp';
import phone2 from '../../../../../../assets/images/homepage/phone-produktu-keitimas.webp';
import phone3 from '../../../../../../assets/images/homepage/phone-receptu-sudarymas.webp';
import { type Card } from '../types';

const cards: Card[] = [
    {
        id: 0,
        icon: <Icon1 />,
        title: 'Produktų keitimas plane',
        desc: 'Jei jau bandei keistis savarankiškai, bet grįžti prie tų pačių įpročių.',
        disabled: false
    },
    {
    id: 1,
        icon: <Icon2 />,
        title: 'Produktų keitimas',
        desc: 'Jei jau bandei keistis savarankiškai, bet grįžti prie tų pačių įpročių.',
        disabled: false
    },
    {
        id: 2,
        icon: <Icon3 />,
        title: 'Receptų sudarymas',
        desc: 'Jei jau bandei keistis savarankiškai, bet grįžti prie tų pačių įpročių.',
        disabled: false
    },
    {
        id: 3,
        icon: <Icon4 />,
        title: 'Mitybos sekimas',
        desc: 'Jei jau bandei keistis savarankiškai, bet grįžti prie tų pačių įpročių.',
        disabled: true
    }
];

export const InteractivePlanSection = () => {
    const phones = [phone1, phone2, phone3];
    const mediaQuery = useMediaQuery();
    const [selected, setSelected] = useState<number>(0);
    
    return (
        <Container as='section' id='interactiveplan' className='section--hiddenAAA padding--b'>
            <Stack space='var(--s-lg-desk)'>
                <Stack className={styles.header} space={mediaQuery < 577 ? 'var(--s-lg-mobi)' : '0'}>
                    <Box className={styles.title}>Pavargai nuolat pirkti naują planą?</Box>
                    <Box className={styles.subTitle}>Interaktyvus mitybos planas su neribotom galimybėm keisti produktus, kurti ir skaičiuoti receptus</Box>
                </Stack>

                {mediaQuery < 577 && <div className={styles.cardsMobile}>
                    <InteractiveCard card={cards[0]} selected={selected === 0} setSelected={setSelected} />
                    <InteractiveCard card={cards[1]} selected={selected === 1} setSelected={setSelected} />
                    <InteractiveCard card={cards[2]} selected={selected === 2} setSelected={setSelected} />
                    <InteractiveCard card={cards[3]} />
                </div>}

                <div className={styles.body}>
                    {mediaQuery > 576 && <>
                        <InteractiveCard card={cards[0]} selected={selected === 0} setSelected={setSelected} />
                        <InteractiveCard card={cards[1]} selected={selected === 1} setSelected={setSelected} />
                        <InteractiveCard card={cards[2]} selected={selected === 2} setSelected={setSelected} />
                        <InteractiveCard card={cards[3]} />
                    </>}
                    <div className={styles.phone}>
                        <img src={phones[selected]} alt='' />
                    </div>
                </div>

                <Cluster className={styles.bottom} justify='space-around'>
                    <Stack className={styles.item}>
                        <Box className={styles.itemTitle}>300+</Box>
                        <Box className={styles.itemLabel}>Maisto produktų</Box>
                    </Stack>
                    <Stack className={styles.item}>
                        <Box className={styles.itemTitle}>180+</Box>
                        <Box className={styles.itemLabel}>Skirtingų receptų</Box>
                    </Stack>
                    <Stack className={styles.item}>
                        <Box className={styles.itemTitle}>100+</Box>
                        <Box className={styles.itemLabel}>Numestų kilogramų</Box>
                    </Stack>
                </Cluster>

            </Stack>
        </Container>
    );
};