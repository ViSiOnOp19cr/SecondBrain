import {Button} from './components/ui/button'
import './App.css'
import { Plusicon } from './assets/Plusicon'
function App() {
  return (
    <div>
    <Button startIcon={<Plusicon/>} size="sm" varient="secondary" text = 'Share'/>
    <Button size="md" varient="primary" text = 'Add Content'/>
    <Button size="lg" varient="primary" text = 'Add content'/>
    </div>
  )
}

export default App
