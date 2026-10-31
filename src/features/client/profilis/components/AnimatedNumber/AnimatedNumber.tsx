import CountUp from 'react-countup';

interface AnimatedNumberProps {
	value: number;
	/** Animacijos trukmė sekundėmis. */
	duration?: number;
}

/**
 * Sveikas skaičius, kuris pasikeitus reikšmei „prasisuka“ kaip skaitliukas – tiek didėjant, tiek mažėjant.
 * Animacija prasideda nuo ankstesnės reikšmės (`preserveValue`), pirmą kartą – nuo 0.
 */
export const AnimatedNumber = ({ value, duration = 1 }: AnimatedNumberProps) => (
	<CountUp end={Math.round(value)} duration={duration} decimals={0} separator="" preserveValue />
);
