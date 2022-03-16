
//regex
// export const DIGIT_ONLY_REGEX = /^\D+/g;
export const DIGIT_ONLY_REGEX = /^[0-9]*$/;
export const NAME_REGEX = /^[a-zA-Z ]*$/;
export const ALPHA_NUMERIC_REGEX = /^[a-zA-Z0-9 ]*$/;
export const EMAIL_REGEX = /^\S+@\S+\.\S+$/;//Has at least one character before the @, before the period and after it:
export const URL_REGEX = /^https*$/;

const {height,width}:any = window.screen;

export const size={
height,width,
padding: 10,
buttonHeight: 40,
inputHeight: 40,
normalFont:12,
fontFamily:"Inter,sans serif",
HeadingFont:16,

}

//SERVER URLS




