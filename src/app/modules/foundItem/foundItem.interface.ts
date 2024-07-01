export type TfoundItemPayload = {
  id: string;
  categoryId: string;
  foundItemName: string;
  description: string;
  location: string;
  isItemFound?: boolean;
  photoUrl?: string;
};
export type TfoundItemUpdatePayload = {
  id?: string;
  categoryId?: string;
  foundItemName?: string;
  description?: string;
  location?: string;
  isItemFound?: boolean;
  photoUrl?: string;
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

export type TReportFoundBy = {
  foundItemId: string;
};
