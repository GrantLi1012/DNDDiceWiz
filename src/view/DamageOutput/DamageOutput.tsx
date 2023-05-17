import React, {useState} from 'react';
import * as styles from './DamageOutput.css';
import * as textStyles from '../../staticAsset/textStyle.css';
import * as pageStyle from '../../staticAsset/pageStyle.css';

import { strings } from '../../staticAsset/strings';
import { averageDiceValues } from '../../staticAsset/averageDiceValues';

import { DiceGrid } from '../../component/DiceGrid/DiceGrid';
import { Divider } from '../../component/Divider/Divider';

import { useMediaQuery } from '../../customHooks/useMediaQuery';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

const diceListStr = [strings.dice.d4, strings.dice.d6, strings.dice.d8, strings.dice.d10, strings.dice.d12, strings.dice.d20];

export const DamageOutput = (): JSX.Element => {
    const expanded = useMediaQuery("(min-width: 768px)");

    const [diceCountValues, setDiceCountValues] = useState<{[key: string]: number}>({
        "d4": 0,
        "d6": 0,
        "d8": 0,
        "d10": 0,
        "d12": 0,
        "d20": 0
    });
    const [showAlert, setShowAlert] = useState(false);

    // attack info
    const [ac, setAC] = useState<number>(0);
    const [attackBonus, setAttackBonus] = useState<number>(0);
    const [damageModifier, setDamageModifier] = useState<number>(0);

    // results
    const [hitChance, setHitChance] = useState<number | null | string>(null);
    const [avgDamage, setAvgDamage] = useState<number | null | string>(null);
    const [avgDamageHit, setAvgDamageHit] = useState<number | null | string>(null);
    const [avgDamageCrit, setAvgDamageCrit] = useState<number | null | string>(null);

    const calculateHitChance = (ac: number, attackBonus:number): number => {
        let hitChance = 0;
        if (attackBonus >= ac) {
            hitChance = 100;
        } else if (attackBonus <= ac - 20) {
            hitChance = 0;
        } else {
            hitChance = 100 * (21 - ac + attackBonus) / 20;
        }
        return hitChance;
    };

    const calculateAvgDamageHit = (diceCountValues: {[key: string]: number}, damageModifier: number): number => {
        let avgDamageHit = 0;
        diceListStr.forEach((diceName) => {
            avgDamageHit += averageDiceValues[diceName] * diceCountValues[diceName];
        });
        avgDamageHit += damageModifier;
        return avgDamageHit;
    };

    const handleCalculate = () => {
        setHitChance("Calculating...");
        setAvgDamage("Calculating...");
        setAvgDamageHit("Calculating...");
        setAvgDamageCrit("Calculating...");

        const hitChance = calculateHitChance(ac, attackBonus);
        setHitChance(hitChance);

        const avgDamageHit = calculateAvgDamageHit(diceCountValues, damageModifier);
        setAvgDamageHit(avgDamageHit);

        const avgDamageCrit = (avgDamageHit - damageModifier) * 2 + damageModifier;
        setAvgDamageCrit(avgDamageCrit);

        const avgDamage = (avgDamageHit * (hitChance-5) / 100 + avgDamageCrit * 5 / 100).toFixed(2);
        setAvgDamage(avgDamage);
    };

    return (
        <div style={pageStyle.pageContainer}>
            <div style={textStyles.largeTitle}>
                {strings.titles.damageCalculator}
            </div>
            <div style={textStyles.textSmall}>
                {strings.damageCalculator.instruction1}
            </div>
            <Divider type="ornamental1" size='small' alignment='center' />
            <Form>
                <div style={textStyles.subTitle}>
                    {strings.damageCalculator.instruction2}
                </div>
                <div style={styles.attackInfo(expanded)}>
                    <div style={styles.attackInfoItem}>
                        <Form.Group className="mb-3">
                            <Form.Label>{strings.damageCalculator.ac}</Form.Label>
                            <Form.Control 
                                type="number" 
                                placeholder="0" 
                                className="text-center" 
                                onChange={(e) => setAC(e.target.value ? parseInt(e.target.value) : 0)}
                                value={ac} />
                        </Form.Group>
                    </div>
                    <div style={styles.attackInfoItem}>
                        <Form.Group className="mb-3">
                            <Form.Label>{strings.damageCalculator.attackBonus}</Form.Label>
                            <Form.Control 
                                type="number" 
                                placeholder="0" 
                                className="text-center" 
                                onChange={(e) => setAttackBonus(e.target.value ? parseInt(e.target.value) : 0)}
                                value={attackBonus} />
                        </Form.Group>
                    </div>
                    <div style={styles.attackInfoItem}>
                        <Form.Group className="mb-3">
                            <Form.Label>{strings.damageCalculator.damageModifier}</Form.Label>
                            <Form.Control 
                                type="number" 
                                placeholder="0" 
                                className="text-center" 
                                onChange={(e) => setDamageModifier(e.target.value ? parseInt(e.target.value) : 0)}
                                value={damageModifier} />
                        </Form.Group>
                    </div>
                </div>
                <Divider type="ornamental2" size='small' alignment='center' />
                <div style={textStyles.subTitle}>
                    {strings.damageCalculator.instruction3}
                </div>
                <DiceGrid
                    diceCount={diceCountValues}
                    setDiceCount={setDiceCountValues}
                />
                <Divider type="ornamental3" size='small' alignment='center' />
            </Form>
            <div style={textStyles.subTitle}>
                {strings.damageCalculator.instruction4}
            </div>
            <Button variant="outline-dark" size="lg" onClick={handleCalculate}>
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
            <div style={styles.resultList}>
                <div style={textStyles.textMedium}>
                    {strings.damageCalculator.chanceToHit + ": " + (hitChance ? hitChance + "%" : "")}
                </div>
                <div style={textStyles.textMedium}>
                    {strings.damageCalculator.avgDamage + ": " + (avgDamage ? avgDamage : "")}
                </div>
                <div style={textStyles.textMedium}>
                    {strings.damageCalculator.avgDamageWhenHit + ": " + (avgDamageHit ? avgDamageHit : "")}
                </div>
                <div style={textStyles.textMedium}>
                    {strings.damageCalculator.avgDamageWhenCrit + ": " + (avgDamageCrit ? avgDamageCrit : "")}
                </div>
            </div>
        </div>
    );
}