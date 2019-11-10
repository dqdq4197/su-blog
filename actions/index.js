const {createStore} = require('redux');


const reducer = (prevState, action) => {
    switch (action.type) {
        case 'GET_USER_EMAIL' :
          return {
            ...prevState,  
            user: action.data,
        };
    }
};

const initialState = {
    user: {
        isAudenticated : false,
        email : null,
        password : null,
        nick : null,
    }
}
const store = createStore(reducer, initialState);

console.log('fififi: ',store.getState());

const user_info= (data) => {
    return {
        type: "GET_USER_EMAIL",
        data
    };
};
const log_out = () => {
    return {
        type: "LOG_OUT",
    }
}
    store.dispatch(user_info({
    email: "asd@asd.asd",
    password: "1234",
    isAudenticated: true,
    nick: "heesu",
}));

console.log('1nd', store.getState());
store.dispatch(log_out());

console.log('2nd', store.getState());

module.exports= store;