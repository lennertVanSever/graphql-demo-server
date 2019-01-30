import { Client } from 'pg';
const connectionString = 'postgres://xxjomhyfemmgop:9bf228b89cd841d687aeb2cc129de3c0988c107d2db9cadd896c7de120cdd212@ec2-54-228-229-10.eu-west-1.compute.amazonaws.com:5432/d6m56uut3t4jhq?ssl=true';

const connection = new Client({
    connectionString,
})
connection.connect();

module.exports = {
    connection
}