import { connection } from './connection';
import loaders from './loaders';
import { PubSub } from 'apollo-server';

const pubsub = new PubSub();
const MESSAGE_ADDED = 'MESSAGE_ADDED';

export default {
    Subscription: {
        messageAdded: {
          subscribe: () => {
              return pubsub.asyncIterator([MESSAGE_ADDED]);
          },
        },
    },
    Mutation: {
        addComment(root, { Comment }){
            const { description, author_id, post_id } = Comment;
            return new Promise((resolve, reject) => {
                const query = {
                    text: `INSERT INTO graphql_demo."comment"
                    (description, author_id, post_id)
                    VALUES($1, $2, $3);`,
                    values: [description, author_id, post_id]
                }
                connection.query(query, (error, {rows}) => {
                    loaders.commentLoader.clear(post_id);
                    resolve({ description, author_id, post_id });
                });
            })
        },
        addPost(root, { Post }){
            const { description, author_id, title } = Post;
            return new Promise((resolve, reject) => {
                const query = {
                    text: `INSERT INTO graphql_demo."post"
                    (description, author_id, title)
                    VALUES($1, $2, $3)
                    RETURNING id;`,
                    values: [description, author_id, title]
                }
                connection.query(query, (error, { rows }) => {
                    const { id } = rows[0];
                    resolve({ 
                        id,
                        description,
                        author_id, 
                        title 
                    });
                });
            })
        },
        addMessage(root, { Message }){
            const { text, author_id, conversation_id } = Message;
            return new Promise((resolve, reject) => {
                const query = {
                    text: `INSERT INTO graphql_demo."message"
                    (text, author_id, conversation_id)
                    VALUES($1, $2, $3)
                    RETURNING id;`,
                    values: [text, author_id, conversation_id]
                }
                connection.query(query, (error, { rows }) => {
                    if(error) reject(error);
                    const { id } = rows[0];
                    Message['id'] = id;
                    pubsub.publish(MESSAGE_ADDED, { messageAdded: Message });
                    resolve(Message);
                });
            })
        }
    }
}
