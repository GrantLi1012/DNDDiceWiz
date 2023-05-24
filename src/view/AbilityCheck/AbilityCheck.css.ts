import CSS from 'csstype';

export const statsGrid = (expanded: boolean): CSS.Properties => ({
    display: "grid",
    gridTemplateColumns: expanded ? "1fr 1fr 1fr 1fr" : "1fr 1fr",
    columnGap: "1.5rem",
    rowGap: "1rem",
    marginTop: "1rem",
});

export const statsGridItem: CSS.Properties = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
};