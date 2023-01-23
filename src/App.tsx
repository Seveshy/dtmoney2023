import { ThemeProvider } from 'styled-components'
import { TransactionsProviderProps } from './contexts/TransactionContext'
import { Transactions } from './pages/Transaction'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <TransactionsProviderProps>
        <Transactions />
      </TransactionsProviderProps>
    </ThemeProvider>
  )
}
