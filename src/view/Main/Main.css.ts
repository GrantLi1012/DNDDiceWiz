import { palette } from "../../asset/palette";
import CSS from 'csstype';

export const mainPageContainer: CSS.Properties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
    backgroundColor: palette.purple_deep,
};

export const diceImage: CSS.Properties = {
    alignSelf: "center",
};

export const title: CSS.Properties = {
    fontFamily: "fantasy",
    fontSize: "5em",
    paddingBottom: "3vh",
};

export const text: CSS.Properties = {
    fontFamily: "monospace",
    fontSize: "1.5rem",
    fontWeight: "400",
};

export const startButton: CSS.Properties = {
    marginTop: "3vh",
};