import { Delivery } from "../models/deliveries.js";

export const updateEmailDeliveryStatus = async (trackId) => {
  await Delivery.update(
    {
      emailDelivered: true,
    },
    {
      where: { id: trackId },
    }
  );
};
