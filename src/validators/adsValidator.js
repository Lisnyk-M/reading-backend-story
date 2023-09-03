
module.exports = adsValidator = async (data, schema) => {
    try {
        const {value, error} = await schema.validate(data);

        if (error) {
            return error.message;
        }
    }
    catch (err) {
        console.log("catch error: ", err);
    }
}