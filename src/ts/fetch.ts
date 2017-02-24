type OnSuccess = (body: string) => void;

const failureHandler = (status: number, body: string) => {
    console.error(status);
    console.error(body);
};

const ajax = (url: string, onSuccess: OnSuccess, onFailure: Function = failureHandler) => {

    fetch(url).then(response => {
        console.log(response.status);
        console.log(response.statusText);

        if (response.ok) {
            response.text().then(onSuccess);
        } else {
            onFailure(response.status, response.statusText);
        }
    });

};

export default ajax;
