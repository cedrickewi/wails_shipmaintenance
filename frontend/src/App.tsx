import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { Dashboard } from './Pages/Dashboard';
import { Ship } from './Pages/Ships';
import { Mechanics } from './Pages/Mechanics';
import { Issues } from './Pages/Issues';
import Magazine from './Pages/Magazine';
import WorkOrder from './Pages/WorkOrder';
import PrintDeclarationPan from './Pages/PrintPages/PrintDeclarationPan';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="ships" element={<Ship />} />
          <Route path="mechanics" element={<Mechanics />} />
          <Route path="issues" element={<Issues />} />
          <Route path="issues/:id" element={<PrintDeclarationPan />} />
          <Route path='magazine' element={<Magazine />} />
          <Route path='workorders' element={<WorkOrder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

