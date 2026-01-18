export interface Messages {
  to: string;
  text: string;
  html?: string;
  subject?: string;
}

export interface NotificationTransfer {
  send(message: Messages): Promise<void>;
}
