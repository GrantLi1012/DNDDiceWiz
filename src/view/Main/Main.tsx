import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as styles from './Main.css';
import dice from '../../img/dice-row.png';
import Button from 'react-bootstrap/Button';
import { strings } from '../../asset/strings';

export const Main = (): JSX.Element => {
    const navigate = useNavigate();

    const goToApplication = () => {
        navigate('/application');
    };

    return (
        <div style={styles.mainPageContainer}>
            <div style={styles.title}> {strings.appName} </div>
            <div style={styles.text}> {strings.welcomeMessage} </div>
            <div style={styles.text}> {strings.appDescriptionLine1} </div>
            <div style={styles.text}> {strings.appDescriptionLine2} </div>
            <Button variant="outline-dark" size="lg" style={styles.startButton} onClick={goToApplication} >
                {strings.startApp}
            </Button>
            <img src={dice} alt="dice-row" style={styles.diceImage}/>
        </div>
    );
};