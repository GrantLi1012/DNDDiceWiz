import React, { useState } from 'react';
import * as styles from "./Collapsible.css";
import d4 from '../../img/d4.png';

interface CollapsibleProps {
    title: string;
    content: JSX.Element;
    defaultCollapsed?: boolean;
};

export const Collapsible = (props: CollapsibleProps): JSX.Element => {
    const {title, content, defaultCollapsed = true} = props;
    const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

    const toggleCollapsed = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div style={styles.collapsibleContainer(isCollapsed)}>
            <div onClick={toggleCollapsed}>
                <div style={styles.titleBar}>
                    <div style={styles.title}>{title}</div>
                    <img src={d4} alt="d4" style={styles.d4Image(isCollapsed)}/>
                </div>
                <div style={styles.dividerLine}></div>
            </div>
            { isCollapsed ? null : content }
        </div>
    );
};