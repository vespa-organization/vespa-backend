import { Args, Int, Mutation, Resolver } from '@nestjs/graphql'

@Resolver()
export class AuthResolver {
  @Mutation(() => Boolean)
  async login(
    @Args({ name: 'shouldLogin', type: () => Boolean }) shouldLogin: boolean,
  ) {
    return shouldLogin
  }
}
