import CSS from 'csstype';
import { palette } from "../../staticAsset/palette";

export const aboutContainer: CSS.Properties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    minHeight: "90vh",
    backgroundColor: palette.purple_deep,
    padding: "5vh 20vw",
    border: "1px solid black",
};

export const aboutContent: CSS.Properties = {
    fontSize: "2.5vh",
    fontFamily: "monospace",
};