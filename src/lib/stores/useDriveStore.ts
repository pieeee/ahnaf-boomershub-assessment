import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface IDocument {
  name: string;
  parent?: string | null;
  id: string;
  createdAt?: string;
  type: "file" | "folder";
  fileType?: string;
  fileUrl?: string;
  fileSize?: number;
}

interface IDriveStore {
  documents: { [key: string]: IDocument };
}

export const useDriveStore = create(
  persist<IDriveStore>(
    () => ({
      documents: {},
    }),
    {
      name: "drive-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/**
 * Creates a new document with the given payload and adds it to the state
 *
 * @param {IDocument} payload - The payload to create a new document
 * @returns {void}
 */
export const createDocument = (payload: IDocument): void =>
  useDriveStore.setState((state) => {
    // Create a new document object with payload and createdAt timestamp
    const newDocument: IDocument = {
      ...payload,
      createdAt: new Date().toISOString(),
    };

    // Return a new state object with the new document added to the documents object
    return {
      ...state,
      documents: { ...state.documents, [newDocument.id]: newDocument },
    };
  });

/**
 * Returns an array of root documents with the given type
 *
 * @param {"file" | "folder"} type - The type of documents to select
 * @returns {(state: IDriveStore) => IDocument[]} - A selector function that returns an array of documents
 */
export const selectRootDocuments =
  (type: "file" | "folder"): ((state: IDriveStore) => IDocument[]) =>
  (state: IDriveStore) => {
    // Filter the documents to get the ones that have no parent and match the given type
    const rootDocuments = Object.keys(state.documents)
      .filter(
        (id) => !state.documents[id].parent && state.documents[id].type === type
      )
      .map((id) => state.documents[id]);

    // Return the array of root documents
    return rootDocuments;
  };

/**
 * Returns an array of child documents with the given parent ID and type
 *
 * @param {{parentID?: string | null; type: "file" | "folder"}} options - The options object to select child documents
 * @returns {(state: IDriveStore) => IDocument[]} - A selector function that returns an array of documents
 */
export const selectChildDocuments =
  ({
    parentID,
    type,
  }: {
    parentID?: string | null;
    type: "file" | "folder";
  }): ((state: IDriveStore) => IDocument[]) =>
  (state: IDriveStore) => {
    // Return an empty array if parent ID is null or undefined
    if (!parentID) {
      return [];
    }

    // Filter the documents to get the ones that match the given type and parent ID
    const childDocuments: IDocument[] = [];

    Object.keys(state.documents).forEach((id) => {
      const document = state.documents[id];

      if (document.type === type && document.parent === parentID) {
        childDocuments.push(document);
      }
    });

    // Return the array of child documents
    return childDocuments;
  };

/**
 * Renames the document with the given ID and updates it in the state
 *
 * @param {{ id: string; name: string }} payload - The payload to rename the document
 * @returns {void}
 */
export const renameDocument = (payload: { id: string; name: string }): void =>
  useDriveStore.setState((state) => {
    // Get the document object from the state and update its name property
    const document = state.documents[payload.id];
    document.name = payload.name;

    // Return a new state object with the updated document object
    return {
      ...state,
      documents: { ...state.documents, [payload.id]: document },
    };
  });

/**
 * Returns the document object with the given ID or undefined if it doesn't exist
 *
 * @param {string | null | undefined} id - The ID of the document to select
 * @returns {(state: IDriveStore) => IDocument | undefined} - A selector function that returns the document object or undefined
 */
export const selectDocumentInfo =
  (id?: string | null): ((state: IDriveStore) => IDocument | undefined) =>
  (state: IDriveStore) =>
    // Return the document object if the ID is not null or undefined, otherwise return undefined
    id ? state.documents[id] : undefined;

/**
 * Returns an array of document objects representing the breadcrumb trail for the given document ID
 *
 * @param {string} id - The ID of the document to get the breadcrumb trail for
 * @returns {(state: IDriveStore) => IDocument[]} - A selector function that returns an array of documents representing the breadcrumb trail
 */
export const selectBreadcrumb =
  (id: string): ((state: IDriveStore) => IDocument[]) =>
  (state: IDriveStore) => {
    // Return an empty array if the ID is not provided or invalid
    if (!id) {
      return [];
    }

    // Traverse the parent chain to build the breadcrumb trail
    const documents: IDocument[] = [];
    let parentId = id;

    for (
      let doc = state.documents[parentId];
      doc?.parent;
      doc = state.documents[parentId]
    ) {
      documents.push(doc);
      parentId = doc.parent;
    }

    // Push the root document to the breadcrumb trail
    documents.push(state.documents[parentId]);

    // Return the breadcrumb trail in reverse order
    return documents.reverse();
  };

/**
 * Deletes the document with the given parent ID and its child documents from the state
 *
 * @param {string} parentId - The ID of the parent document to delete
 * @returns {void}
 */
export const deleteDocument = (parentId: string): void =>
  useDriveStore.setState((state: IDriveStore) => {
    // Create a new documents object with the parent and child documents removed
    const documents = { ...state.documents };

    Object.keys(state.documents).forEach((id) => {
      const document = state.documents[id];

      if (document.parent === parentId) {
        delete documents[id];
      }
    });

    delete documents[parentId];

    // Return a new state object with the new documents object
    return { ...state, documents };
  });
