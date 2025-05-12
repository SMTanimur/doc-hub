/* eslint-disable @typescript-eslint/no-explicit-any */
import { useStoreEditableEditor } from '@/stores';
import { dispatchEvent } from '@/utils/customEvents/customEvents';
import { EVENTS } from '@/utils/customEvents/events.constant';

export function useEditableEditor() {
  const [v] = useStoreEditableEditor((store: { value: any; }) => store.value);

  return v;
}

export const editableEditorActions = {
  setDisable: (id: any, disable: boolean) => {
    dispatchEvent(EVENTS.EDIT(id), disable);
  },
};
