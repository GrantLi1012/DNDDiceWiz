import React, {useState} from 'react';
import * as styles from './DamageSpellSave.css';
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

export const DamageSpellSave = (): JSX.Element => {
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
    const [dc, setDC] = useState<number>(0);
    const [saveModifier, setSaveModifier] = useState<number>(0);
    const [damageModifier, setDamageModifier] = useState<number>(0);
    const [percentageWhenSaved, setPercentageWhenSaved] = useState<number>(0);

    // results
    const [failChance, setFailChance] = useState<number | null | string>(null);
    const [avgDamage, setAvgDamage] = useState<number | null | string>(null);
    const [avgDamageFailed, setAvgDamageFailed] = useState<number | null | string>(null);
    const [avgDamageSaved, setAvgDamageSaved] = useState<number | null | string>(null);

    const calculateFailChance = (dc: number, saveBonus: number) => {
        let successChance = 0;
        if (saveBonus >= dc) {
            successChance = 100;
        } else if (saveBonus <= dc - 20) {
            successChance = 0;
        } else {
            successChance = 100 * (21 - dc + saveBonus) / 20;
        }
        return 100 - successChance;
    };

    const calculateAvgDamage = (diceCountValues: {[key: string]: number}) => {
        let total = 0;
        for (const [key, value] of Object.entries(diceCountValues)) {
            total += value * averageDiceValues[key];
        }
        return total;
    };

    const handleCalculate = () => {
        setFailChance("Loading...");
        setAvgDamage("Loading...");
        setAvgDamageFailed("Loading...");
        setAvgDamageSaved("Loading...");

        const failChance = calculateFailChance(dc, saveModifier);
        setFailChance(failChance.toFixed(2));

        const damageWhenFailed = calculateAvgDamage(diceCountValues) + damageModifier;
        setAvgDamageFailed(damageWhenFailed.toFixed(2));

        const damageWhenSaved = damageWhenFailed * percentageWhenSaved / 100;
        setAvgDamageSaved(damageWhenSaved.toFixed(2));

        const avgDamage = damageWhenFailed * failChance / 100 + damageWhenSaved * (100 - failChance) / 100;
        setAvgDamage(avgDamage.toFixed(2));
    };

    return (
        <div style={pageStyle.pageContainer}>
            <div style={textStyles.largeTitle}>
                {strings.titles.damageSpellSave}
            </div>
            <div style={textStyles.textSmall}>
                {strings.damageSpellSave.instruction1}
            </div>
            <Divider type="ornamental1" size='small' alignment='center' />
            <Form>
                <div style={textStyles.subTitle}>
                    {strings.damageSpellSave.instruction2}
                </div>
                <div style={styles.attackInfo(expanded)}>
                    <div style={styles.attackInfoItem}>
                        <Form.Group className="mb-3">
                            <Form.Label>{strings.damageSpellSave.dc}</Form.Label>
                            <Form.Control 
                                type="number" 
                                placeholder="0" 
                                className="text-center" 
                                onChange={(e) => setDC(e.target.value ? parseInt(e.target.value) : 0)}
                                value={dc} />
                        </Form.Group>
                    </div>
                    <div style={styles.attackInfoItem}>
                        <Form.Group className="mb-3">
                            <Form.Label>{strings.damageSpellSave.saveBonus}</Form.Label>
                            <Form.Control 
                                type="number" 
                                placeholder="0" 
                                className="text-center" 
                                onChange={(e) => setSaveModifier(e.target.value ? parseInt(e.target.value) : 0)}
                                value={saveModifier} />
                        </Form.Group>
                    </div>
                    <div style={styles.attackInfoItem}>
                        <Form.Group className="mb-3">
                            <Form.Label>{strings.damageSpellSave.damageModifier}</Form.Label>
                            <Form.Control 
                                type="number" 
                                placeholder="0" 
                                className="text-center" 
                                onChange={(e) => setDamageModifier(e.target.value ? parseInt(e.target.value) : 0)}
                                value={damageModifier} />
                        </Form.Group>
                    </div>
                    <div style={styles.attackInfoItem}>
                        <Form.Group className="mb-3">
                            <Form.Label>{strings.damageSpellSave.percentDamageWhenSaved}</Form.Label>
                            <Form.Select
                                placeholder="0" 
                                className="text-center" 
                                onChange={(e) => setPercentageWhenSaved(e.target.value ? parseInt(e.target.value) : 0)}
                                value={percentageWhenSaved}>
                                <option value={0}>0%</option>
                                <option value={50}>50%</option>
                                <option value={100}>100%</option>
                            </Form.Select>
                        </Form.Group>
                    </div>
                </div>
                <Divider type="ornamental2" size='small' alignment='center' />
                <div style={textStyles.subTitle}>
                    {strings.damageSpellSave.instruction3}
                </div>
                <DiceGrid
                    diceCount={diceCountValues}
                    setDiceCount={setDiceCountValues}
                />
                <Divider type="ornamental3" size='small' alignment='center' />
            </Form>
            <div style={textStyles.subTitle}>
                {strings.damageSpellSave.instruction4}
            </div>
            <Button variant="outline-dark" size="lg" onClick={handleCalculate}>
                {strings.damageSpellSave.calculate}
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
                    {strings.damageSpellSave.enemyFailChance + ": " + (failChance ? failChance + "%" : "")}
                </div>
                <div style={textStyles.textMedium}>
                    {strings.damageSpellSave.avgDamage + ": " + (avgDamage ? avgDamage : "")}
                </div>
                <div style={textStyles.textMedium}>
                    {strings.damageSpellSave.avgDamageWhenFailed + ": " + (avgDamageFailed ? avgDamageFailed : "")}
                </div>
                <div style={textStyles.textMedium}>
                    {strings.damageSpellSave.avgDamageWhenSaved + ": " + (avgDamageSaved ? avgDamageSaved : "")}
                </div>
            </div>
        </div>
    );
}