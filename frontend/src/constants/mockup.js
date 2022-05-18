import { UserRole } from "./defaultValues";

export const personalInfo = {
  name: "Jane Oliver",
  role: "Super Admin",
  avatar: "/assets/image/avatar.jpg",
};

export const adminDashboard = [
  {
    title: "Newly Closed Claims",
    amount: 52,
  },
  {
    title: "Claims in Progress",
    amount: 87,
  },
  {
    title: "Total registered claims",
    amount: 74,
  },
  {
    title: "Claims waiting for offers",
    amount: 79,
  },
  {
    title: "Total Complexes",
    amount: 76,
  },
  {
    title: "Users in system",
    amount: 680,
  },
];

export const contractorTableHeaders = [
  { text: "Case no", key: "case_no", class: "text-center" },
  { text: "address", key: "title", class: "text-center" },
  { text: "Date", key: "date", class: "text-center" },
  { text: "Status", key: "status", class: "text-center" },
  { text: "Messages", key: "messages", class: "text-center" },
  { text: "Action", key: "action", class: "text-center" },
];
export const boardTableHeader = [
  { text: "Case no", key: "_id", class: "text-center" },
  { text: "address", key: "address", class: "text-center" },
  { text: "Date", key: "date", class: "text-center" },
  { text: "Status", key: "status", class: "text-center" },
  { text: "Messages", key: "messages", class: "text-center" },
  { text: "Action", key: "action", class: "text-center" },
];

export const contractorStatus = [
  { value: "New", label: "New" },
  { value: "Waiting", label: "Waiting" },
  { value: "Reject", label: "Reject" },
  { value: "Approve", label: "Approve" },
  { value: "Approved", label: "Approved" },
];

export const contractorTableData = [
  {
    case_no: 1,
    address: "China road 15",
    date: "20.04.2021",
    status: "pending",
    messages: "1",
    action: "See More",
  },
  {
    case_no: 2,
    address: "China road 15",
    date: "24.04.2021",
    status: "waiting",
    messages: "2",
    action: "See More",
  },
  {
    case_no: 3,
    address: "China road 15",
    date: "24.04.2021",
    status: "rejected",
    messages: "2",
    action: "See More",
  },
  {
    case_no: 4,
    address: "China road 15",
    date: "24.04.2021",
    status: "completed",
    messages: "2",
    action: "See More",
  },
  {
    case_no: 5,
    address: "China road 15",
    date: "24.04.2021",
    status: "done",
    messages: "2",
    action: "See More",
  },
];

export const ownerTableHeaders = [
  { text: "Case no", key: "_id", class: "text-center" },
  { text: "title", key: "title", class: "text-center" },
  { text: "Date", key: "date", class: "text-center" },
  { text: "Status", key: "status", class: "text-center" },
  { text: "Messages", key: "messages", class: "text-center" },
  { text: "Action", key: "action", class: "text-center" },
];

export const ownerTableData = [
  {
    id: 1,
    address: "China road 15",
    createdTime: "20.04.2021",
    state: "pending",
    messages: "1",
    action: "See More",
  },
  {
    id: 2,
    address: "China road 15",
    createdTime: "20.04.2021",
    state: "pending",
    messages: "1",
    action: "See More",
  },
];

export const DashboardLinks = [
  // House Owner
  {
    key: "register",
    label: "New Job",
    icon: "/assets/image/plus_icon.svg",
    to: "/houseowner/jobcreate",
    role: UserRole.HouseOwner,
  },
  {
    key: "contact",
    label: "Personal Information",
    icon: "/assets/image/contact_icon.svg",
    to: "/houseowner/profile",
    role: UserRole.HouseOwner,
  },

  //Contractor
  {
    key: "incoming",
    label: "Incoming Claims",
    icon: "/assets/image/plus_icon.svg",
    to: "/contractor/jobs",
    role: UserRole.Contractor,
  },
  {
    key: "offers",
    label: "Offers Accepted",
    icon: "/assets/image/contact_icon.svg",
    to: "/contractor/jobs",
    role: UserRole.Contractor,
  },
  {
    key: "contractor_contact",
    label: "Personal Information",
    icon: "/assets/image/contact_icon.svg",
    to: "/contractor/profile",
    role: UserRole.Contractor,
  },

  //Board
  {
    key: "board_register_claim",
    label: "Register Claim",
    icon: "/assets/image/plus_icon.svg",
    to: "/board/jobs",
    role: UserRole.Board,
  },
  {
    key: "board_register_contractor",
    label: "Register New Contractor",
    icon: "/assets/image/board_register_icon.svg",
    to: "/board/jobs",
    role: UserRole.Board,
  },
  {
    key: "board_information",
    label: "Complex Information",
    icon: "/assets/image/question_icon.svg",
    to: "/board/jobs",
    role: UserRole.Board,
  },
  {
    key: "board_information",
    label: "Complex Information",
    icon: "/assets/image/contact_icon.svg",
    to: "/board/jobs",
    role: UserRole.Board,
  },
];

