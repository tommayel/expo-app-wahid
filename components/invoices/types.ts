export interface InvoiceItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  id: number;
  amount: number;
  date: string;
  customer: {
    name: string;
    email: string;
    companyId: string;
    address: string;
  };
  items: InvoiceItem[];
}
