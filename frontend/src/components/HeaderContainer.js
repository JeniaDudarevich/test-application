import React from "react";
import { Menu } from "antd";
import { ReactComponent as MainLogo } from "../images/main-logo.svg";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { MenuOutlined } from "@ant-design/icons";
import { UPLOAD_VIDEO_ROUTE_PATH } from "../config/constants";

class HeaderContainer extends React.Component {
  state = {
    defaultSelectedKey: "home",
    isMobileMenuCollapsed: false
  };

  componentWillMount() {
    const { location: { pathname } } = this.props;
    if (pathname === UPLOAD_VIDEO_ROUTE_PATH) {
      this.setState({ defaultSelectedKey: "upload-video" });
    }
  }

  mobileMenuIconClickHandler = () => {
    const { isMobileMenuCollapsed } = this.state;
    this.setState({ isMobileMenuCollapsed: !isMobileMenuCollapsed });
  };

  render() {
    const {
      defaultSelectedKey,
      isMobileMenuCollapsed
    } = this.state;
    return (
      <div className="header-container">
        <MainLogo className="main-logo" />
        <div className="desktop-menu">
          <Menu
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={[`${defaultSelectedKey}`]}
          >
            <Menu.Item key="home">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="upload-video">
              <Link to="/upload">Upload new video</Link>
            </Menu.Item>
          </Menu>
        </div>
        <div className="mobile-menu">
          <MenuOutlined className="menu-icon" onClick={this.mobileMenuIconClickHandler} />
          {isMobileMenuCollapsed && (
            <Menu
              theme="light"
              mode="inline"
              defaultSelectedKeys={[`${defaultSelectedKey}`]}>
              <Menu.Item key="home">
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="upload-video">
                <Link to="/upload">Upload new video</Link>
              </Menu.Item>
            </Menu>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(HeaderContainer);
