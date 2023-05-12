import { palette } from "../../staticAsset/palette";
import CSS from 'csstype';

export const rollerContainer: CSS.Properties = {
    display: "flex",
    flex: "auto",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
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
    fontSize: "1rem",
    fontWeight: "bold",
};





