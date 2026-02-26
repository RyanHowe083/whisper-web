export interface DevIdentity {
  userId: string | null;
  creatorId: string | null;
}

const STORAGE_KEY_USER_ID = "whisper_dev_user_id";
const STORAGE_KEY_CREATOR_ID = "whisper_dev_creator_id";

export function getDevIdentity(): DevIdentity {
  if (typeof window === "undefined") {
    return { userId: null, creatorId: null };
  }

  const params = new URLSearchParams(window.location.search);
  const paramUserId = params.get("dev_user_id");
  const paramCreatorId = params.get("dev_creator_id");

  if (paramUserId) {
    localStorage.setItem(STORAGE_KEY_USER_ID, paramUserId);
  }

  if (paramCreatorId) {
    localStorage.setItem(STORAGE_KEY_CREATOR_ID, paramCreatorId);
  }

  return {
    userId: localStorage.getItem(STORAGE_KEY_USER_ID),
    creatorId: localStorage.getItem(STORAGE_KEY_CREATOR_ID),
  };
}

export function setDevUserId(userId: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_USER_ID, userId);
}

export function setDevCreatorId(creatorId: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_CREATOR_ID, creatorId);
}

export function clearDevIdentity(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY_USER_ID);
  localStorage.removeItem(STORAGE_KEY_CREATOR_ID);
}

export function hasDevIdentity(): boolean {
  if (typeof window === "undefined") return false;
  return (
    localStorage.getItem(STORAGE_KEY_USER_ID) !== null ||
    localStorage.getItem(STORAGE_KEY_CREATOR_ID) !== null
  );
}

