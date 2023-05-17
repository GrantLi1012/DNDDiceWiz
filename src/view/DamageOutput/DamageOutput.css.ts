import CSS from 'csstype';

export const alertBox: CSS.Properties = {
    margin: "1rem 0 1rem 0",
};

export const attackInfo = (expanded: boolean): CSS.Properties => ({
    display: "grid",
    gridTemplateColumns: expanded ? "1fr 1fr 1fr" : "1fr",
});

export const attackInfoItem: CSS.Properties = {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
};

export const resultList: CSS.Properties = {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    marginTop: "1rem",
    fontWeight: "bold",
};