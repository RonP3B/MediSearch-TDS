import MediSearchApi from "../../APIs/MediSearchApi";

const CHAT_ENDPOINT = import.meta.env.VITE_MEDISEARCH_CHAT;
const CHATS_ENDPOINT = import.meta.env.VITE_MEDISEARCH_CHATS;
const SEND_MSG_ENDPOINT = import.meta.env.VITE_MEDISEARCH_SEND_MSG;

export const getChat = (id) => {
  return MediSearchApi.get(`${CHAT_ENDPOINT}/${id}`);
};

export const getChats = () => {
  return MediSearchApi.get(CHATS_ENDPOINT);
};

export const sendMessage = (values) => {
  const formData = new FormData();

  Object.keys(values).forEach((key) => {
    formData.append(key, values[key]);
  });

  return MediSearchApi.post(SEND_MSG_ENDPOINT, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
