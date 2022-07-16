import { getRequest } from "./default.service";

export const listStudentClasses = (classIdFormula: string) => {
    return getRequest(`https://api.airtable.com/v0/app8ZbcPx7dkpOnP0/tblgh8YARZPqeJF07?filterByFormula=OR(${classIdFormula})`)
}