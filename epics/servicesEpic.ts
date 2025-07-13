import { ajax } from 'rxjs/ajax'
import { ofType } from 'redux-observable'
import { combineEpics } from 'redux-observable'
import { catchError, map, mergeMap, of } from 'rxjs'
import { fetchServices, fetchServicesFailure, fetchServicesSuccess, fetchServiceDetails, fetchServiceDetailsFailure, fetchServiceDetailsSuccess,} from '../store/servicesSlice'

export const servicesEpic = (action$) =>
  action$.pipe(
    ofType(fetchServices.type),
    mergeMap(() =>
      ajax.getJSON('http://localhost:7071/api/services').pipe(
        map((response) => fetchServicesSuccess(response)),
        catchError((e) => of(fetchServicesFailure(e.message)))
      )
    )
  )

export const serviceDetailsEpic = (action$) =>
  action$.pipe(
    ofType(fetchServiceDetails.type),
    mergeMap((action) =>
      ajax
        .getJSON(`http://localhost:7071/api/services/${action.payload}`)
        .pipe(
          map((response) => fetchServiceDetailsSuccess(response)),
          catchError((e) => of(fetchServiceDetailsFailure(e.message)))
        )
    )
  )

export const rootEpic = combineEpics(
  servicesEpic,
  serviceDetailsEpic
)

