import CSS from 'csstype';
import { palette } from "../../staticAsset/palette";

export const aboutContainer: CSS.Properties = {
    display: "flex",
    flex: "auto",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: "3vh 5vw 0 5vw",
    backgroundColor: palette.purple_deep,
};

export const aboutContent: CSS.Properties = {
    fontSize: "2.5vh",
    fontFamily: "monospace",
};