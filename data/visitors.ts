export type Gender = "Male" | "Female";

export interface Visitor {
  id: number;
  name: string;
  email: string;
  country: string;
  gender: Gender;
  age: number;
  avatar: string;
}

export const visitors: Visitor[] = [
  { id: 1,  name: "Devon Lane",       email: "jackson.graham@example.com",  country: "India",          gender: "Male",   age: 41, avatar: "DL" },
  { id: 2,  name: "Leslie Alexander", email: "deanna.curtis@example.com",   country: "US",             gender: "Female", age: 45, avatar: "LA" },
  { id: 3,  name: "Savannah Nguyen",  email: "jessica.hanson@example.com",  country: "US",             gender: "Female", age: 43, avatar: "SN" },
  { id: 4,  name: "Bessie Cooper",    email: "michael.mitc@example.com",    country: "Australia",      gender: "Male",   age: 38, avatar: "BC" },
  { id: 5,  name: "Shiloh Garner",    email: "bill.sanders@example.com",    country: "Australia",      gender: "Female", age: 35, avatar: "SG" },
  { id: 6,  name: "Jacob Jones",      email: "felicia.reid@example.com",    country: "New Zealand",    gender: "Female", age: 37, avatar: "JJ" },
  { id: 7,  name: "Jerome Bell",      email: "tim.jennings@example.com",    country: "US",             gender: "Male",   age: 44, avatar: "JB" },
  { id: 8,  name: "Kristin Watson",   email: "willie.jennings@example.com", country: "Ireland",        gender: "Female", age: 36, avatar: "KW" },
  { id: 9,  name: "Brooklyn Simmons", email: "georgia.young@example.com",   country: "United Kingdom", gender: "Male",   age: 39, avatar: "BS" },
  { id: 10, name: "Cody Fisher",      email: "kenzi.lawson@example.com",    country: "Ireland",        gender: "Female", age: 42, avatar: "CF" },
  { id: 11, name: "Courtney Henry",   email: "nevaeh.simmons@example.com",  country: "Japan",          gender: "Male",   age: 34, avatar: "CH" },
  { id: 12, name: "Dianne Russell",   email: "nathan.roberts@example.com",  country: "Brazil",         gender: "Female", age: 40, avatar: "DR" },
  { id: 13, name: "Guy Hawkins",      email: "debbie.baker@example.com",    country: "Canada",         gender: "Male",   age: 29, avatar: "GH" },
  { id: 14, name: "Arlene McCoy",     email: "floyd.miles@example.com",     country: "Germany",        gender: "Female", age: 33, avatar: "AM" },
  { id: 15, name: "Ralph Edwards",    email: "alma.lawson@example.com",     country: "France",         gender: "Male",   age: 47, avatar: "RE" },
  { id: 16, name: "Theresa Webb",     email: "esther.howard@example.com",   country: "Italy",          gender: "Female", age: 31, avatar: "TW" },
  { id: 17, name: "Cameron Williamson", email: "jenny.wilson@example.com",  country: "Mexico",         gender: "Male",   age: 52, avatar: "CW" },
  { id: 18, name: "Eleanor Pena",     email: "robert.fox@example.com",      country: "Spain",          gender: "Female", age: 38, avatar: "EP" },
  { id: 19, name: "Wade Warren",      email: "ronald.richards@example.com", country: "Nigeria",        gender: "Male",   age: 44, avatar: "WW" },
  { id: 20, name: "Kathryn Murphy",   email: "jacob.jones@example.com",     country: "South Africa",   gender: "Female", age: 36, avatar: "KM" },
];

export const visitorStats = [
  { icon: "visitors", label: "Total Visitors", value: "$30,000", change: 35, context: "vs Last month" },
  { icon: "male",     label: "Male",           value: "65.3k",   change: 35, context: "vs Last month" },
  { icon: "female",   label: "Female",         value: "75%",     change: 35, context: "vs Last month" },
];
