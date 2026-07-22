import { toast } from "sonner"

export const errorShow = (msg) => {
    toast.error(msg)
}
export const successShow = (msg) => {
    toast.success(msg)
}