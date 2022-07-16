import { getRequest } from "./default.service";
`RECORD_ID()%3D'recr0DOF3YWjN9wAH'%2CRECORD_ID()%3D'recwrHZ9zBIYFiU07'`

export const listStudentClassmates = (classmateIds: string) => {
    return getRequest(`https://api.airtable.com/v0/app8ZbcPx7dkpOnP0/tblIzakozsIHPiZnI?filterByFormula=OR(${classmateIds})`)
}