export const DashboardStats = [
  //House Owner
  {
    key: "jobhistory",
    label: "Claims last 12 months",
    icon: "/assets/image/home_icon.svg",
    to: "/houseowner/jobhistory",
    role: UserRole.HouseOwner,
  },
  {
    key: "jobs",
    label: "Active Claims",
    icon: "/assets/image/people_icon.svg",
    to: "/houseowner/jobs",
    role: UserRole.HouseOwner,
  },

  //Contractor
  {
    key: "contractor_jobreceive",
    label: "Claims received last 12 months",
    icon: "/assets/image/home_icon.svg",
    to: "/contractor/jobs",
    role: UserRole.Contractor,
  },
  {
    key: "contractor_jobhistory",
    label: "Completed claims last 12 months",
    icon: "/assets/image/people_icon.svg",
    to: "/contractor/jobhistory",
    role: UserRole.Contractor,
  },
  {
    key: "contractor_jobs",
    label: "Active Claims",
    icon: "/assets/image/home_icon.svg",
    to: "/contractor/jobs",
    role: UserRole.Contractor,
  },
  {
    key: "contractor_average",
    label: "Average income per claim",
    icon: "/assets/image/people_icon.svg",
    to: "/contractor/jobs",
    role: UserRole.Contractor,
  },
  // Board member
  {
    key: "board_claims",
    label: "Claims last 12 months",
    icon: "/assets/image/SearchAndApp_icon.svg",
    to: "/board/jobs",
    role: UserRole.Board,
  },
  {
    key: "board_active_claims",
    label: "Active Claims",
    icon: "/assets/image/check_icon.svg",
    to: "/board/jobs",
    role: UserRole.Board,
  },
  {
    key: "board_completed_claims",
    label: "Completed Claims",
    icon: "/assets/image/NewWindow_icon.svg",
    to: "/board/jobs",
    role: UserRole.Board,
  },
  {
    key: "board_waiting_offers",
    label: "Waiting Offers",
    icon: "/assets/image/PaymentCard_icon.svg",
    to: "/board/jobs",
    role: UserRole.Board,
  },
  {
    key: "board_apartments",
    label: "Apartments",
    icon: "/assets/image/home_icon.svg",
    to: "/board/jobs",
    role: UserRole.Board,
  },
  {
    key: "board_users",
    label: "Users",
    icon: "/assets/image/people_icon.svg",
    to: "/board/jobs",
    role: UserRole.Board,
  },
];
export const JOB_STATUS = {
  CREATED: "CREATED",
  PENDING: "PENDING",
};

export const JobStatuses = [
  { value: "created", label: "created" },
  { value: "waiting", label: "Waiting for offer" },
  { value: "progress", label: "Work under Progress" },
  { value: "finalize", label: "Request finalisation" },
  { value: "completed", label: "Completed" },
  { value: "board", label: "Sent to Board" },
  { value: "approved", label: "Accepted Job" },
];

export const JobStatusesBoard = [
  { value: "created", label: "Created" },
  { value: "waiting", label: "Waiting for offer" },
  { value: "board", label: "Sent to Board" },
  { value: "approved", label: "Accepted Job" },
  { value: "pending", label: "Sent to Offer" },
  { value: "progress", label: "Work under Progress" },
  { value: "finalize", label: "Request finalisation" },
  { value: "completed", label: "Completed" },
];

export const JobStatusesContractor = [
  { value: "created", label: "Created" },
  { value: "waiting", label: "Waiting for offer" },
  { value: "pending", label: "Sent Offer" },
  { value: "progress", label: "Work under Progress" },
  { value: "finalize", label: "Request finalisation" },
  { value: "completed", label: "Job Completed" },
];

export const QuestionList = [
  {
    id: 1,
    title:
      "Bedriften er et lovlig norsk foretak, registert i Norge. Firmaattest vedlegges.",
  },
  {
    id: 2,
    title:
      "Bedriften er et lovlig norsk foretak, registert i Norge. Firmaattest vedlegges.",
  },
  {
    id: 3,
    title:
      "Bedriften er et lovlig norsk foretak, registert i Norge. Firmaattest vedlegges.",
  },
  {
    id: 4,
    title:
      "Bedriften er et lovlig norsk foretak, registert i Norge. Firmaattest vedlegges.",
  },
  {
    id: 5,
    title:
      "Bedriften er et lovlig norsk foretak, registert i Norge. Firmaattest vedlegges.",
  },
];

export const ContractorList = [
  {
    id: 1,
    name: "Gladys Warren",
    person: "John Anoa",
    phone: "(207) 555-0119",
    status: "Pending",
    attachment: "",
    statusNote: "",
  },
  {
    id: 2,
    name: "Gladys Warren",
    person: "John Anoa",
    phone: "(207) 555-0119",
    status: "Approved",
    attachment: "pdf",
    statusNote: "approved by john doe, at 03/28/2020 as super admin",
  },
  {
    id: 3,
    name: "Gladys Warren",
    person: "John Anoa",
    phone: "(207) 555-0119",
    status: "Approve",
    attachment: "",
    statusNote: "",
  },
  {
    id: 4,
    name: "Gladys Warren",
    person: "John Anoa",
    phone: "(207) 555-0119",
    status: "Pending",
    attachment: "",
    statusNote: "",
  },
  {
    id: 5,
    name: "Gladys Warren",
    person: "John Anoa",
    phone: "(207) 555-0119",
    status: "Canceled",
    attachment: "",
    statusNote: "",
  },
  {
    id: 6,
    name: "Gladys Warren",
    person: "John Anoa",
    phone: "(207) 555-0119",
    status: "Approved",
    attachment: "pdf",
    statusNote: "approved by john doe, at 03/28/2020 as super admin",
  },
];

