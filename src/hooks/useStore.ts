import {bindActionCreators} from 'redux';
import {useDispatch} from 'react-redux';
import {settingSave} from '../slices/setting';

export default function useSettingActions() {
  const dispatch = useDispatch();
  return bindActionCreators({settingSave}, dispatch);
}


/**
 * 
 *    const {settingSave} = useSettingActions();
 *   
 */

/**

 import {createSlice, PayloadAction} from '@reduxjs/toolkit';

 export interface Setting {
   externalStoragePermissions: boolean;
   cameraPermissions: boolean;
   isSelected: boolean;
 }
 
 export interface SettingState {
   setting: Setting | null;
   // apple info , naver info
 }
 
 const initialState: SettingState = {
   setting: {
     externalStoragePermissions: false,
     cameraPermissions: false,
     isSelected: false,
   },
 };
 
 const settingSlice = createSlice({
   name: 'setting',
   initialState,
   reducers: {
     settingSave(state, action: PayloadAction<Setting>) {
       console.log('setting-restore');
       state.setting = action.payload;
     },
   },
 });
 
 export default settingSlice.reducer;
 export const {settingSave} = settingSlice.actions;
 */
 