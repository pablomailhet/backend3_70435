const errors = {
    client: { message: "Bad Request", statusCode: 400 },
    auth: { message: "Bad auth", statusCode: 401 },
    forbidden: { message: "Forbidden", statusCode: 403 },
    notFound: { message: "Not found", statusCode: 404 },
    fatal: { message: "Fatal error", statusCode: 500 },
};

export default errors;
