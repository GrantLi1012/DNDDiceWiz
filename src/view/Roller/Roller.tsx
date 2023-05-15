import React, {useEffect, useState} from 'react';
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

import { Divider } from '../../component/Divider/Divider';
import { Frame } from '../../component/Frame/Frame';

import { rollDiceRequest } from '../../request/rollDiceRequest';

const diceListStr = [strings.dice.d4, strings.dice.d6, strings.dice.d8, strings.dice.d10, strings.dice.d12, strings.dice.d20];

export const Roller = (): JSX.Element => {
    const [d20Result, setD20Result] = useState<number | string>(0);
    const [trueRandom, setTrueRandom] = useState<number>(0);
    const [diceCountValues, setDiceCountValues] = useState<{[key: string]: number}>({
        "d4": 0,
        "d6": 0,
        "d8": 0,
        "d10": 0,
        "d12": 0,
        "d20": 0
    });

    const randomToggle = [
        { name:"Quick Roll", value: 0 },
        { name:"True Random", value: 1 }
    ]

    const handleRollD20 = () => {
        setD20Result("Loading...")
        if (config.enableRandomOrg === false || trueRandom === 0) {
            setD20Result(Math.floor(Math.random() * 20) + 1);
        }
        else {
            axios.post(config.randomOrgBasicApi, rollDiceRequest(1, 20)).then((response) => {
                setD20Result(response.data.result.random.data[0]);
            }).catch((error) => {
                console.log("[ERROR] Failed to roll d20: " + error);
                setD20Result(Math.floor(Math.random() * 20) + 1);
            });
        }
    };

    const handleSubmit = () => {
    };

    return (
        <div style={styles.rollerContainer}>
            <Form>
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
                        className="flipAnimation"
                        onClick={handleRollD20}
                        />
                </div>
                <div style={styles.rollItemContainer}>
                    <Frame size="medium" content={d20Result.toString()} />
                </div>
                <Divider type="ornamental2" size='small' alignment='center' />
                <div style={textStyles.subTitle}>
                    {strings.roller.instruction3}
                </div>
                <DiceGrid
                    diceCount={diceCountValues}
                    setDiceCount={setDiceCountValues}
                />
                <Button variant="outline-dark" size="lg" onClick={handleSubmit} style={styles.rollButton}>
                    {strings.roller.roll}
                </Button>
            </Form>
        </div>
    );
};