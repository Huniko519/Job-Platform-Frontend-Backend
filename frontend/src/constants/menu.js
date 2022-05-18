import { UserRole } from "./defaultValues";

const data = [
  //////// Super Admin ////////
  {
    id: "admin.dashboard",
    icon: "/assets/image/dashboard_icon.svg",
    label: "Dashboard",
    to: "/admin/dashboard",
    role: UserRole.SuperAdmin,
  },
  {
    id: "admin.profile",
    icon: "/assets/image/profile_icon.svg",
    label: "My Profile",
    to: "/admin/profile",
    role: UserRole.SuperAdmin,
  },
  {
    id: "admin.contractors",
    icon: "/assets/image/contractors_icon.svg",
    label: "Contractors",
    to: "/admin/contractors",
    role: UserRole.SuperAdmin,
  },
  {
    id: "admin.clients",
    icon: "/assets/image/clients_icon.svg",
    label: "Apartment Complex",
    to: "/admin/clients",
    role: UserRole.SuperAdmin,
  },
  {
    id: "admin.superadmins",
    icon: "/assets/image/superadmins_icon.svg",
    label: "Super Admins",
    to: "/admin/superadmins",
    role: UserRole.SuperAdmin,
  },
  {
    id: "admin.questions",
    icon: "/assets/image/questions_icon.svg",
    label: "Questions",
    to: "/admin/questions",
    role: UserRole.SuperAdmin,
  },
  {
    id: "admin.reports",
    icon: "/assets/image/reports_icon.svg",
    label: "Reports",
    to: "/admin/reports",
    role: UserRole.SuperAdmin,
  },

  ///// House Owner ///////
  {
    id: "houseowner.houseowner.dashboard",
    icon: "/assets/image/dashboard_icon.svg",
    label: "Dashboard",
    to: "/houseowner/dashboard",
    role: UserRole.HouseOwner,
  },
  {
    id: "houseowner.profile",
    icon: "/assets/image/profile_icon.svg",
    label: "Profile",
    to: "/houseowner/profile",
    role: UserRole.HouseOwner,
  },
  {
    id: "houseowner.jobhistory",
    icon: "/assets/image/viewissue_icon.svg",
    label: "View Jobs",
    to: "/houseowner/jobs",
    role: UserRole.HouseOwner,
  },
  {
    id: "houseowner.jobcreate",
    icon: "/assets/image/createissue_icon.svg",
    label: "New Job",
    to: "/houseowner/jobcreate",
    role: UserRole.HouseOwner,
  },

  ///// Contractor ///////
  {
    id: "contractor.contractor.dashboard",
    icon: "/assets/image/dashboard_icon.svg",
    label: "Dashboard",
    to: "/contractor/dashboard",
    role: UserRole.Contractor,
  },
  {
    id: "contractor.profile",
    icon: "/assets/image/profile_icon.svg",
    label: "Profile",
    to: "/contractor/profile",
    role: UserRole.Contractor,
  },
  {
    id: "contractor.manage",
    icon: "/assets/image/viewissue_icon.svg",
    label: "Manage Own Organization",
    to: "/contractor/manage",
    role: UserRole.Contractor,
  },
  {
    id: "contractor.jobhistory",
    icon: "/assets/image/viewissue_icon.svg",
    label: "View Jobs",
    to: "/contractor/jobs",
    role: UserRole.Contractor,
  },
  {
    id: "contractor.users",
    icon: "/assets/image/createissue_icon.svg",
    label: "Contractor Users",
    to: "/contractor/users",
    role: UserRole.Contractor,
  },
  ///// Board Member ///////
  {
    id: "board.dashboard",
    icon: "/assets/image/dashboard_icon.svg",
    label: "Dashboard",
    to: "/board/dashboard",
    role: UserRole.Board,
  },
  {
    id: "board.profile",
    icon: "/assets/image/profile_icon.svg",
    label: "Profile",
    to: "/board/profile",
    role: UserRole.Board,
  },
  {
    id: "board.contractors",
    icon: "/assets/image/contractors_icon.svg",
    label: "Contractors",
    to: "/board/contractors",
    role: UserRole.Board,
  },
  {
    id: "board.clients",
    icon: "/assets/image/clients_icon.svg",
    label: "Owners",
    to: "/board/owners",
    role: UserRole.Board,
  },
  {
    id: "board.viewissues",
    icon: "/assets/image/viewissue_icon.svg",
    label: "View Issues",
    to: "/board/jobs",
    role: UserRole.Board,
  },
  {
    id: "board.createissue",
    icon: "/assets/image/viewissue_icon.svg",
    label: "Create Issue",
    to: "/board/create",
    role: UserRole.Board,
  },
  {
    id: "board.manage",
    icon: "/assets/image/viewissue_icon.svg",
    label: "Manage own organization",
    to: "/board/manage",
    role: UserRole.Board,
  },
  {
    id: "board.apartments",
    icon: "/assets/image/viewissue_icon.svg",
    label: "Apartments",
    to: "/board/apartments",
    role: UserRole.Board,
  },
];
export default data;
