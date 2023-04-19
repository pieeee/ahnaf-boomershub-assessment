import { create } from "zustand";

interface INewFolderModalStore {
  open: boolean;
  parentId?: null | string;
  actionType: "create" | "rename";
  shouldNavigate?: boolean;
}

export const useNewFolderModalStore = create<INewFolderModalStore>(() => ({
  open: false,
  parentId: null,
  actionType: "create",
  shouldNavigate: false,
}));

export const openNewFolderModalStore = (
  payload: Omit<INewFolderModalStore, "open">
) =>
  useNewFolderModalStore.setState((state) => ({
    ...state,
    ...payload,
    open: true,
  }));

export const closeNewFolderModalStore = () =>
  useNewFolderModalStore.setState((state) => ({
    open: false,
    parentId: null,
    shouldNavigate: false,
  }));
