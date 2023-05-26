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
                        Check out my website <a style={styles.profileLink} href="https://grantli.netlify.app/">here</a> or support me by buying me a coffee! :D We all know how programmers need them...
                    </div>
                    <div>
                        <a href="https://www.buymeacoffee.com/bunnygrant" target="_blank" rel="noreferrer"><img style={styles.supportButton} src="https://cdn.buymeacoffee.com/buttons/v2/default-red.png" alt="Buy Me A Coffee" /></a>
                    </div>
                </div>
            } defaultCollapsed={false} />
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