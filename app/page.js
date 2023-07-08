import Navbar from '@/app/components/Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import Card from './components/Card';

export default function Home() {
  return (
    <main className=''>
      <Navbar />
      <div className=''>
        <Card />
      </div>
    </main>
  )
}
