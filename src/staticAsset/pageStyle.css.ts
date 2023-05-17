import CSS from 'csstype';
import { palette } from './palette';

export const pageContainer: CSS.Properties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    minHeight: "93vh",
    backgroundColor: palette.purple_deep,
    padding: "2vh 5vw 0 5vw",
};