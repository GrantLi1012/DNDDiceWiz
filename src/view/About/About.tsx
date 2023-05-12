import React from 'react';
import * as styles from './About.css';
import { Collapsible } from '../../component/Collapsible/Collapsible';
import { strings } from '../../staticAsset/strings';

export const About = (): JSX.Element => {

    return (
        <div style={styles.aboutContainer}>
            <Collapsible title={strings.about.author.aboutAuthor} content={
                <div style={styles.aboutContent}>
                    {strings.about.author.aboutAuthorMessage}
                    <div>
                        <a href="https://grantli.netlify.app/">Check out my personal website</a>
                    </div>
                </div>
            }/>
            <Collapsible title={strings.about.featuresToCome.featuresToCome} content={
                <div style={styles.aboutContent}>
                    {strings.about.featuresToCome.featuresToComeList.map((feature)=> {
                        return <div>{feature}</div>;
                    })}
                </div>
            }/>
            <Collapsible title="Attribution of Images and Icons Used" content={
                <>
                    <div style={styles.aboutContent}>
                        Dividers ornaments made by <a href="https://www.figma.com/community/file/1130477805791080582">Fergolive</a>
                    </div>
                    <div style={styles.aboutContent}>
                        Dice images made by <a href="https://www.freeimages.com/vector/rpg-dice-4829402">openclipart.org</a>
                    </div>
                </>
            }/>
        </div>
    );
};