import type { User } from "@/types/user.interface";

type operation = 'signIn' | 'signUp';
type stateOperation  = 'auth' | 'checking' | 'no-auth';
interface stateProps {
    signIn: signIn;
    signUp: signUp;
    user: User | null;
    isNicknameValid: boolean;
    isAuth: boolean;
    state: stateOperation;
    currentOperantion?: operation;
}

interface signIn {
    email:string;
    password: string;
}

interface signUp extends signIn{
    nickname:string;
}

interface setValue {
    operation: operation;
    type: 'email' | 'password' | 'nickname';
    value: string;
}

interface changeOperationInterface {
    operation: stateOperation,
    currentOperantion?: operation;
}
type actionProps = 
| { type: 'SIGN-IN', payload:User }
| { type: 'SIGN-UP', payload:User }
| { type: 'LOGOUT' }
| { type: 'SET_VALUE', payload: setValue}
| { type: 'VALIDATE-NICKNAME', payload: boolean}
| { type: 'CHANGE_STATE', payload: changeOperationInterface }

export const getInitialLoginValue = ():stateProps => {
    return {
        user: null,
        isAuth: false,
        isNicknameValid: false,
        state: 'no-auth',
        signIn: {
            email: '',
            password: '',
        },
        signUp: {
            nickname: '',
            email: '',
            password: ''
        },
        currentOperantion: undefined
    }
}

export const AuthReducer = (state: stateProps, action: actionProps):stateProps => {
    
    switch (action.type) {
        case 'SET_VALUE': {
            const type = action.payload.type;
            const typeOperation = action.payload.operation;
            const prevOperationState = state[typeOperation];
            const value = action.payload.value;
            
            const newState = {
                ...state,
                [typeOperation]: {
                    ...prevOperationState,
                    [type]: value
                }
            };
            return newState;
        }
        case 'SIGN-IN':
        case 'SIGN-UP':
        {
            return {
                ...state,
                user: action.payload,
                state: 'auth',
                isAuth: true,
                currentOperantion: undefined
            };
        }
        case 'LOGOUT': {
            return {
                user: null,
                isAuth: false,
                isNicknameValid: false,
                state: 'no-auth',
                signIn: {
                    email: 'alice.johnson@example.com',
                    password: '@pass111999',
                },
                signUp: {
                    nickname: '',
                    email: '',
                    password: ''
                },
                currentOperantion: undefined
            }
        }
        case 'VALIDATE-NICKNAME': {
            return {
                ...state,
                isNicknameValid: action.payload
            }
        }
        case 'CHANGE_STATE':{
            return {
                ...state,
                state: action.payload.operation,
                currentOperantion: action.payload.currentOperantion ?? undefined
            }
        }
        default:{            
            return state;
        }
    }
}
