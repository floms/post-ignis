enum HttpRequestType {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

class HttpHeader {
    constructor(public name: string, public value: string) {}
}


export {HttpHeader, HttpRequestType};