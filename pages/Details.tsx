import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks'
import { fetchServiceDetails } from '../store/servicesSlice'
import Loader from '../components/Loader'

export default function Details() {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { selected, loading, error } = useAppSelector((s) => s.services)

  useEffect(() => {
    dispatch(fetchServiceDetails(Number(id)))
  }, [id])

  if (loading) return <Loader />
  if (error) return <div>Error: {error} <button onClick={() => dispatch(fetchServiceDetails(Number(id)))}>Повторить</button></div>
  if (!selected) return null

  return (
    <div>
      <h2>{selected.name}</h2>
      <p>Цена: {selected.price}</p>
      <p>{selected.content}</p>
    </div>
  )
}
