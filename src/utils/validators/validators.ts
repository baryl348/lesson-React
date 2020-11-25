export type ValidatorsType = (value:string)=> string | undefined



export const required:ValidatorsType = (value) => {
    if (value) return undefined;

    return "Field is required";
}

export const maxLengthCreator = (maxLength:number):ValidatorsType => (value) => {
    if (value.length > maxLength) return `Max length is ${maxLength} symbols`;
    return undefined;
}