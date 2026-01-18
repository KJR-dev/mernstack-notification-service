import { MailTransport } from "../mail";
import { NotificationTransfer } from "../types/notification-types";

const transports: NotificationTransfer[] = [];

export const createNotificationTransport = (
  type: "mail" | "sms",
): NotificationTransfer => {
  switch (type) {
    case "mail": {
      const requiredTransportCache = transports.find(
        (transports) => transports instanceof MailTransport,
      );
      if (requiredTransportCache) return requiredTransportCache;
      const instance = new MailTransport();
      transports.push(instance);
      return instance;
    }
    case "sms":
      throw new Error("SMS notification is not supported");

    default:
      throw new Error(`${type} Notification provider is not supported`);
  }
};
