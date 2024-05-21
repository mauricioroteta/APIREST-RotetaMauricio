import { createActionGroup, props, emptyProps } from '@ngrx/store';

export const authActions = createActionGroup({
    source: 'Auth',
    events: {
      login: props<{ username: string; rol: string}>(),
      logout: emptyProps(),
    },
  });
