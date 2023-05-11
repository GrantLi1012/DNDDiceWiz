import React, { useState } from 'react';
import * as styles from "./Collapsible.css";
import d4 from '../../img/d4.png';

interface CollapsibleProps {
    title: string;
    content: JSX.Element;
};

export const Collapsible = (props: CollapsibleProps): JSX.Element => {
    const {title, content} = props;
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapsed = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div style={styles.collapsibleContainer(isCollapsed)}>
            <div>
                <div style={styles.titleBar}>
                    <div style={styles.title}>{title}</div>
                    <img src={d4} alt="d4" style={styles.d4Image(isCollapsed)} onClick={toggleCollapsed}/>
                </div>
                <div style={styles.dividerLine}></div>
            </div>
            { isCollapsed ? null : content }
        </div>
    );
};