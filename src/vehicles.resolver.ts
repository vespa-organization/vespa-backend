import { Args, Int, Query, Resolver, Subscription } from '@nestjs/graphql'
import { Vehicle } from './models/vehicle.model'
import { pubSub, VehiclesService } from './vehicles.service.'
import { AsyncIterator } from '@nestjs/apollo/dist/utils/async-iterator.util'
import { Coordinate } from './models/coordinate.model'
import { map } from 'rxjs/operators'

@Resolver((of) => Vehicle)
export class VehiclesResolver {
  constructor(private vehiclesService: VehiclesService) {}

  @Query(() => Vehicle)
  async vehicle(@Args('id', { type: () => Int }) id: number) {
    return this.vehiclesService.findOneById(id)
  }

  @Subscription(() => Coordinate)
  coordinate() {
    return pubSub.asyncIterator('coordinate')
  }
}
