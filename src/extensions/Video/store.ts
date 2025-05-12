import { useStoreUploadVideo } from '@/stores';
import { dispatchEvent } from '@/utils/customEvents/customEvents';
import { EVENTS } from '@/utils/customEvents/events.constant';

export function useDialogVideo() {
  const [v] = useStoreUploadVideo(store => store.value);

  return v;
}

export const actionDialogVideo = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setOpen: (id: any, value: boolean) => {
    dispatchEvent(EVENTS.UPLOAD_VIDEO(id), value);
  },
};
