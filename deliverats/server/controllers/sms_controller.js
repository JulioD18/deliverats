import { Delivery } from "../models/deliveries.js";

export const updateSmsDeliveryStatus = async (trackId) => {
  await Delivery.update(
    {
      smsDelivered: true,
    },
    {
      where: { id: trackId },
    }
  );
};
