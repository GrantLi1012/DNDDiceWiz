import React, { useEffect } from 'react';
import * as styles from './DiceGrid.css';
import { strings } from '../../staticAsset/strings';
import { useMediaQuery } from '../../customHooks/useMediaQuery';

import d4 from '../../img/d4.png';
import d6 from '../../img/d6.png';
import d8 from '../../img/d8.png';
import d10 from '../../img/d10.png';
import d12 from '../../img/d12.png';
import d20 from '../../img/d20.png';

import Form from 'react-bootstrap/Form';

const diceListStr = [strings.dice.d4, strings.dice.d6, strings.dice.d8, strings.dice.d10, strings.dice.d12, strings.dice.d20];
const diceListImg = [d4, d6, d8, d10, d12, d20];

export const DiceGrid = ({
    diceCount,
    setDiceCount,
}: {
    diceCount: any,
    setDiceCount: any
}):JSX.Element => {
    const query:string = "(min-width: 768px)";
    const expanded = useMediaQuery(query);
    // console.log("grid");
    // console.log(diceCount);
    // console.log(setDiceCount);

    const handleDiceCountChange = (e: React.ChangeEvent<any>) => {
        console.log("handle dice count change");
        // console.log(e.target.name);
        const newDiceCountValues = diceCount;
        newDiceCountValues[e.target.name] = e.target.value ? parseInt(e.target.value) : 0;
        setDiceCount(newDiceCountValues);
    };

    const buildDiceItem = (diceName: string, diceIndex: number): JSX.Element => {
        return (
            <div style={styles.diceItemContainer}>
                <img src={diceListImg[diceIndex]} alt={diceName} style={styles.diceImage} />
                {diceName}
                <div style={styles.diceInput}>
                    <Form.Control 
                        className="text-center" 
                        type='number'
                        name={diceName}
                        placeholder="0" 
                        value={diceCount.diceName}
                        onChange={handleDiceCountChange}    
                    />
                </div>
            </div>
        )
    };

    return (
        <div style={styles.responsiveGrid(expanded)}>
            {diceListStr.map((diceName, index) => {
                return buildDiceItem(diceName, index);
            })}
        </div>
    );
};