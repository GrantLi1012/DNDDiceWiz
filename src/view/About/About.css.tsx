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
    fontSize: "1.2rem",
    fontFamily: "monospace",
};

export const profileLink: CSS.Properties = {
    textDecoration: "underline",
    color: 'black'
};

export const supportButton: CSS.Properties = {
    width: "12rem",
    height: "auto",
    marginTop: "1rem",
};