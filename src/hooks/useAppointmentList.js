import { useQuery } from "@tanstack/react-query";
import { myAppointmentsList } from "../services/patient";

export function useAppointmentList(pageNo) {
  return useQuery({
    queryKey: ["appointments", pageNo],
    queryFn: () => myAppointmentsList({ pageNo }),
  });
}
