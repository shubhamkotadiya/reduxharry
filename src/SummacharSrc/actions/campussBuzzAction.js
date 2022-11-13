export const setData = (data) => {
    return {
        type: "SET_DATA",
        value: data
    }
}
export const setDataAndLink = (data, next) => {
    return {
        type: "SET_DATA_AND_NEXT_LINK",
        value: { data: data, next: next }
    }
}