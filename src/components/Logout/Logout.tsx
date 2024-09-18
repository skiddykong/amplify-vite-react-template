import { signOut } from 'aws-amplify/auth'
import { useNavigate } from 'react-router-dom'

export default function Logout() {
  const navigate = useNavigate()

  return (
    <button
      onClick={async () => {
    await signOut()
    navigate('/')
  }}
      className="p-4 justify-center align-middle accent-lime-50 bg-amber-200 rounded hover:bg-amber-600"
    >
    Sign Out
  </button>
)
}
