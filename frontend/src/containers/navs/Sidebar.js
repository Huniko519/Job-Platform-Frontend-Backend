import React, { useState } from "react";
import { Nav, NavItem } from "reactstrap";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { useMedia } from "react-use";

import DropDownMenu from "./dropdown";
import { Box, Container } from "../../components/styles";
import { SidebarContainer, SidebarWrapper } from "./styles";

import menuItems from "../../constants/menu";

const Sidebar = ({ user }) => {
  const [selectedMenu, setSelectedMenu] = useState("");
  const [hoverMenu, setHoverMenu] = useState("");
  const [mobileRedirect, setMobileRedirect] = useState(false);
  const [menuItem, setMenuItem] = useState(menuItems[0]);
  const isMobile = useMedia("(max-width: 768px)");

  // console.log(selectedMenu, hoverMenu);

  const handleSelectedMenu = (item) => {
    setSelectedMenu(item.id);
    setMenuItem(item);
  };

  const handleHoverMenu = (id) => {
    setHoverMenu(id);
  };

  const handleLeaveMenu = () => {
    setHoverMenu("");
  };

  const handleMenu = (item) => {
    setMenuItem(item);
    setSelectedMenu(item.id);
    setMobileRedirect(true);
  };

  return (
    <>
      {mobileRedirect && <Redirect to={menuItem.to} />}
      <SidebarContainer>
        {!isMobile && (
          <SidebarWrapper>
            <Nav className="menu-wrapper">
              {menuItems
                .filter((item) => item.role === user?.role)
                .map((item, index) => {
                  return (
                    <NavItem key={`__key-${index.toString()}`}>
                      <NavLink
                        to={item.to}
                        onClick={() => handleSelectedMenu(item)}
                        onMouseOver={() => handleHoverMenu(item.id)}
                        onMouseLeave={() => handleLeaveMenu()}
                      >
                        <img src={item.icon} alt="icon" />
                        {item.label}
                      </NavLink>
                    </NavItem>
                  );
                })}
            </Nav>
          </SidebarWrapper>
        )}
        {isMobile && (
          <Container>
            <Box justify="space-between">
              <DropDownMenu
                list={menuItems}
                current={menuItem}
                setCurrent={handleMenu}
              >
                .
              </DropDownMenu>
            </Box>
          </Container>
        )}
      </SidebarContainer>
    </>
  );
};

const mapStateToProps = ({ common }) => {
  return { user: common.user };
};
export default connect(mapStateToProps)(Sidebar);
