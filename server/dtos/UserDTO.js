export default class UserDTO {
    id;
    username;
    firstname;
    secondname;
    email;
    avatar;
    description;
    roles;
    isActivated;

    constructor({
                    _id,
                    username,
                    firstname,
                    secondname,
                    email,
                    avatar,
                    description,
                    roles,
                    isActivated
                })
    {
        this.id = _id;
        this.username = username;
        this.firstname = firstname;
        this.secondname = secondname;
        this.email = email;
        this.avatar = avatar;
        this.description = description;
        this.roles = roles;
        this.isActivated = isActivated;
    }
}
