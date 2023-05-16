import React, { useState} from 'react';
import axios from 'axios';
import * as styles from './Roller.css';

import { DiceGrid } from '../../component/DiceGrid/DiceGrid';

import { strings } from '../../staticAsset/strings';
import * as textStyles from '../../staticAsset/textStyle.css';
import { config } from '../../config/config';

import d20 from '../../img/d20.png';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Alert from 'react-bootstrap/Alert';

import { Divider } from '../../component/Divider/Divider';
import { Frame } from '../../component/Frame/Frame';

import { rollDiceRequest } from '../../request/rollDiceRequest';

export const Roller = (): JSX.Element => {
    const [d20Result, setD20Result] = useState<number | string>(0);
    const [rollAllResult, setRollAllResult] = useState<number | string>(0);
    const [rollAllDetail, setRollAllDetail] = useState<string>("");
    const [showAlert, setShowAlert] = useState(false);

    const [trueRandom, setTrueRandom] = useState<number>(0);
    const [diceCountValues, setDiceCountValues] = useState<{[key: string]: number}>({
        "d4": 0,
        "d6": 0,
        "d8": 0,
        "d10": 0,
        "d12": 0,
        "d20": 0
    });

    const diceMax: {[key: string]: number} = {
        "d4": 4,
        "d6": 6,
        "d8": 8,
        "d10": 10,
        "d12": 12,
        "d20": 20
    };

    const randomToggle = [
        { name:"Quick Roll", value: 0 },
        { name:"True Random", value: 1 }
    ]

    const rollDice = (diceMax: number): number => {
        return Math.floor(Math.random() * diceMax) + 1;
    };

    const handleRollD20 = () => {
        setD20Result("Loading...");
        if (config.enableRandomOrg === false || trueRandom === 0) {
            setD20Result(rollDice(20));
        }
        else {
            axios.post(config.randomOrgBasicApi, rollDiceRequest(1, 20)).then((response) => {
                setD20Result(response.data.result.random.data[0]);
            }).catch((error) => {
                console.log("[ERROR] Failed to roll d20: " + error);
                setD20Result("Failed to call API, please choose quick roll.");
            });
        }
    };

    const getSumResult = (result: {[key: string]: number[]}): number => {
        let sum = 0;
        for (const key in result) {
            for (let i = 0; i < result[key].length; i++) {
                sum += result[key][i];
            }
        }
        return sum;
    };

    const getResultDetail = (result: {[key: string]: number[]}): string => {
        let detail = "";
        for (const key in result) {
            for (let i = 0; i < result[key].length; i++) {
                detail += `${key}:${result[key][i]}, \n`;
            }
        }
        return detail;
    };

    const handleRollAll = () => {
        for (const key in diceCountValues) {
            if (diceCountValues[key] < 0 || diceCountValues[key] > 20) {
                setShowAlert(true);
                setRollAllResult("");
                setRollAllDetail("");
                return;
            }
        }
        setRollAllResult("Rolling...");
        setRollAllDetail("Loading...");
        let result:{[key: string]: number[]} = {
            "d4": [],
            "d6": [],
            "d8": [],
            "d10": [],
            "d12": [],
            "d20": []
        };
        
        if (config.enableRandomOrg === false || trueRandom === 0) {
            for (const key in diceCountValues) {
                if (diceCountValues[key] > 0) {
                    for (let i = 0; i < diceCountValues[key]; i++) {
                        result[key].push(rollDice(diceMax[key]));
                    }
                }
            }
            setRollAllResult(getSumResult(result));
            setRollAllDetail(getResultDetail(result));
            setShowAlert(false);
        }
        else {
            let requests = [];
            let diceArr: string[] = [];
            for (const key in diceCountValues) {
                if (diceCountValues[key] > 0) {
                    requests.push(axios.post(config.randomOrgBasicApi, rollDiceRequest(1, diceMax[key], diceCountValues[key])));
                    diceArr.push(key);
                }
            }
            axios.all(requests).then(axios.spread((...responses) => {
                for (let i=0; i<responses.length; i++) {
                    result[diceArr[i]] = responses[i].data.result.random.data;
                }
                setRollAllResult(getSumResult(result));
                setRollAllDetail(getResultDetail(result));
                setShowAlert(false);
            }
            )).catch((error) => {
                console.log("[ERROR] Failed to roll all: " + error);
                setRollAllResult("Failed to call API, please choose quick roll.");
            });
        }
    };

    return (
        <div style={styles.rollerContainer}>
            <div style={textStyles.largeTitle}>
                {strings.titles.diceRoller}
            </div>
            <div style={textStyles.textSmall}>
                {strings.roller.instruction1}
            </div>
            <ButtonGroup>
                {randomToggle.map((item,i) => (
                <ToggleButton
                    key={i}
                    id={`radomToggle-${i}`}
                    type="radio"
                    name="randomToggle"
                    variant="outline-dark"
                    value={item.value}
                    style={styles.toggle}
                    checked={trueRandom === item.value}
                    onChange={(e) => setTrueRandom(parseInt(e.currentTarget.value))}
                >
                    {item.name}
                </ToggleButton>
                ))}
            </ButtonGroup>
            <Divider type="ornamental1" size='small' alignment='center' />
            <div style={textStyles.subTitle}>
                {strings.roller.instruction2_1}
            </div>
            <div style={textStyles.textSmall}>
                {strings.roller.instruction2_2}
            </div>
            <div style={styles.rollItemContainer}>
                <img 
                    src={d20} 
                    alt="d20"
                    style={styles.clickable}
                    onClick={handleRollD20}
                    />
            </div>
            <div style={styles.rollItemContainer}>
                <Frame size="medium" content={d20Result.toString()} />
            </div>
            <Form>
                <Divider type="ornamental2" size='small' alignment='center' />
                <div style={textStyles.subTitle}>
                    {strings.roller.instruction3}
                </div>
                <DiceGrid
                    diceCount={diceCountValues}
                    setDiceCount={setDiceCountValues}
                />
                <Button variant="outline-dark" size="lg" style={styles.rollButton} onClick={handleRollAll}>
                    {strings.roller.roll}
                </Button>
                {
                    showAlert && (
                        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible style={styles.alertBox}>
                            <Alert.Heading>{strings.error.error}</Alert.Heading>
                            <p>
                            {strings.error.diceRangeError}
                            </p>
                        </Alert>
                    )
                }
                <div style={styles.rollItemContainer}>
                    <Frame size="medium" content={rollAllResult.toString()} />
                </div>
                <div style={textStyles.textSmall}>
                    {strings.roller.details + "\n" + rollAllDetail}
                </div>
            </Form>
        </div>
    );
};