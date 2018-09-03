import gql from 'graphql-tag';
// Get todo
export const getTodos = gql`
   query getTodos($userId: String!){
        todos(userId: $userId){
            _id,
            text,
            seen
        }
    }
`;

// Get user info
export const getUser = gql`
   query getUser($_id: String!){
        user(_id: $_id){
            _id,
            email,
            nickname,
            count,
            todos {
                _id
                text
                seen
            }
        }
    }
`;

// Check Email Duplication
export const checkEmail = gql`
    mutation checkEmail($email: String!) {
        emailCheck(email: $email)
    }
`;

// Login
export const doLogin = gql`
    mutation doLogin($email: String!, $password: String!){
        login(email: $email, password: $password)
    }
`;

// Sign up
export const doSignUp = gql`
    mutation doSignUp($email: String!, $password: PasswordInput!, $nickname: String!){
        signup(email: $email, password: $password, nickname: $nickname)
    }
`;

// Delete user
export const deleteUser = gql`
    mutation deleteUser($_id: String!, $password: String!){
        deleteUser(_id: $_id, password: $password)
    }
`;

// Change nickname
export const changeNickname = gql`
    mutation changeNickname($_id: String!, $nickname: String!){
        changeNickname(_id: $_id, nickname: $nickname)
    }
`;

// Change password
export const changePassword = gql`
    mutation changePassword($_id: String!, $password: String!, $newpassword: PasswordInput!){
        changePassword(_id: $_id, password: $password, newpassword: $newpassword)
    }
`;

// Create new todo
export const createTodo = gql`
    mutation createTodo($text: String!, $userId: String!){
        createTodo(text: $text, userId: $userId)
    }
`;

// Change seen
export const updateTodo = gql`
    mutation updateTodo($_id: String!, $userId: String!, $seen: Boolean!){
        updateTodo(_id: $_id, userId: $userId, seen: $seen)
    }
`;

// Delete todo
export const deleteTodo = gql`
    mutation deleteTodo($_id: String!, $userId: String!){
        deleteTodo(_id: $_id, userId: $userId)
    }
`;