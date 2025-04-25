
const fontGenerator = (
  fontFamily = "OmyuPretty",
  fontSize = "1rem",
  fontWeight = "normal",
  lineHeight = "normal",
  letterSpacing = "normal"
) => ({
  "font-family": fontFamily,
  "font-weight": fontWeight,
  "font-size": fontSize,
  "line-height": lineHeight,
  "letter-spacing": letterSpacing,
});

const colorScale = {

  warmBeige:"#F0EAD6",
cardBeige:"#F9E9C8",
green:"#84C69B",
gold:"#F4BC61",
coralRed:"#FF6B6B",
textRed:"#D32A00",
textCharcoal:"#4A4A4A",
purple:"#252130",
lightPurple:"#E2DAF9",
  white: "#ffffff",
  black: "#000000",
  brown:"#402B2D",

};
const theme = {
  colors: {
    font: {
      white: colorScale.white,
      black: colorScale.black,
      charcoal:colorScale.textCharcoal,
      red:colorScale.textRed,
      coralRed:colorScale.coralRed,
    },

    background: {
        white: colorScale.white,
        black: colorScale.black,
        darkPurple:colorScale.purple,
        lightPurple:colorScale.lightPurple,
      },
    
    page: {
    white: colorScale.white,
    black: colorScale.black,
    warmBeige:colorScale.warmBeige,
    cardBeige:colorScale.cardBeige,
    green:colorScale.green,
    gold:colorScale.gold,
    coralRed:colorScale.coralRed,
    brown:colorScale.brown,
    charcoal:colorScale.textCharcoal,
    
  },
   
    },
  

  fonts: {
    logo50: fontGenerator("OmyuPretty", "3.125rem", "400", "normal", "-0.03125rem"),
    subtitle30: fontGenerator("OmyuPretty", "1.875rem", "400", "1.875rem", "-0.03125rem"),
    big20: fontGenerator("OmyuPretty", "1.25rem", "400", "normal", "-0.03125rem"),
    nomal18: fontGenerator("OmyuPretty", "1.125rem", "400", "1.125rem", "-0.03125rem"),
    nomal16: fontGenerator("OmyuPretty", "1rem", "400", "normal", "-0.03125rem"),
    detail14: fontGenerator("OmyuPretty", "0.875rem", "400", "normal", "-0.03125rem"),
    small12: fontGenerator("OmyuPretty", "0.75rem", "400", "normal", "-0.03125rem"),
    small10: fontGenerator("OmyuPretty", "1.0625rem", "400", "normal", "-0.03125rem"),
  },
};

export default theme;
