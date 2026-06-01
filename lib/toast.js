import toast from 'react-hot-toast'

export const errorShow = (msg) => {
    toast.error(msg)
}
export const successShow = (msg) => {
    toast.success(msg)
}