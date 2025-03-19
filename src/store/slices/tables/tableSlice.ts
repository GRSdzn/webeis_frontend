import { BrowserConfig, BrowserDataContent } from '@/@types/Client Types/BrowserTypes';
import { CardInfo } from '@/@types/Client Types/CardTypes';
import { FinderInfo } from '@/@types/Client Types/FinderForm';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ITablesState {
  tables: (BrowserConfig | CardInfo | FinderInfo)[];
  parentId?: string;
  openModals: string[];
  selectedRowData: BrowserDataContent | CardInfo | FinderInfo | null;
}

const initialState: ITablesState = {
  tables: [],
  openModals: [],
  selectedRowData: null,
};

export const tablesSlice = createSlice({
  name: 'tables',
  initialState,
  reducers: {
    selectedRowData: (
      state,
      action: PayloadAction<BrowserDataContent | CardInfo | FinderInfo | null>
    ) => {
      state.selectedRowData = action.payload;
    },

    addTable: (state, action: PayloadAction<BrowserConfig | CardInfo | FinderInfo>) => {
      const payload = action.payload;

      if ('idmenu' in payload && payload.idmenu) {
        const idmenu = payload.idmenu;

        if (!state.openModals.includes(idmenu)) {
          state.tables.push(payload);
          state.openModals.push(idmenu);
        }
      } else {
        console.error('Payload is invalid', payload);
      }
    },

    removeTable: (state, action: PayloadAction<string>) => {
      const tableId = action.payload;

      state.tables = state.tables.filter((table) => {
        if ('idmenu' in table) {
          return table.idmenu !== tableId;
        }
        return true;
      });

      state.openModals = state.openModals.filter((id) => id !== tableId);
    },

    closeModal: (state, action: PayloadAction<string>) => {
      const tableId = action.payload;

      state.openModals = state.openModals.filter((id) => id !== tableId);
    },
  },
});

export const { addTable, removeTable, closeModal, selectedRowData } = tablesSlice.actions;
export default tablesSlice.reducer;
