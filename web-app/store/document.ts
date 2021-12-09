import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { Document } from '../../firestore/types';

interface DocumentState {
  document?: Document;
  documents?: Document[];
}

export const state = (): DocumentState => {
  return {
    document: undefined,
    documents: undefined,
  };
};

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
  document: (state: DocumentState): Document | undefined => state.document,
  documents: (state: DocumentState): Document[] | undefined => state.documents,
};

export const actions: ActionTree<RootState, RootState> = {

  async fetchDocument({ commit }, { id } = {}): Promise<Document> {
    const documentRef = this.$fire.firestore.collection('documents').doc(id);
    const documentSnapshot = await documentRef.get();
    if (documentSnapshot.exists) {
      const documentRecord = documentSnapshot.data() as Document;
      if (!documentRecord) throw new Error('Document record does not exist');
      documentRecord._id = id;
      commit('SET_DOCUMENT', documentRecord);
      return documentRecord;
    } else {
      throw new Error('Document does not exist');
    }
  },

  async fetchDocuments({ commit }, queryParams: string[] = []): Promise<Document[]> {
    // @ts-ignore
    const documentsRef = this.$fire.firestore.collection('documents').where(...queryParams);
    const documentsSnapshot = await documentsRef.get();
    console.log('documentsSnapshot: ', documentsSnapshot);
    // TODO loop through documents and add _id
    const documents: Document[] = [];
    commit('SET_DOCUMENTS', documents);
    return documents;
  },

  sendNewDocument(_vuex , document: Document): Promise<any> {
    const sendNewDocument = this.$fire.functions.httpsCallable('default-sendNewDocument');
    return sendNewDocument(document);
  }

};

export const mutations: MutationTree<RootState> = {
  SET_DOCUMENT: (state: DocumentState, document: Document | undefined) => {
    state.document = document;
  },
  SET_DOCUMENTS: (state: DocumentState, documents: Document[] | undefined) => {
    state.documents = documents;
  },
};
