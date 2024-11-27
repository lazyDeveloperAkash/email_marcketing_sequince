const InitialNode = ({ data }) => {
    return (
        <div className="p-2 px-4 rounded-lg bg-white border border-gray-300 text-center text-sm shadow-md">
            {data.label}
        </div>
    );
}

export default InitialNode