import { useContext, useEffect } from "react"
import { Can } from "../compnents/can"
import { AuthContext } from "../contexts/AuthContexts"
import { setupAPIClient } from "../services/api"
import { api } from "../services/apiClient"
import { withSSRAuth } from "../utils/withSSRAuth"

export default function Dashboard() {
  const { user, signOut } = useContext(AuthContext)

  useEffect(() => {
    api.get('me')
      .then(res => console.warn(res))
      .catch(err => console.warn(err))
  }, [])

  return (
    <>
      <h1>Dashboard - {user?.email}</h1>

      <button onClick={signOut}>Sair</button>

      <Can permissions={['metrics.list']} roles={['administrator', 'editor']}>
        <div>Métricas</div>
      </Can>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)
  await apiClient.get('/me')
  
  return {
    props: {}
  }
})