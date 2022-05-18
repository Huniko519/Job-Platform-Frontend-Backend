/*
Menu Types:
"menu-default", "menu-sub-hidden", "menu-hidden"
*/
export const defaultMenuType = "menu-default menu-sub-hidden";

export const subHiddenBreakpoint = 767;
export const menuHiddenBreakpoint = 767;
export const defaultLocale = "en";
export const localeOptions = [
    { id: "en", name: "English - LTR", direction: "ltr" },
    { id: "es", name: "Español", direction: "ltr" },
    { id: "enrtl", name: "English - RTL", direction: "rtl" },
];

export const searchPath = "#";
export const servicePath = "https://api.coloredstrategies.com";

export const themeColorStorageKey = "__theme_selected_color";
export const defaultColor = "light.blueolympic";
export const isDarkSwitchActive = true;
export const defaultDirection = "ltr";
export const themeRadiusStorageKey = "__theme_radius";
export const isDemo = true;

export const UserRole = {
    SuperAdmin: "SUPER_ADMIN_ROLE",
    Consultant: "CONSULTANT",
    Contractor: "CONTRACTOR",
    Customer: "CUSTOMER",
    HouseOwner: "APARTMENT_OWNER_ROLE",
    Board: "BOARD MEMBER",
};

export const InvitationStatus = {
    Board: "board",
    Waiting: "waiting",
    Pending: "pending",
    Progress: "Progress",
    Finalize: "finalize",
    Completed: "completed",
    Done: "done",
};