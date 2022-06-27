export interface Conversation {
  id: string;
  conversation: Array<TextConversation>;
}

export interface TextConversation {
  user: string;
  msgs: Array<string>;
  date: Date;
  id: string;
}
