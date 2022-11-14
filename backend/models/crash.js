//Format to take response.data and format it in the frontend
const oracle = require('oracledb')

/*********************************************************************
 * 
 *                  Note used yet
 * 
 * 
 ********************************************************************/

const personSchema = new oracle.Schema({
    crash_ID: {
        type: Number,
        required: true,
    },
    unit_number: {
        type: Number,
        required: true,
    },
    person_number: {
        type: Number,
        required: true,
    },
    citation: {
        type: char,
        required: true,
    },
    died: {
        type: Number,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    ethnicity: {
        type: Number,
        required: true,
    },
    gender: {
        type: number,
        required: true,
    },
    not_injured: {
        type: char,
        required: true,
    },
})
