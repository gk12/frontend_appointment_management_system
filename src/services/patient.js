import { axiosInstance } from "../utils/axiosConfig";

export async function myAppointmentsList({ pageNo = 1 }) {
  const myAppointmentlist = await axiosInstance.get(
    `api/patient/showMyAppointment?pageNo=${pageNo}`
  );
  const { myAppointments, totalPages } = myAppointmentlist.data;
  return { myAppointments, totalPages };
}
