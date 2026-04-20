
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user } = useAuth()
  return (
    <div>
        <p className="text-3xl md:text-4xl text-center">Dashboard</p>
        <p className="text-center">Name: {user}</p>
    </div>
  )
}
