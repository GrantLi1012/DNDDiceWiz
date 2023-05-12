import React from 'react';
import * as styles from './Divider.css';
import defaultDivider from '../../img/divider4.png';
import ornamentalDivider1 from '../../img/divider1.png';
import ornamentalDivider2 from '../../img/divider2.png';
import ornamentalDivider3 from '../../img/divider3.png';
import ornamentalDivider4 from '../../img/divider5.png';

type DividerStyles = 'default' | 'ornamental1' | 'ornamental2' | 'ornamental3'| 'ornamental4';
type DividerSizes = 'small' | 'medium' | 'large';
type DividerAlignments = 'left' | 'center' | 'right';

interface DividerProps {
    style?: DividerStyles; 
    size?: DividerSizes;
    alignment?: DividerAlignments;
    flip?: boolean;
};

const getDividerImage = (style: DividerStyles | undefined): string => {
    switch (style) {
        case 'default':
            return defaultDivider;
        case 'ornamental1':
            return ornamentalDivider1;
        case 'ornamental2':
            return ornamentalDivider2;
        case 'ornamental3':
            return ornamentalDivider3;
        case 'ornamental4':
            return ornamentalDivider4;
        default:
            return defaultDivider;
    }
};

export const Divider = (props: DividerProps): JSX.Element => {
    const {style = "default", size = "medium", alignment = "center", flip = false} = props;
    return (
        <div style={styles.dividerContainer(alignment)}>
            <img src={getDividerImage(style)} alt="divider" style={styles.dividerImage(size, flip)}/>
        </div>
    )
};