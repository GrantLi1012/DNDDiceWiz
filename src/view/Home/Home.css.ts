import { palette } from "../../staticAsset/palette";
import CSS from 'csstype';

export const mainPageContainer: CSS.Properties = {
    display: "flex",
    flex: "auto",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 5vw 0 5vw",
    backgroundColor: palette.purple_deep,
};

export const diceImage: CSS.Properties = {
    width: "100%",
    alignSelf: "center",
    objectFit: "contain",
};

export const title: CSS.Properties = {
    fontFamily: "fantasy",
    fontSize: "8vh",
    paddingBottom: "2vh",
};

export const text: CSS.Properties = {
    fontFamily: "monospace",
    fontSize: "3vh",
    fontWeight: "400",
};

export const startButton: CSS.Properties = {
    marginTop: "1vh",
    marginBottom: "1vh",
};