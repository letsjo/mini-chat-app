import { create } from 'zustand';

interface PageStates {
  showCurrentUserPage: boolean;
}

interface PageStateActions {
  setShowCurrentUserPage: () => void;
}

const usePageState = create<PageStates & PageStateActions>((set) => ({
  showCurrentUserPage: false,
  setShowCurrentUserPage: () =>
    set((prev) => {
      return { showCurrentUserPage: !prev.showCurrentUserPage };
    }),
}));

export default usePageState;
