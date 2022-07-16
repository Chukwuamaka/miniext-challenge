import { getRequest } from "./default.service";

export const getStudentDetails = (student: string) => {
    return getRequest(`https://api.airtable.com/v0/app8ZbcPx7dkpOnP0/tblIzakozsIHPiZnI?filterByFormula=%7BName%7D+%3D+'${student}'`)
}