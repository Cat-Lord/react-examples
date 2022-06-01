import type { FishingGround } from "../graphql/generated/graphql-gen"
export type Attendance = {
  fishingGround: FishingGround
  numberOfVisits: number
  catches: NewCatch[]
}
