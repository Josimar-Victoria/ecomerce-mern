import Header from './components/header/Header'
import { DataProvider } from './GlobalState'
import Pages from './pages/Pages'

function App () {
  return (
    <DataProvider>
      <div className='App'>
        <Header />
        <Pages />
      </div>
    </DataProvider>
  )
}

export default App
