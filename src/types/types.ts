export type SchoolSearchFormValues = {
  target: string
  radius: number
  kind: string
}

export type School = {
  name: string
  students: number
  distance: number
  address: string
  lat: number
  lng: number
  base: string
  base_lat: number
  base_lng: number
  radius: number
  kind_of_school: string
}

export type SchoolTableProps = {
  schools: School[]
}
