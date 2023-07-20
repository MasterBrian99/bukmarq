import axios from "@/utils/axios";

export type CollectionTree = {
  data: CollectionChild[];
  message: string;
};

export type CollectionChild = {
  id: number;
  name: string;
  children?: CollectionChild[] | null;
  parent_id: number;
};

export const getAllCollections = async (): Promise<CollectionTree> => {
  const res = await axios.get(`collection/tree`);
  return res as unknown as CollectionTree;
};
