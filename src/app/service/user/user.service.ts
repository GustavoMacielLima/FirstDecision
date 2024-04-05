import { UserModel } from "./user.model";

export class UserService {
    create(user: UserModel){
        const newUser: UserModel = new UserModel();
        Object.assign(newUser, user);
        newUser.id = new Date().valueOf().toString();
        newUser.dataCriacao = new Date().toISOString();

        const users: Array<UserModel> = this.get();
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
    }

    get(
        pagination: number|null = null,
        rows: number|null = null,
        filter: Array<string>|null = null,
        searchtext: string = ''
    ){
        const users: string|null = localStorage.getItem('users');
        if (!users) return [];

        const usersArray: Array<UserModel> = JSON.parse(users);
        let filteredUsers: Array<UserModel> = JSON.parse(users);
        
        if(filter?.length){
            filteredUsers = filteredUsers.filter((user:UserModel) => {
                return filter?.indexOf(user.status) > -1;
            });
        }

        if(searchtext){
            filteredUsers = filteredUsers.filter((user:UserModel) => {
                return (user.email.indexOf(searchtext) > -1 || ((user.nome + ' ' + user.sobrenome).indexOf(searchtext) > -1));
            });
        }

        if (pagination && rows){
            return filteredUsers.slice((pagination - 1) * rows, pagination * rows);
        }
        return filteredUsers;
    }

    getTotalPages(rows: number){
        const users: Array<UserModel> = this.get();
        
        if (!users.length) return 0;

        const isMultiple: number = users.length % rows;
        const totalPages: number = isMultiple === 0 ? users.length / rows : (Math.trunc(users.length / rows)) + 1;
        return totalPages;
    }

    update(updateUser: UserModel){
        const users: Array<UserModel> = this.get();
        users.forEach((user: UserModel) => {
            if(user.id === updateUser.id){
                Object.assign(user,updateUser);
            }
        });

        localStorage.setItem('users', JSON.stringify(users));
    }

    delete(userDelete: UserModel){
        const users: Array<UserModel> = this.get().filter((user: UserModel) => {
            return user.id !== userDelete.id;
        });

        localStorage.setItem('users', JSON.stringify(users));
    }
}