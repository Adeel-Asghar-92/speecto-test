import { toast } from "sonner";

export function toastSuccess(title: string) {
  toast.success(title, {
    cancel: { label: "✕", onClick: () => toast.dismiss() },
    classNames: {
      toast: "!bg-green-700 !text-white !font-inter",
      cancelButton: "!text-white !bg-transparent",
    },
  });
}

export function toastError(title: string) {
  toast.error(title, {
    cancel: { label: "✕", onClick: () => toast.dismiss() },
    classNames: {
      toast: "!bg-red-700 !text-white !font-inter",
      cancelButton: "!text-white !bg-transparent",
    },
  });
}

export function toastWarn(title: string) {
  toast.error(title, {
    cancel: { label: "✕", onClick: () => toast.dismiss() },
    classNames: {
      toast: "!bg-yellow-700 !text-white !font-inter",
      cancelButton: "!text-white !bg-transparent",
    },
  });
}
