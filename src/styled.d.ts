import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      font: {
        white: string;
        black: string;
        textCharcoal: string;
        textRed: string;
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
      };
    };
    fonts: {
      logo50: any;
      subtitle30: any;
      big20: any;
      nomal18: any;
      detail14: any;
      small12: any;
    };
  }
}