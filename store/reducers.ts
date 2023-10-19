import { combineReducers } from '@reduxjs/toolkit';
import uiReducer from '../features/ui/uiSlice';
import authReducer from '@/features/auth/authSlice';
import dataReducer from '@/features/data/dataSlice';

const rootReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  data: dataReducer,
});

export default rootReducer;
