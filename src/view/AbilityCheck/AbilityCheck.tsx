import React, {useState, useEffect} from 'react';
import * as styles from './AbilityCheck.css';
import * as textStyles from '../../staticAsset/textStyle.css';
import * as pageStyle from '../../staticAsset/pageStyle.css';

import { d20Distribution } from '../../staticAsset/d20Distribution';
import { strings } from '../../staticAsset/strings';
import { useMediaQuery } from '../../customHooks/useMediaQuery';
import { Divider } from '../../component/Divider/Divider';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// chartjs
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

type Stats = "STR" | "DEX" | "CON" | "INT" | "WIS" | "CHA";
type Skills = "Acrobatics" | "Animal Handling" | "Arcana" | "Athletics" | "Deception" | "History" | "Insight" | "Intimidation" | "Investigation" | "Medicine" | "Nature" | "Perception" | "Performance" | "Persuasion" | "Religion" | "Sleight of Hand" | "Stealth" | "Survival";
type SkillBonus = "0" | "2x" | ".5";
type AbilityCheckType = Stats | Skills;
type shiftType = "left" | "right";

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

const d20Labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];

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
    const [showGraph, setShowGraph] = useState<boolean>(false);

    // for chartjs
    const [selectedItem, setSelectedItem] = useState<AbilityCheckType>("CON");
    const [graphConfig, setGraphConfig] = useState<any>({});
    const [graphData, setGraphData] = useState<any>({
        labels: d20Labels,
        datasets: [
            {
                label: strings.abilityCheck.normalRoll,
                data: [],
                backgroundColor: 'rgb(54, 162, 235)',
                
            },
            {
                label: strings.abilityCheck.advantage,
                data: [],
                backgroundColor: 'rgb(75, 192, 192)',
            },
            {
                label: strings.abilityCheck.disadvantage,
                data: [],
                backgroundColor: 'rgb(255, 99, 132)',
            }
        ]
    });

    const handleStatsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        const num = parseInt(value)
        if (num < 0 || num > 20) {
            alert("Stats must be between 0 and 20");
            return;
        }
        setStats({
            ...stats,
            [name]: num
        });
    };

    const handleProficiencyBonusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        const num = parseInt(value)
        if (num < 2 || num > 6 || isNaN(num)) {
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

    // for graph data
    const handleSetSelectedItem = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const {value} = event.target;
        setSelectedItem(value as AbilityCheckType);
    };

    const getModifier = (ability: AbilityCheckType, bonus: number): number => {
        if (ability in STATS) {
            const statKey = ability as Stats;
            return Math.floor((stats[statKey] - 10) / 2);
        }
        else {
            const skillKey = ability as Skills;
            var modifier = Math.floor((stats[SkillMapping[skillKey]] - 10) / 2);
            if (skillBonus[skillKey] === "2x") {
                modifier += bonus * 2;
            }
            else if (skillBonus[skillKey] === ".5") {
                modifier += Math.floor(bonus / 2);
            }
            return modifier;
        }
    };

    const getShiftedData = (shift: shiftType, amount: number, data: number[]): number[] => {
        var dataCopy = [...data];
        var result: number[] = [];
        if (shift === "left") {
            result = dataCopy.slice(amount);
            for (var i = 0; i < amount; i++) {
                result.push(0);
            }
        }
        else if (shift === "right") {
            var tmp = [];
            for (var j = 0; j < amount; j++) {
                tmp.push(data[0]);
            }
            result = tmp.concat(dataCopy.slice(0, dataCopy.length - amount + 1));
        }
        else {
            alert("Invalid shift type");
        }
        return result;
    };

    const getData = (ability: AbilityCheckType):any => {
        const modifier = getModifier(ability, proficiencyBonus);
        const shiftDirection = modifier >= 0 ? "right" : "left";
        const shiftAmount = Math.abs(modifier);
        var normalData = getShiftedData(shiftDirection, shiftAmount, d20Distribution["normal"]);
        var advantageData = getShiftedData(shiftDirection, shiftAmount, d20Distribution["advantage"]);
        var disadvantageData = getShiftedData(shiftDirection, shiftAmount, d20Distribution["disadvantage"]);
        return {
            labels: d20Labels,
            datasets: [
                {
                    label: strings.abilityCheck.normalRoll,
                    data: normalData,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgb(54, 162, 235)',
                    borderWidth: 1
                },
                {
                    label: strings.abilityCheck.disadvantage,
                    data: disadvantageData,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 1
                },
                {
                    label: strings.abilityCheck.advantage,
                    data: advantageData,
                    backgroundColor:'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgb(75, 192, 192)',
                    borderWidth: 1
                }
        ]
        };
    };

    const getGraphConfig = (ability: AbilityCheckType):any => {
        return {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom' as const,
                },
                title: {
                    display: true,
                    text: ability.toString() + ' Check Success Rate'
                }
            }
        };
    };

    const handleShowGraph = () => {
        setShowGraph(false);
        const config = getGraphConfig(selectedItem as AbilityCheckType);
        setGraphConfig(config);
        const data = getData(selectedItem as AbilityCheckType);
        setGraphData(data);
    };

    useEffect(() => {
        setShowGraph(true);
    }, [graphConfig, graphData]);

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
                    {STATS?.map((stat) => {
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
                {SKILLS?.map((skill) => {
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
                        {strings.abilityCheck.chooseCheck}
                    </div>
                    <Form.Select 
                        className="text-center"
                        aria-label="select"
                        value={selectedItem}
                        onChange={handleSetSelectedItem}
                        placeholder='Select Stat'
                    >
                        {
                            STATS?.map((stat) => {
                                return (
                                    <option value={stat}>{stat}</option>
                                )
                            })
                        }
                        {
                            SKILLS?.map((skill) => {
                                return (
                                    <option value={skill}>{skill}</option>
                                )
                            })
                        }
                    </Form.Select>
                </div>
                <Button variant="outline-dark" size="lg" onClick={handleShowGraph}>
                    {strings.abilityCheck.showGraphs}
                </Button>
                {showGraph === false ? "" : <Line options={graphConfig} data={graphData} style={styles.chartGraph} />}
            </div>
        </div>
    );
};