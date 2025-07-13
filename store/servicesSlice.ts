import { createSlice } from '@reduxjs/toolkit'

export interface Service {
  id: number
  name: string
  price: number
  content?: string
}

interface State {
  services: Service[]
  loading: boolean
  error: string | null
  selected: Service | null
}

const initialState: State = {
  services: [],
  loading: false,
  error: null,
  selected: null,
}

const slice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    fetchServices: (state) => {
      state.loading = true
      state.error = null
    },
    fetchServicesSuccess: (state, action) => {
      state.loading = false
      state.services = action.payload
    },
    fetchServicesFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    fetchServiceDetails: (state, action) => {
      state.loading = true
      state.error = null
    },
    fetchServiceDetailsSuccess: (state, action) => {
      state.loading = false
      state.selected = action.payload
    },
    fetchServiceDetailsFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  fetchServices,
  fetchServicesSuccess,
  fetchServicesFailure,
  fetchServiceDetails,
  fetchServiceDetailsSuccess,
  fetchServiceDetailsFailure,
} = slice.actions

export const servicesReducer = slice.reducer