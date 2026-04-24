export default function Container({ children }) {
    return (
        <div className="mx-auto mt-7.5 max-w-330 w-full">
            {children}
        </div>
    );
}