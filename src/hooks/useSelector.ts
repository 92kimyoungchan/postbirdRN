import {useSelector} from 'react-redux';

export const useUser = () => {
    return useSelector(state => state.user);
}

export const useInit = () => {
    return useSelector(state => state.init);
}

export const useSign = () => {
    return useSelector(state => state.sign);
}