export const countryList = [
  { text: "United States", value: "us" },
  { text: "Norway", value: "nr" },
  { text: "United Kingdom", value: "uk" },
];

export const clientList = [
  {
    id: 1,
    name: "Gladys Warren",
    person: "John Anoa",
    phone: "(207) 555-0119",
    status: "Manual",
    renewDate: "12 June, 2019",
  },
  {
    id: 2,
    name: "Gladys Warren",
    person: "John Anoa",
    phone: "(207) 555-0119",
    status: "Manual",
    renewDate: "12 June, 2019",
  },
  {
    id: 3,
    name: "Gladys Warren",
    person: "John Anoa",
    phone: "(207) 555-0119",
    status: "Auto",
    renewDate: "12 June, 2019",
  },
  {
    id: 4,
    name: "Gladys Warren",
    person: "John Anoa",
    phone: "(207) 555-0119",
    status: "Manual",
    renewDate: "12 June, 2019",
  },
  {
    id: 5,
    name: "Gladys Warren",
    person: "John Anoa",
    phone: "(207) 555-0119",
    status: "Auto",
    renewDate: "12 June, 2019",
  },
  {
    id: 6,
    name: "Gladys Warren",
    person: "John Anoa",
    phone: "(207) 555-0119",
    status: "Manual",
    renewDate: "12 June, 2019",
  },
];

export const clientType = [
  { text: "Plumber", value: "Plumber" },
  { text: "Employeer", value: "Employeer" },
];

export const adminList = [
  { id: 1, name: "Gladys Warren", mobile: "(207) 555-0119" },
  { id: 2, name: "Gladys Warren", mobile: "(207) 555-0119" },
  { id: 3, name: "Gladys Warren", mobile: "(207) 555-0119" },
  { id: 4, name: "Gladys Warren", mobile: "(207) 555-0119" },
  { id: 5, name: "Gladys Warren", mobile: "(207) 555-0119" },
];

export const contractorData = [
  {
    text: "Bedriften er et lovlig norsk foretak, registert i Norge. Firmaattest vedlegges.",
    status: "yes",
  },
  { text: "Er bedriften godkjent lærebedrift", status: "yes" },
  {
    text: "Bedriften er et lovlig norsk foretak, registert i Norge. Firmaattest vedlegges.",
    status: "no",
  },
  {
    text: "Har bedriften Miljøsertifisering, f.eks Miljøfyrtårn. Oppgi i så fall hvilken:",
    status: "yes",
  },
  {
    text: "Bedriften innehar gyldig ansvarsforsikring. Forsikringsbevis vedlegges.",
    status: "no",
  },
  { text: "Er bedriften registstrert i Startbank.", status: "no" },
  {
    text: "Bedriften er et lovlig norsk foretak, registert i Norge. Firmaattest vedlegges.",
    status: "",
  },
  { text: "All kommunikasjon foregår på norsk", status: "" },
  {
    text: "Bedriften er et lovlig norsk foretak, registert i Norge. Firmaattest vedlegges.",
    status: "",
  },
  {
    text: "Bedriften er et lovlig norsk foretak, registert i Norge. Firmaattest vedlegges.",
    status: "",
  },
  { text: "Er Bedriften godkjent mesterbedrift", status: "" },
  {
    text: "Bedriften er et lovlig norsk foretak, registert i Norge. Firmaattest vedlegges.",
    status: "",
  },
];

export const contractorAttachment = [
  { text: "Legg ved firmaattest" },
  { text: "skatteattest" },
  { text: "forsikringsbevis" },
];

export const contractors = [
  {
    id: "1",
    name: "Dianne Russell",
    position: "ABS as",
    phone: "(262) 555-0131",
    phone: "(262) 555-0131",
    avatar: "/assets/image/avatar.jpg",
    amount: "50,000 kr",
  },
  {
    id: "2",
    name: "Calvine Robertson",
    position: "ABS as",
    phone: "(262) 555-0131",
    email: "kyle@enkelstyrt.no",
    avatar: "/assets/image/avatar.jpg",
    amount: "50,000 kr",
  },
  {
    id: "3",
    name: "Priscilla Williamson",
    position: "ABS as",
    phone: "(262) 555-0131",
    email: "kyle@enkelstyrt.no",
    avatar: "/assets/image/avatar.jpg",
    amount: "50,000 kr",
  },
  {
    id: "4",
    name: "Eduardo Mccoy",
    position: "ABS as",
    phone: "(262) 555-0131",
    email: "kyle@enkelstyrt.no",
    avatar: "/assets/image/avatar.jpg",
    amount: "50,000 kr",
  },
];
