export const userTypeDefs = `graphql
type User {
    userID: ID!,
    userName: String!,
    password: String!,
    email: String!
}

type Query {
    users: [Users!]!
}

type Mutation {
    registerUser(
        userName: String!,
        password: String!,
        email: String!
    ) : User!

    loginUser(
        userName: String!,
        password: String!
    ) : User!
    
    logoutUser(
        userID: ID!,
        userName: String!
    ) : User!
}
`