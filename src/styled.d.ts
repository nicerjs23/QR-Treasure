import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      font: {
        white: string;
        black: string;
        charcoal: string;
        red: string;
        coralRed: string;
      };
      background: {
        white: string;
        black: string;
        darkPurple: string;
        lightPurple: string;
      };
      page: {
        white: string;
        black: string;
        warmBeige: string;
        cardBeige: string;
        green: string;
        gold: string;
        coralRed: string;
        brown: string;
        charcoal: string;
      };
    };
    fonts: {
      logo50: any;
      subtitle30: any;
      subtitle32: any;
      big20: any;
      nomal18: any;
      nomal16: any;
      detail14: any;
      small12: any;
      small10: any;
    };
  }
}
