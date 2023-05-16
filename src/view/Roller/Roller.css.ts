import { palette } from "../../staticAsset/palette";
import CSS from 'csstype';

export const rollerContainer: CSS.Properties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    minHeight: "90vh",
    backgroundColor: palette.purple_deep,
    padding: "2vh 5vw 0 5vw",
};

export const rollItemContainer: CSS.Properties = {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1rem",
    marginBottom: "1rem",
};

export const toggle: CSS.Properties = {
    margin: "2rem 0 0 0",
    fontFamily: "monospace",
    fontSize: "1.2rem",
    fontWeight: "bold",
    height: "3rem",
    width: "10rem",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
};

export const clickable: CSS.Properties = {
    cursor: "pointer",
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

export const diceInput: CSS.Properties = {
    width: "80%",
};

export const rollButton: CSS.Properties = {
    width: "10rem",
    height: "3rem",
};

export const diceImage: CSS.Properties = {
    width: "5vw",
    height: "5vw",
};

export const responsiveGrid = (windowWidth: number): CSS.Properties => ({
    display: "grid",
    gridTemplateColumns: `repeat(${windowWidth > 768 ? 6 : 3}, 1fr)`,
    gridTemplateRows: "repeat(4, fit-content(20px))",
    gridGap: "0.2",
    width: "100%",
    margin: "1rem 0 2rem 0",
    justifyContent: "center",
    alignItems: "center",
});

export const diceItemContainer: CSS.Properties = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
};

export const alertBox: CSS.Properties = {
    margin: "1rem 0 1rem 0",
};



