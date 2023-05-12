import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as styles from './Home.css';
import dice from '../../img/dice-row.png';
import Button from 'react-bootstrap/Button';
import { strings } from '../../staticAsset/strings';

export const Home = (): JSX.Element => {
    const navigate = useNavigate();

    const goToApplication = () => {
        navigate('/application');
    };

    return (
        <div style={styles.mainPageContainer}>
            <div style={styles.title}> {strings.home.appName} </div>
            <div style={styles.text}> {strings.home.welcomeMessage} </div>
            <div style={styles.text}> {strings.home.appDescriptionLine1} </div>
            <div style={styles.text}> {strings.home.appDescriptionLine2} </div>
            <Button variant="outline-dark" size="lg" style={styles.startButton} onClick={goToApplication} >
                {strings.home.startApp}
            </Button>
            <div style={styles.diceImage}>
                <img src={dice} alt="dice-row" style={styles.diceImage}/>
            </div>
        </div>
    );
};