import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Vehicle {
  @Field((type) => Int)
  id: number

  @Field((type) => String)
  manufacturer: string

  @Field((type) => String)
  model: string
}
