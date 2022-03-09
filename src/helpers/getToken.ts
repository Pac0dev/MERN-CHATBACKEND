import jwt from "jsonwebtoken";

const getToken = (_id: string) => {
    const payload = {
        "_id": _id,
    };

    const token = jwt.sign(payload, process.env.SECRET_SEED as string, {
        expiresIn: 3600 * 2,
    });
    return token;
};

export default getToken;
