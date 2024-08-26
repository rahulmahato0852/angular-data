export interface User {
    name: string,
    age: number
}
const data: User[] = [];

export const getData = (): User[] => {
    return data
}

export const addData = (arg: User) => {
    data.push(arg);
}
export const deleteData = (arg: User) => {
    const inx = data.findIndex(item => item.age === arg.age);
    data.slice(inx, 1);
}



