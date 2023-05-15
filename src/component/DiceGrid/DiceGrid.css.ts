import CSS from 'csstype';

export const responsiveGrid = (expanded: boolean): CSS.Properties => ({
    display: "grid",
    gridTemplateColumns: `repeat(${expanded ? 6 : 3}, 1fr)`,
    gridTemplateRows: "repeat(3, fit-content(20px))",
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

export const diceImage: CSS.Properties = {
    width: "5vw",
    height: "5vw",
};

export const diceInput: CSS.Properties = {
    width: "80%",
};