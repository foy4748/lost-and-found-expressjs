export type TfoundItemPayload = {
  categoryId: string;
  foundItemName: string;
  description: string;
  location: string;
};

export type TfilterControlObject = {
  foundItemName?: string;
  searchTerm?: string;
};

export type TpaginationControlObject = {
  limit?: number;
  page?: number;
  sortOrder?: 'asc' | 'desc';
  sortBy?: 'foundItemName' | 'category' | 'foundDate';
};
