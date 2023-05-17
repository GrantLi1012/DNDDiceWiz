import React, { useState } from 'react';
import * as styles from './AverageRoll.css';
import { strings } from '../../staticAsset/strings';
import * as pageStyle from '../../staticAsset/pageStyle.css';
import * as textStyles from '../../staticAsset/textStyle.css';
import { averageDiceValues } from '../../staticAsset/averageDiceValues';
import { DiceGrid } from '../../component/DiceGrid/DiceGrid';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import { Divider } from '../../component/Divider/Divider';
import { Frame } from '../../component/Frame/Frame';

const diceListStr = [strings.dice.d4, strings.dice.d6, strings.dice.d8, strings.dice.d10, strings.dice.d12, strings.dice.d20];

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
    const [showAlert, setShowAlert] = useState(false);

    const handleModifierChange = (e: React.ChangeEvent<any>) => {
        setModifier(e.target.value ? parseInt(e.target.value) : 0);
    };

    const handleSubmit = () => {
        for (const key in diceCountValues) {
            if (diceCountValues[key] < 0) {
                setShowAlert(true);
                setResult(null);
                return;
            }
        }
        let result = 0;
        diceListStr.forEach((diceName) => {
            result += diceCountValues[diceName] * averageDiceValues[diceName];
        });
        result += modifier;
        setResult(result);
        setShowAlert(false);
    };

    return (
        <div style={pageStyle.pageContainer}>
            <Form>
                <div style={textStyles.largeTitle}>
                    {strings.titles.averageCalculator}
                </div>
                <div style={textStyles.textSmall}>
                    {strings.averageCalculator.instruction1}
                </div>
                <Divider type="ornamental1" size='small' alignment='center' />
                <div style={textStyles.subTitle}>
                    {strings.averageCalculator.instruction2_1}
                </div>
                <div style={textStyles.textSmall}>
                    {strings.averageCalculator.instruction2_2}
                </div>
                <DiceGrid
                    diceCount={diceCountValues}
                    setDiceCount={setDiceCountValues}
                />
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
                {
                    showAlert && (
                        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible style={styles.alertBox}>
                            <Alert.Heading>{strings.error.error}</Alert.Heading>
                            <p>
                            {strings.error.diceNegatieError}
                            </p>
                        </Alert>
                    )
                }
                <Frame size="large" content={result != null ? result.toString() : ''} />
            </Form>
        </div>
    );
};