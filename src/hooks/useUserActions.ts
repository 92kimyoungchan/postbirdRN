import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import {authorize, logout} from '../slices/user';
import {useMemo} from 'react';

export default function useUserActions() {
    const dispatch = useDispatch();
    return useMemo(() => bindActionCreators({authorize, logout}, dispatch), []);
}