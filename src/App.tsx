// style
import { ThemeProvider } from "styled-components";
import theme from "@styles/theme";
import GlobalStyle from "@styles/global";

//hook
import useVh from "@hooks/useCalcVh";

// router
import { RouterProvider } from "react-router-dom";
import router from "@routes/router";

// 추가: 파이어베이스 인증 프로바이더
import { AuthProvider } from "@providers/AuthProvider";

function App() {
  useVh();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
