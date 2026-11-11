import { api, ApiError } from "./api";

type Page<T> = { total: number; data: T[] };
export type InvoiceStatus = "unpaid" | "pendingVerification" | "paid" | "cancelled";

// me_009_s row
export type Invoice = {
  invoiceId: string; invoiceNumber: string; invoiceType: "studentTuition" | "tutorCommission"; bookingId: string | null; classSessionId: string | null;
  payerUserId: string; payeeUserId: string; amount: number; commissionFee: number; status: InvoiceStatus; paymentMethod: string | null;
  slipFileId: string | null; dueDate: string | null; paidAt: string | null; createdAt: string;
};

// me_009_g
export type InvoiceDetail = Invoice & {
  billingPeriodStart: string | null; billingPeriodEnd: string | null; commissionRateSnapshot: number | null; verifiedBy: string | null;
  items: { invoiceItemId: string; classSessionId: string; sessionGrossAmount: number; commissionRate: number; commissionAmount: number }[];
};

export const searchInvoices = (invoiceType?: Invoice["invoiceType"]) =>
  api<Page<Invoice>>("/me/invoices/search", { method: "POST", body: { pageSize: 100, invoiceType } });

export const getInvoice = (id: string) => api<InvoiceDetail>(`/me/invoices/${id}/get`);

// me_009_slip_c
export const attachSlip = (invoiceId: string, slipFileId: string) =>
  api<{ invoiceId: string; status: InvoiceStatus; slipFileId: string; paidAt: string }>(`/me/invoices/${invoiceId}/slip/upload`, { method: "POST", body: { slipFileId, paymentMethod: "bankTransfer" } });

// storage_001_c -> PUT to the presigned URL -> storage_002_c. Returns the File id.
export async function uploadFile(file: File, folder: string): Promise<string> {
  const contentType = file.type || "application/octet-stream";
  const { uploadUrl, filePath } = await api<{ uploadUrl: string; filePath: string }>("/storage/presigned-upload", {
    method: "POST", body: { fileName: file.name, contentType, size: file.size, folder },
  });
  let put: Response;
  try { put = await fetch(uploadUrl, { method: "PUT", headers: { "Content-Type": contentType }, body: file }); }
  catch { throw new ApiError(0, "upload_failed", "Could not upload the file. Please try again."); }
  if (!put.ok) throw new ApiError(put.status, "upload_failed", "Could not upload the file. Please try again.");
  const ext = file.name.includes(".") ? file.name.split(".").pop() : null;
  const { fileId } = await api<{ fileId: string }>("/storage/confirm-upload", {
    method: "POST", body: { name: file.name, filePath, size: file.size, type: contentType, fileExtension: ext },
  });
  return fileId;
}

const fmt = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—");
export const dateLabel = fmt;
export const periodLabel = (i: Pick<InvoiceDetail, "billingPeriodStart" | "billingPeriodEnd">) =>
  i.billingPeriodStart && i.billingPeriodEnd ? `${fmt(i.billingPeriodStart)} – ${fmt(i.billingPeriodEnd)}` : "—";
