import { Client } from 'pg';
const connectionString = 'postgres://nvorbdxihadmjv:33c507418123941e45e4dc86d5b4a1424df2e4baf9a63cf111c1bd65652d7e79@ec2-46-51-184-229.eu-west-1.compute.amazonaws.com:5432/decefighq3ibu7?ssl=true';

const connection = new Client({
    connectionString,
})
connection.connect();

module.exports = {
    connection
}