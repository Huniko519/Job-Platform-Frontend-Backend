import { combineReducers } from "redux";
import common from "./common/reducer";
import menu from "./menu/reducer";
import settings from "./settings/reducer";
import offers from "./Offer/reducer";
import contractors from "./contractors/reducer";
import superadmins from "./superadmins/reducer";
import clients from "./clients/reducer";

const reducers = combineReducers({
  common,
  settings,
  menu,
  offers,
  contractors,
  superadmins,
  clients
});

export default reducers;
