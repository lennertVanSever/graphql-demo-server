import { connection } from './connection';
import DataLoader from 'dataloader';
import _ from 'lodash';


const authorLoader = new DataLoader(authorKeys => {
    return new Promise((resolve, reject) => {
        const query = {
            text: "SELECT * FROM graphql_demo.author WHERE id = ANY($1::int[])",
            values: [authorKeys]
        }
        connection.query(query, (error, {rows}) => {
            if(error) reject(error);
            else {
                resolve(mappingData(authorKeys, "id", rows));
            }
        });
    });
});

const postLoader = new DataLoader(postKeys => {
    return new Promise((resolve, reject) => {
        const query = {
            text: "SELECT * FROM graphql_demo.post where id = ANY($1::int[])",
            values: [postKeys]
        }
        connection.query(query, (error, {rows}) => {
            if(error) reject(error)
            else {
                resolve(mappingData(postKeys, "id", rows));
            }
        });
    });
});

const postLoaderByAuthor = new DataLoader(authorKeys => {
    return new Promise((resolve, reject) => {
        const query = {
            text: "SELECT * FROM graphql_demo.post where author_id = ANY($1::int[])",
            values: [authorKeys]
        }
        connection.query(query, (error, {rows}) => {
            if(error) reject(error)
            else {
                resolve(mappingData(authorKeys, "author_id", rows));
            }
        });
    });
});

const commentLoader = new DataLoader(postKeys => {
    return new Promise((resolve, reject) => {
        const query = {
            text: "SELECT * FROM graphql_demo.comment where post_id = ANY($1::int[])",
            values: [postKeys]
        }
        connection.query(query, (error, {rows}) => {
            if(error) reject(error);
            else {
                resolve(mappingData(postKeys, "post_id", rows));
            }
        });
    });
});

function mappingData(keys, idName, data){
    const groupedByID = _.groupBy(data, idName);
    const mappedKeyWithData = keys.map(key => {
        if(groupedByID[key]) return groupedByID[key];
        return [];
    });
    return mappedKeyWithData;
}

module.exports = {
    authorLoader,
    postLoader,
    commentLoader,
    postLoaderByAuthor
}