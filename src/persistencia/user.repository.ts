type user  = {
id: number
name: string;
email: string;
password: string;
};


const users: user [] = [];

export const createUser = (User: user) => {
users.push(User);
return users

};

export const FindUserbyEmail = (email: string) => {

    return users.find((u) => u.email === email);

};
