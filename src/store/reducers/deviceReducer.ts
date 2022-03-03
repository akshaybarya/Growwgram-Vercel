import { identifyDevice } from "../../utils/helpers";
import { deviceState, action } from "../../utils/types";
import { CHANGE_DEVICE } from "../actions/types";

const device = identifyDevice();

const deviceReducer = (state: deviceState = device, action: action) => {
  switch (action.type) {
    case CHANGE_DEVICE:
      return action.payload;

    default:
      return state;
  }
};

export default deviceReducer;
