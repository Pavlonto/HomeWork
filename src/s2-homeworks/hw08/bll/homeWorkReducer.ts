import {UserType} from '../HW8'

type ActionType =
    | { type: 'sort'; payload: 'up' | 'down' }
    | { type: 'check'; payload: number }

export const homeWorkReducer = (state: UserType[], action: ActionType): UserType[] => {
    switch (action.type) {
        case 'sort': { // by name
            let stateCopy = [...state]
            if(action.payload === 'up') {
                stateCopy.sort(function(a, b){
                    if(a.name < b.name) { return -1; }
                    if(a.name > b.name) { return 1; }
                    return 0;
                })
            }
            if(action.payload === 'down') {
                stateCopy.sort(function(a, b){
                    if(a.name < b.name) { return 1; }
                    if(a.name > b.name) { return -1; }
                    return 0;
                })
            }
            return stateCopy // need to fix
        }
        case 'check': {
            let stateCopy = [...state]
            stateCopy = stateCopy.filter(u => u.age >= action.payload)
            return stateCopy // need to fix
        }
        default:
            return state
    }
}
