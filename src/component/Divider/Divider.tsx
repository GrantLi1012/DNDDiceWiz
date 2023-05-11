import React from 'react';
import * as styles from './Divider.css';
import defaultDivider from '../../img/divider4.png';
import ornamentalDivider1 from '../../img/divider1.png';
import ornamentalDivider2 from '../../img/divider2.png';
import ornamentalDivider3 from '../../img/divider3.png';

type DividerStyles = 'default' | 'ornamental1' | 'ornamental2' | 'ornamental3';

interface DividerProps {
    style?: DividerStyles; 
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
        default:
            return defaultDivider;
    }
};

export const Divider = (props: DividerProps): JSX.Element => {
    const {style} = props;
    return (
        <img src={getDividerImage(style)} alt="divider" style={styles.dividerImage}/>
    )
};