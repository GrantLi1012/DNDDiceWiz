import CSS from 'csstype';
import { palette } from "../../staticAsset/palette";

export const collapsibleContainer = (isCollapsed: boolean): CSS.Properties => ({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    height: isCollapsed ? "fit-content" : "auto",
    backgroundColor: palette.purple_deep,
    marginBottom: "2.5rem",
});

export const titleBar: CSS.Properties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "fit-content",
    marginBottom: "0.1rem",
    cursor: "pointer",
};

export const title = {
    fontFamily: "fantasy",
    fontSize: "1.5rem",
};

export const d4Image = (isCollapsed: boolean): CSS.Properties => ({
    alignSelf: "center",
    height: "4vh",
    transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 0.5s ease-in-out",
});

export const dividerLine: CSS.Properties = {
    width: "100%",
    height: "0.2rem",
    backgroundColor: palette.purple_dark,
    marginBottom: "0.5rem",
};

