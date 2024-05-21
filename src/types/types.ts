export type SchoolSearchFormValues = {
  target: string
  radius: number
  kind: string
}

export type School = {
  name: string
  students: number | string
  distance: number
  address: string
  lat: number
  lng: number
  base: string
  base_lat: number
  base_lng: number
  radius: number
  kind_of_school: string
  url: string
}

export type SchoolTableProps = {
  inputValues: SchoolSearchFormValues
  schools: School[]
}

export type DownloadFileProps = {
  inputValues: SchoolSearchFormValues
  schools: School[]
}

export type MappingProps = {
  schools: School[]
}
