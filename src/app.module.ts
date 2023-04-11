import { Module } from '@nestjs/common'
import { VehiclesService } from './vehicles.service.'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { VehiclesResolver } from './vehicles.resolver'
import { AuthResolver } from './auth.resolver'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
    }),
  ],
  providers: [VehiclesService, VehiclesResolver, AuthResolver],
})
export class AppModule {}
