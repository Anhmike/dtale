import PropTypes from "prop-types";
import React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";

import serverStateManagement from "../serverStateManagement";
import { MenuItem } from "./MenuItem";

class ReactPinMenuOption extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { toggleMenuPinned, menuPinned, t } = this.props;
    const togglePinned = () => serverStateManagement.updatePinned(!menuPinned, toggleMenuPinned);
    return (
      <MenuItem description={t("menu_description:pin_menu")}>
        <span className="toggler-action">
          <button className="btn btn-plain" onClick={togglePinned}>
            <i className="fa fa-anchor la-lg mr-3 ml-1" />
            <span className="font-weight-bold">{t(`menu:${menuPinned ? "Unpin menu" : "Pin menu"}`)}</span>
          </button>
        </span>
      </MenuItem>
    );
  }
}
ReactPinMenuOption.displayName = "ReactPinMenuOption";
ReactPinMenuOption.propTypes = {
  menuPinned: PropTypes.bool,
  toggleMenuPinned: PropTypes.func,
  t: PropTypes.func,
};

const TranslatedReactPinMenuOption = withTranslation(["menu", "menu_description"])(ReactPinMenuOption);
const ReduxPinMenuOption = connect(
  ({ language }) => ({ language }),
  dispatch => ({
    toggleMenuPinned: () => dispatch({ type: "toggle-menu-pinned" }),
  })
)(TranslatedReactPinMenuOption);

export { ReduxPinMenuOption as PinMenuOption, TranslatedReactPinMenuOption as ReactPinMenuOption };
