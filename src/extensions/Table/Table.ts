/* eslint-disable @typescript-eslint/no-explicit-any */
import TiptapTable from '@tiptap/extension-table';
import { TableCell } from '@tiptap/extension-table-cell';
import type { TableCellOptions } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import type { TableHeaderOptions } from '@tiptap/extension-table-header';
import { TableRow } from '@tiptap/extension-table-row';
import type { TableRowOptions } from '@tiptap/extension-table-row';

import TableActionButton from '@/extensions/Table/components/TableActionButton';
import type { GeneralOptions } from '@/types';

import type { TableCellBackgroundOptions } from './cell-background';
import { TableCellBackground } from './cell-background';

export interface TableOptions extends GeneralOptions<TableOptions> {
  HTMLAttributes: Record<string, any>
  resizable: boolean
  handleWidth: number
  cellMinWidth: number
  lastColumnResizable: boolean
  allowTableNodeSelection: boolean
  /** options for table rows */
  tableRow: Partial<TableRowOptions>
  /** options for table headers */
  tableHeader: Partial<TableHeaderOptions>
  /** options for table cells */
  tableCell: Partial<TableCellOptions>
  /** options for table cell background */
  tableCellBackground: Partial<TableCellBackgroundOptions>
}
export const Table = /* @__PURE__ */ TiptapTable.extend<TableOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      resizable: true,
      lastColumnResizable: true,
      allowTableNodeSelection: false,
      button: ({ editor}: any) => ({
        component: TableActionButton,
        componentProps: {
          disabled: editor.isActive('table') || false,
          icon: 'Table',
          tooltip: "Table",
          editor,
        },
      }),
    };
  },

  addExtensions() {
    return [
      TableRow.configure(this.options.tableRow),
      TableHeader.configure(this.options.tableHeader),
      TableCell.configure(this.options.tableCell),
      TableCellBackground.configure(this.options.tableCellBackground),
    ];
  },
});

export default Table;
