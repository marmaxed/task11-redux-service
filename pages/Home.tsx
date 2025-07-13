import { useEffect, type JSXElementConstructor, type Key, type ReactElement, type ReactNode, type ReactPortal } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { fetchServices} from '../store/servicesSlice'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'

export default function Home() {
  const dispatch = useAppDispatch()
  const { services, loading, error } = useAppSelector((s) => s.services)

  useEffect(() => {
    dispatch(fetchServices())
  }, [dispatch])

  if (loading) return <Loader />
  if (error) return <div>Error: {error} <button onClick={() => dispatch(fetchServices())}>Повторить</button></div>

  return (
    <ul>
      {services.map((s: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined }) => (
        <li key={s.id}>
          <Link to={`/${s.id}/details`}>{s.name}</Link>
        </li>
      ))}
    </ul>
  )
}