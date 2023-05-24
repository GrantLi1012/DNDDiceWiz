import React, {useState} from 'react';
import * as styles from './AbilityCheck.css';
import * as textStyles from '../../staticAsset/textStyle.css';
import * as pageStyle from '../../staticAsset/pageStyle.css';

import { d20Distribution } from '../../staticAsset/d20Distribution';
import { strings } from '../../staticAsset/strings';
import { useMediaQuery } from '../../customHooks/useMediaQuery';
import { Divider } from '../../component/Divider/Divider';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

type Stats = "STR" | "DEX" | "CON" | "INT" | "WIS" | "CHA";
type Skills = "Acrobatics" | "Animal Handling" | "Arcana" | "Athletics" | "Deception" | "History" | "Insight" | "Intimidation" | "Investigation" | "Medicine" | "Nature" | "Perception" | "Performance" | "Persuasion" | "Religion" | "Sleight of Hand" | "Stealth" | "Survival";
type SkillBonus = "0" | "2x" | ".5";

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
    var medium = useMediaQuery('(min-width: 768px)');
    var huge = useMediaQuery('(min-width: 1408px)');
    const [stats, setStats] = useState<{[key in Stats]: number}>({
        "STR": 0,
        "DEX": 0,
        "CON": 0,
        "INT": 0,
        "WIS": 0,
        "CHA": 0
    });
    const [proficiencyBonus, setProficiencyBonus] = useState<number>(0);
    const [skillBonus, setSkillBonus] = useState<{[key in Skills]: SkillBonus}>({
        "Acrobatics": "0",
        "Animal Handling": "0",
        "Arcana": "0",
        "Athletics": "0",
        "Deception": "0",
        "History": "0",
        "Insight": "0",
        "Intimidation": "0",
        "Investigation": "0",
        "Medicine": "0",
        "Nature": "0",
        "Perception": "0",
        "Performance": "0",
        "Persuasion": "0",
        "Religion": "0",
        "Sleight of Hand": "0",
        "Stealth": "0",
        "Survival": "0"
    });

    // for chartjs
    const [selectedStat, setSelectedStat] = useState<Stats | string>("");
    const [selectedSkill, setSelectedSkill] = useState<Skills | string>("");
    const [statData, setStatData] = useState<
        {
            labels: string[], 
            datasets: {
                label: string,
                data: number[],
                borderColor: string[],
                backgroundColor: string[]
            }[]
        } | null
    >(null);
    const [skillData, setSkillData] = useState<
        {
            labels: string[], 
            datasets: {
                label: string,
                data: number[],
                borderColor: string[],
                backgroundColor: string[]
            }[]
        } | null
    >(null);

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
        if (num < 2 || num > 6) {
            alert("Proficiency Bonus must be between 2 and 6");
            return;
        }
        setProficiencyBonus(num);
    };

    const handleSkillBonusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = event.target;
        if (value !== "0" && value !== "2x" && value !== ".5") {
            alert("Skill Bonus must be 0, 2x, or .5");
            return;
        }
        setSkillBonus({
            ...skillBonus,
            [name]: value
        });
    };

    const handleShowGraph = () => {
    };

    const handleSetSelectedStat = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const {value} = event.target;
        setSelectedStat(value);
    };

    const handleSetSelectedSkill = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const {value} = event.target;
        setSelectedSkill(value as Skills);
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
                <div style={styles.infoGrid(medium, 4)}>
                    {STATS.map((stat) => {
                        return (
                            <div style={styles.infoGridItem}>
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
                    <div style={styles.infoGridItem}>
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
            <div style={styles.infoGrid(medium, huge ? 6 : 4)}>
                {SKILLS.map((skill) => {
                    return (
                        <div style={styles.infoGridItem}>
                            <div style={textStyles.textSmall}>
                                {skill}
                            </div>
                            <Form.Select 
                                className="text-center"
                                aria-label="select"
                                value={skillBonus[skill]}
                                name={skill}
                                onChange={handleSkillBonusChange}
                            >
                                <option value="0">0</option>
                                <option value="2x">2x</option>
                                <option value=".5">.5</option>
                            </Form.Select>
                        </div>
                    )
                })}
            </div>
            <Divider type="ornamental3" size='small' alignment='center' />
            <div style={textStyles.subTitle}>
                {strings.abilityCheck.instruction4_1}
            </div>
            <div style={textStyles.textSmall}>
                {strings.abilityCheck.instruction4_2}
            </div>
            <div style={styles.chartContainer}>
                <div style={styles.itemSelector}>
                    <div style={textStyles.textSmall}>
                        {strings.abilityCheck.basicAbilityCheck}
                    </div>
                    <Form.Select 
                        className="text-center"
                        aria-label="select"
                        value={selectedStat}
                        onChange={handleSetSelectedStat}
                        placeholder='Select Stat'
                    >
                        {
                            STATS.map((stat) => {
                                return (
                                    <option value={stat}>{stat}</option>
                                )
                            })
                        }
                    </Form.Select>
                </div>
                
            </div>

            <div style={styles.chartContainer}>
                <div style={styles.itemSelector}>
                    <div style={textStyles.textSmall}>
                        {strings.abilityCheck.skillCheck}
                    </div>
                    <Form.Select 
                        className="text-center"
                        aria-label="select"
                        value={selectedSkill}
                        onChange={handleSetSelectedSkill}
                        placeholder='Select Skill'
                    >
                        {
                            SKILLS.map((skill) => {
                                return (
                                    <option value={skill}>{skill}</option>
                                )
                            })
                        }
                    </Form.Select>
                </div>
                
            </div>
        </div>
    );
};