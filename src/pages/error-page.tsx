import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error: any = useRouteError();
    console.error(error);

    return (
        <div id="error-page" className="flex items-center justify-center h-[100vh] w-full text-center">
            <div>
                <h1 className="text-[7vw]">Oops!</h1>
                <p className="text-3xl mb-4">Sorry, an unexpected error has occurred.</p>
                <p>
                    <i className="text-red-600 font-bold text-2xl">{error.statusText || error.message}</i>
                </p>
            </div>
        </div>
    );
}

export default ErrorPage;