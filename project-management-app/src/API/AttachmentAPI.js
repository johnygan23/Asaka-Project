const ATTACHMENT_API_URL = "http://localhost:5179/api/Attachment"; // Change port if needed

export const getAllAttachments = async () => {
  const response = await fetch(ATTACHMENT_API_URL);
  if (!response.ok) throw new Error("Failed to fetch attachments");
  return await response.json();
};

export const getAttachmentById = async (AttachmentId) => {
  const response = await fetch(`${ATTACHMENT_API_URL}/${AttachmentId}`);
  if (!response.ok) throw new Error("Failed to fetch attachment");
  return await response.json();
};

export const uploadAttachment = async (projectTaskId, file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${ATTACHMENT_API_URL}/${projectTaskId}/upload`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) throw new Error("Failed to upload attachment");
  return await response.json();
};

export const downloadAttachment = async (attachmentId) => {
  const response = await fetch(`${ATTACHMENT_API_URL}/${attachmentId}/download`);
  if (!response.ok) throw new Error("Failed to download attachment");
  // Returns a Blob for file download
  return await response.blob();
};

export const deleteAttachment = async (attachmentId) => {
  const response = await fetch(`${ATTACHMENT_API_URL}/${attachmentId}/delete`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete attachment");
  return true;
};