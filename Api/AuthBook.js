import client, { BaseUrl } from "./clientApi";

class AuthBook {
    GetBook() {

        const postLogin = client
            .get(BaseUrl)
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return err;
            });
        return postLogin;
    }
    GetIDBook(id) {

        const postLogin = client
            .get(BaseUrl + id)
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return err;
            });
        return postLogin;
    }
    putBook(id, obg) {

        const postLogin = client
            .put(BaseUrl + id, obg)
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return err;
            });
        return postLogin;
    }

}

export default new AuthBook();