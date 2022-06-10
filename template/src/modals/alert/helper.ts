import { alertStore, OpenProps } from "./alert.store";

function show(props: OpenProps) {
  alertStore.getState().open(props);
}

const alertHelper = {
  show,
};

export default alertHelper;
