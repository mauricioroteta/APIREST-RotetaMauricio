import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureName, AuthState } from './auth.reducer';

export const authState = createFeatureSelector<AuthState>(authFeatureName);
export const authIsLogin = createSelector(authState, (state) => state.isLoggedIn);
export const authUserLogin = createSelector(authState, (state) => state.username);
export const authRolLogin = createSelector(authState, (state) => state.rol);
export const authAvatarLogin = createSelector(authState, (state) => state.avatar);
