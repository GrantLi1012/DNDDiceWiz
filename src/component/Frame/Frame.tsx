import React from 'react';
import * as styles from './Frame.css';
import { Divider } from '../Divider/Divider';

interface FrameProps {
    size: 'small' | 'medium' | 'large',
    content: string
};

export const Frame = (props: FrameProps): JSX.Element => {
    const {size = 'medium', content = ''} = props;
    return (
        <div style={styles.frameContainer(size)}>
            <Divider type="ornamental4" size='small' alignment='center' flip />
                <div style={styles.frameContent(size)}>
                    {content}
                </div>
            <Divider type="ornamental4" size='small' alignment='center' />
        </div>
    );
};
