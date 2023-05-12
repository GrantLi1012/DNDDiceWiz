import React, { useState } from 'react';
import * as styles from './AverageRoll.css';
import { strings } from '../../staticAsset/strings';
import * as textStyles from '../../staticAsset/textStyle.css';
import { averageDiceValues } from '../../staticAsset/averageDiceValues';

import d4 from '../../img/d4.png';
import d6 from '../../img/d6.png';
import d8 from '../../img/d8.png';
import d10 from '../../img/d10.png';
import d12 from '../../img/d12.png';
import d20 from '../../img/d20.png';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { Divider } from '../../component/Divider/Divider';
import { Frame } from '../../component/Frame/Frame';

const diceListStr = [strings.dice.d4, strings.dice.d6, strings.dice.d8, strings.dice.d10, strings.dice.d12, strings.dice.d20];
const diceListImg = [d4, d6, d8, d10, d12, d20];

export const AverageRoll = (): JSX.Element => {
    const [diceCountValues, setDiceCountValues] = useState<{[key: string]: number}>({
        "d4": 0,
        "d6": 0,
        "d8": 0,
        "d10": 0,
        "d12": 0,
        "d20": 0
    });
    const [modifier, setModifier] = useState<number>(0);
    const [result, setResult] = useState<number | null>(null);

    const handleDiceCountChange = (e: React.ChangeEvent<any>) => {
        console.log("handle dice count change");
        const newDiceCountValues = diceCountValues;
        newDiceCountValues[e.target.name] = e.target.value ? parseInt(e.target.value) : 0;
        setDiceCountValues(newDiceCountValues);
    };

    const handleModifierChange = (e: React.ChangeEvent<any>) => {
        setModifier(e.target.value ? parseInt(e.target.value) : 0);
    };

    const handleSubmit = () => {
        let result = 0;
        diceListStr.forEach((diceName) => {
            result += diceCountValues[diceName] * averageDiceValues[diceName];
        });
        result += modifier;
        setResult(result);
    };

    return (
        <div style={styles.applicationContainer}>
            <Form>
                <div style={textStyles.largeTitle}>
                    {strings.titles.averageCalculator}
                </div>
                <div style={textStyles.textMedium}>
                    {strings.averageCalculator.instruction1}
                </div>
                <Divider type="ornamental1" size='small' alignment='center' />
                <div style={textStyles.subTitle}>
                    {strings.averageCalculator.instruction2_1}
                </div>
                <div style={textStyles.textSmall}>
                    {strings.averageCalculator.instruction2_2}
                </div>
                <div style={styles.diceGrid}>
                    {
                        diceListImg.map((dice, index) => {
                            return (
                                <div style={styles.diceGridItem} key={index}>
                                    <img src={dice} alt={diceListStr[index]} style={styles.diceImage} />
                                </div>
                            );
                        })
                    }
                    {
                        diceListStr.map((diceName) => {
                            return (
                                <div style={styles.diceGridItem}>
                                    <div style={textStyles.textMedium}>
                                        {diceName}
                                    </div>
                                </div>
                            )
                        })
                    }
                    {
                        diceListStr.map((diceName) => {
                            return (
                                <div style={styles.diceGridItem}>
                                    <div style={styles.diceInput}>
                                        <Form.Control 
                                            className="text-center" 
                                            type='number'
                                            name={diceName}
                                            placeholder="0" 
                                            value={diceCountValues.diceName}
                                            onChange={handleDiceCountChange}    
                                        />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <Divider type="ornamental2" size='small' alignment='center' />
                <div style={textStyles.subTitle}>
                    {strings.averageCalculator.instruction3_1}
                </div>
                <div style={textStyles.textSmall}>
                    {strings.averageCalculator.instruction3_2}
                </div>
                <div style={styles.modifierInputContainer}>
                    <Form.Control 
                        className="text-center"
                        type='number'
                        placeholder="0" 
                        style={styles.modifierInput} 
                        value={modifier}
                        onChange={handleModifierChange}
                    />
                </div>
                <Divider type="ornamental3" size='small' alignment='center' />
                <div style={textStyles.subTitle}>
                    {strings.averageCalculator.instruction4_1}
                </div>
                <Button variant="outline-dark" size="lg" onClick={handleSubmit}>
                    {strings.averageCalculator.calculate}
                </Button>
                <Frame size="large" content={result != null ? result.toString() : ''} />
            </Form>
        </div>
    );
};