import React, {useState} from 'react';
import * as styles from './AbilityCheck.css';
import * as textStyles from '../../staticAsset/textStyle.css';
import * as pageStyle from '../../staticAsset/pageStyle.css';

import { strings } from '../../staticAsset/strings';
import { useMediaQuery } from '../../customHooks/useMediaQuery';
import { Divider } from '../../component/Divider/Divider';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

type Stats = "STR" | "DEX" | "CON" | "INT" | "WIS" | "CHA";
type Skills = "Acrobatics" | "Animal Handling" | "Arcana" | "Athletics" | "Deception" | "History" | "Insight" | "Intimidation" | "Investigation" | "Medicine" | "Nature" | "Perception" | "Performance" | "Persuasion" | "Religion" | "Sleight of Hand" | "Stealth" | "Survival";

const STATS: Stats[] = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];
const SKILLS: Skills[] = ["Acrobatics", "Animal Handling", "Arcana", "Athletics", "Deception", "History", "Insight", "Intimidation", "Investigation", "Medicine", "Nature", "Perception", "Performance", "Persuasion", "Religion", "Sleight of Hand", "Stealth", "Survival"];

const SkillMapping: {[key in Skills]: Stats} = {
    "Acrobatics": "DEX",
    "Animal Handling": "WIS",
    "Arcana": "INT",
    "Athletics": "STR",
    "Deception": "CHA",
    "History": "INT",
    "Insight": "WIS",
    "Intimidation": "CHA",
    "Investigation": "INT",
    "Medicine": "WIS",
    "Nature": "INT",
    "Perception": "WIS",
    "Performance": "CHA",
    "Persuasion": "CHA",
    "Religion": "INT",
    "Sleight of Hand": "DEX",
    "Stealth": "DEX",
    "Survival": "WIS"
};

export const AbilityCheck = (): JSX.Element => {
    var expanded = useMediaQuery('(min-width: 768px)');
    const [stats, setStats] = useState<{[key in Stats]: number}>({
        "STR": 0,
        "DEX": 0,
        "CON": 0,
        "INT": 0,
        "WIS": 0,
        "CHA": 0
    });
    const [proficiencyBonus, setProficiencyBonus] = useState<number>(0);

    const handleStatsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        const num = parseInt(value)
        if (num < 0 || num > 20) {
            alert("Stats must be between 0 and 20");
            return;
        }
        console.log(name);
        console.log(value);
        setStats({
            ...stats,
            [name]: num
        });
    };

    const handleProficiencyBonusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        const num = parseInt(value)
        if (proficiencyBonus < 2 || proficiencyBonus > 6) {
            alert("Proficiency Bonus must be between 2 and 6");
            return;
        }
        setProficiencyBonus(parseInt(value));
    };

    return (
        <div style={pageStyle.pageContainer}>
            <div style={textStyles.largeTitle}>
                {strings.titles.abilityCheck}
            </div>
            <div style={textStyles.textSmall}>
                {strings.abilityCheck.instruction1}
            </div>
            <Divider type="ornamental1" size='small' alignment='center' />
            <div style={textStyles.subTitle}>
                {strings.abilityCheck.instruction2}
                <div style={styles.statsGrid(expanded)}>
                    {STATS.map((stat) => {
                        return (
                            <div style={styles.statsGridItem}>
                                <div style={textStyles.textMedium}>
                                    {stat}
                                </div>
                                <Form.Control 
                                    className="text-center"
                                    type='number'
                                    name={stat}
                                    placeholder="0"
                                    value={stats[stat]}
                                    onChange={handleStatsChange}
                                />
                            </div>
                        );
                    })}
                    <div style={styles.statsGridItem}>
                        <div style={textStyles.textMedium}>
                            {strings.abilityCheck.proficiencyBonus}
                        </div>
                        <Form.Control 
                            className="text-center"
                            type='number'
                            placeholder="2"
                            value={proficiencyBonus}
                            onChange={handleProficiencyBonusChange}
                        />
                    </div>
                </div>
            </div>
            <Divider type="ornamental2" size='small' alignment='center' />
            <div style={textStyles.subTitle}>
                {strings.abilityCheck.instruction3_1}
            </div>
            <div style={textStyles.textSmall}>
                {strings.abilityCheck.instruction3_2}
            </div>
            <Divider type="ornamental3" size='small' alignment='center' />
            <div style={textStyles.subTitle}>
                {strings.abilityCheck.instruction4}
            </div>
        </div>
    );
};