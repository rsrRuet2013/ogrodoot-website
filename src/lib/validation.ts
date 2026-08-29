import { isSubTeam } from "@/lib/subteams";
import { isMemberType, isPosition } from "@/lib/member-options";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL = /^https:\/\/(www\.)?linkedin\.com\/.+/i;
const STUDENT_ID_REGEX = /^\d{7}$/;

export type RegistrationValues = { 
  name: string; 
  studentId: string; 
  email: string; 
  mobile: string; 
  password: string; 
  subTeam: string; 
  memberType: string; 
  position: string; 
  linkedin: string; 
};

export function validateRegistration(values: RegistrationValues) {
  if (values.name.trim().length < 2 || values.name.trim().length > 100) {
    return "Enter a name between 2 and 100 characters.";
  }
  if (!STUDENT_ID_REGEX.test(values.studentId.trim())) {
    return "Student ID must be exactly a 7-digit number (e.g. 1908001).";
  }
  if (!EMAIL.test(values.email.trim())) {
    return "Enter a valid email address.";
  }
  if (values.mobile.trim().length < 7 || values.mobile.trim().length > 25) {
    return "Enter a valid mobile number.";
  }
  if (values.password.length < 8) {
    return "Password must be at least 8 characters.";
  }
  if (!isSubTeam(values.subTeam)) {
    return "Choose a valid sub-team.";
  }
  if (!isMemberType(values.memberType)) {
    return "Choose whether you are a current student or alumni.";
  }
  if (!isPosition(values.position)) {
    return "Choose a valid position.";
  }
  
  if (values.linkedin && !URL.test(values.linkedin)) {
    return "LinkedIn must be a valid linkedin.com URL.";
  }
  return null;
}
