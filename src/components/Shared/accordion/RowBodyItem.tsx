import styles from './RowBodyItem.module.css';
import { Cluster } from '../../Shared/cluster/Cluster';
import type { Item, Properties } from './types';
type Props = { item: Item, properties: Properties };

const RowBodyItem = ({ item, properties }: Props) => {
    const {bulletPoint, subBulletPoint} = properties;   
    return (
        <>
            <Cluster className={styles.rowBodyItem} align='flex-start' wrap='nowrap'>
                {bulletPoint && <span style={{ 
                    fontSize: 'var(--font-25)', 
                    lineHeight: '100%', 
                    color: properties.colors.textColor
                }}>
                    {bulletPoint}
                </span>}
                
                <span style={{ 
                    color: properties.colors.textColor
                }}>{item.text}</span>
            </Cluster>

            {item.subItems && item.subItems.length > 0 && <Cluster dir='column' gap='1rem' className={styles.subItems}>
                {item.subItems.map((subItem, i) => <Cluster key={i} gap='0.5rem' wrap='nowrap' className={styles.subItem}>
                    {subBulletPoint && <span style={{ color: properties.colors.textColor}}>{subBulletPoint}</span>}
                    <span style={{ color: properties.colors.textColor}} className={styles.text}>{subItem.text}</span>
                </Cluster>)}
            </Cluster>}
        </>
    );
};

export default RowBodyItem;