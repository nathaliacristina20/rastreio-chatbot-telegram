export interface MessageFromChat {
  chat: {
    id: string;
  };
  text: string;
  from: {
    first_name: string;
  };
}