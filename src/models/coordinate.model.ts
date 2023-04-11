import { Field, Float, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Coordinate {
  @Field(() => Float)
  latitude: number

  @Field(() => Float)
  longitude: number
}
