import CSS from 'csstype';
import { palette } from './staticAsset/palette';

export const largeText: CSS.Properties = {
    fontSize: "1.5rem",
	fontWeight: "bold",
};

export const mediumText: CSS.Properties = {
	fontSize: "1.2rem"
};

export const paddingLeft: CSS.Properties = {
	paddingLeft: "1rem"
};

export const flexGrow: CSS.Properties = {
	display: "flex",
	alignItems: "stretch",
	flexDirection: "column",
	minHeight: "100vh",
};

export const dropdownItem: CSS.Properties = {
	height: "fit-content",
	width: "100%",
	textDecoration: "none",
	color: palette.dark,
};