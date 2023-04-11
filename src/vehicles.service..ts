import { Injectable } from '@nestjs/common'
import { Vehicle } from './models/vehicle.model'
import { Coordinate } from './models/coordinate.model'
import { interval, Observable } from 'rxjs'
import { PubSub } from 'graphql-subscriptions'
import { map } from 'rxjs/operators'

export const pubSub = new PubSub()

@Injectable()
export class VehiclesService {
  constructor() {
    interval(1000)
      .pipe(
        map(() => this.generateRandomCoordinate()),
        map((coordinate) => {
          pubSub.publish('coordinate', { coordinate })
        }),
      )
      .subscribe()
  }

  findOneById(id: number): Vehicle {
    const vehicle = new Vehicle()
    vehicle.id = id
    vehicle.model = 'Nevera'
    vehicle.manufacturer = 'Rimac'
    return vehicle
  }

  private generateRandomCoordinate(): Coordinate {
    const latitude = Math.random() * (90 - -90) + -90
    const longitude = Math.random() * (180 - -180) + -180
    const coordinate = new Coordinate()
    coordinate.latitude = latitude
    coordinate.longitude = longitude
    return coordinate
  }
}
