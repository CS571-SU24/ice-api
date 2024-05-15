export class CS571UserService {

    private credentialMap: any;

    public constructor(credentialMap: any) {
        this.credentialMap = Object.keys(credentialMap).reduce((acc: any, curr: string) => {
            acc[curr.toLowerCase()] = credentialMap[curr];
            return acc;
        }, {})
    }

    public isValid(username: string, password: string) {
        if (username && password) {
            if (Object.keys(this.credentialMap).includes(username.toLowerCase())) {
                if (this.credentialMap[username] === password) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

}
