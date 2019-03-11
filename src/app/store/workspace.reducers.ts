import {WorkspaceActions, WorkspaceActionTypes} from './workspace.actions';

const noEnvironment = {
  id: '',
  name: 'No Environment'
};

export interface WorkspaceState {
  tabs: any[];
  state: {
    activeTab: number,
    sidebarWidth: number,
    environment: string,
  };
  environment: {
    active: any,
    list: any[]
  };
}

export const initialState: WorkspaceState = {
  tabs: [],
  state: {
    activeTab: 0,
    sidebarWidth: 200,
    environment: ''
  },
  environment: {
    active: {},
    list: [
      noEnvironment
    ]
  }
};

export function workspaceReducer(state = initialState, action: WorkspaceActions): WorkspaceState {
  switch (action.type) {
    case WorkspaceActionTypes.LoadSuccess:
      return {
        ...state,
        tabs: action.tabs
      };
    case WorkspaceActionTypes.LoadStateSuccess:
      // TODO: this probably overlaps, remove
      return {
        ...state,
        state: action.state
      };
    case WorkspaceActionTypes.StateChangeSuccess: {
      const newState: WorkspaceState = {
        ...state,
        state: {
          ...state.state,
          ...action.state
        }
      };

      const envChange = action.state.environment;
      if (typeof envChange !== 'undefined') {
        const active = state.environment.list.find(env => env.id === envChange);

        newState.environment = {
          ...newState.environment,
          active
        };
      }

      return newState;
    }
    case WorkspaceActionTypes.LoadEnvironments: {
      const newState: WorkspaceState = {
        ...state,
      };

      if (typeof action.active !== 'undefined') {
        newState.state.environment = action.active;
      }

      return newState;
    }
    case WorkspaceActionTypes.LoadEnvironmentsSuccess: {
      const news: WorkspaceState = {
        ...state,
        environment: {
          ...state.environment,
          list: [
            noEnvironment,
            ...action.environments
          ]
        }
      };

      if (typeof news.state.environment !== 'undefined') {
        const active = news.environment.list.find(env => env.id === news.state.environment);

        news.environment = {
          ...news.environment,
          active
        };
      }


      return news;
    }
    case WorkspaceActionTypes.RemoveTabSuccess:
      const targetTab = state.tabs.findIndex(tab => tab.id === action.tab.id);

      if (targetTab >= 0) {
        state.tabs.splice(targetTab, 1);
      }

      const numberOfTabs = state.tabs.length;

      let activeTab = state.state.activeTab;

      if (activeTab >= numberOfTabs) {
        activeTab = numberOfTabs > 0 ? numberOfTabs - 1 : 0;
      }

      return {
        ...state,
        state: {
          ...state.state,
          activeTab
        }
      };
    case WorkspaceActionTypes.AddTabSuccess:

      if (action.tab) {
        state.tabs.push(action.tab);
      }

      return {
        ...state,
        state: {
          ...state.state,
          activeTab: state.tabs.length - 1
        }
      };
    case WorkspaceActionTypes.SelectEnvironment:
      const selected = state.environment.list.find(env => env.id === action.environment);

      return {
        ...state,
        environment: {
          ...state.environment,
          active: selected
        }
      };

    default:
      return state;
  }
}

