import { palette } from './asset/palette';
import CSS from 'csstype';

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

export const navbar: CSS.Properties = {
	height:"10vh",
	backgroundImage: "linear-gradient(#212529 80%, #434343)",
	color: palette.white,
};