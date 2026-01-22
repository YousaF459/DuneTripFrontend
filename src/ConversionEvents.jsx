import ReactPixel from "react-facebook-pixel";
import { v4 as uuidv4 } from "uuid";
import axiosApi from "./Components/Axios/Axios";

export const sendConversionEvent = async ({ event, content_name, value, currency, email }) => {
  const eventId = uuidv4();

  // 1️⃣ Fire browser pixel
  ReactPixel.track(event, { content_name, value, currency }, { eventID: eventId });

  // 2️⃣ Send to backend (CAPI)
  try {
    await axiosApi.post("track-conversion/", {
  event,
  event_id: eventId,
  content_name,
  value,
  currency,
  email,
});
    
  } catch (err) {
    console.error("Conversion API error:", err);
  }
};
