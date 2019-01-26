import { ReloadCategory } from '../const';

const INIT_STATE =
{
    reloadCategory: 0
};

const categoryReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case ReloadCategory:
            state = {
                reloadCategory: state.reloadCategory + 1
            };
            return state
        default: return state;
    }
};

export default categoryReducer;
