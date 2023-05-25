import CSS from 'csstype';

export const infoGrid = (expanded: boolean, columnNum: number): CSS.Properties => ({
    display: "grid",
    gridTemplateColumns: expanded ? `repeat(${columnNum}, 1fr)` : "1fr 1fr",
    columnGap: "1.5rem",
    rowGap: "1rem",
    marginTop: "1rem",
});

export const infoGridItem: CSS.Properties = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
};

export const chartContainer: CSS.Properties = {
    display: "flex",
    flexDirection: "column",
    margin: "1rem 0 1rem 0",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
};

export const itemSelector: CSS.Properties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    margin: "1rem 0 1rem 0",
};

export const chartGraph: CSS.Properties = {
    marginTop: "1rem",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    height: "15rem",
};