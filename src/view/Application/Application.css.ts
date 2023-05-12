import { palette } from "../../staticAsset/palette";
import CSS from 'csstype';

export const applicationContainer: CSS.Properties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    minHeight: "90vh",
    backgroundColor: palette.purple_deep,
    padding: "2vh 5vw 0 5vw",
    border: "1px solid black",
};

export const instruction: CSS.Properties = {
    fontFamily: "monospace",
    fontSize: "1.7em",
    padding: "0.5rem 0 0.5rem 0",
    fontWeight: "bold",
};

export const textLage: CSS.Properties = {
    fontFamily: "monospace",
    fontSize: "5rem",
    fontWeight: "bold",
};

export const textMedium: CSS.Properties = {
    fontFamily: "monospace",
    fontSize: "1.5rem",
};

export const textSmall: CSS.Properties = {
    fontFamily: "monospace",
    fontSize: "1.2rem",
};

export const diceGrid: CSS.Properties = {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gridTemplateRows: "repeat(4, fit-content(20px))",
    gridGap: "0.2",
    width: "100%",
    margin: "1rem 0 2rem 0",
};

export const diceGridItem: CSS.Properties = {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
};

export const diceImage: CSS.Properties = {
    width: "5vw",
    height: "5vw",
};

export const diceInput: CSS.Properties = {
    width: "80%",
};

export const modifierInput: CSS.Properties = {
    width: "40%",
};

export const modifierInputContainer: CSS.Properties = {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1rem",
};