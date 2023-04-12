import { Injectable } from '@nestjs/common'
import { Vehicle } from './models/vehicle.model'
import { Coordinate } from './models/coordinate.model'
import { interval, Observable } from 'rxjs'
import { PubSub } from 'graphql-subscriptions'
import { map } from 'rxjs/operators'

export const pubSub = new PubSub()

@Injectable()
export class VehiclesService {
  private latitudeBase = 45.5
  private longitudeBase = 15.5
  private factor = 0.5
  private pingIntervalInMilliseconds = 2_000

  constructor() {
    interval(this.pingIntervalInMilliseconds)
      .pipe(map(() => this.generateRandomCoordinate()))
      .subscribe((coordinate) => {
        pubSub.publish('coordinate', { coordinate })
      })
  }

  findOneById(id: number): Vehicle {
    const vehicle = new Vehicle()
    vehicle.id = id
    vehicle.model = 'Nevera'
    vehicle.manufacturer = 'Rimac'
    return vehicle
  }

  private generateRandomCoordinate(): Coordinate {
    const latitude = Math.random() * this.factor + this.latitudeBase
    const longitude = Math.random() * this.factor + this.longitudeBase
    const coordinate = new Coordinate()
    coordinate.latitude = latitude
    coordinate.longitude = longitude
    return coordinate
  }
}
