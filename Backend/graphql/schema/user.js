export const userTypeDefs = `
type User {
    id: ID!,
    username: String!,
    email: String!
    role: String!
}

type Query {
    users: [User!]!
    me: User
}

input updateInput {
    username: String
    password: String
    email: String
}

type Mutation {
    registerUser(
        username: String!,
        password: String!,
        email: String!
    ) : User!

    loginUser(
        username: String!,
        password: String!
    ) : User!
    
    logoutUser : String!

    updateUser(id: ID!, input: updateInput!): User!

    deleteUser(id: ID!) : String!
}
`