import useLocalStorage from "../../hooks/useLocalStorage"

function Logout() {
    const [, setCurrentUser] = useLocalStorage('currentUser', null);
  return (
    <div>
        <button onClick={() => setCurrentUser(null)}>Logout</button>
    </div>
  )
}

export default Logout