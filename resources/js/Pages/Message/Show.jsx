import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import moment from "moment/moment";

const Show = (props) => {
    const { reciever_id, messages } = props;
    const { data, setData, post } = useForm("MessageShow", {
        message: "",
        reciever_id: reciever_id,
    });

    const handleSendMessage = (e) => {
        e.preventDefault();
        post(route("messages.store"));
        setData("message", "");
    };

    const formatingCreatedAt = (createdAt) => {
        const beforeDate = moment(
            messages[0].created_at,
            "YYYY-MM-DD HH:mm:ss"
        );
        return beforeDate.format("YYYY年MM月DD日 HH:mm");
    };

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Show
                </h2>
            }
        >
            <Head title="Show" />
            <div className="py-12 px-10 h-[600px]">
                <div className="bg-white h-full overflow-y-scroll shadow-lg p-3 mb-10 ">
                    {messages.map((message) => (
                        <div key={message.id}>
                            {message.sender_id == props.auth.user.id ? (
                                <div className="flex items-center gap-1">
                                    <div className="w-max px-4 py-1 my-2 rounded bg-green-400">
                                        {message.message}
                                    </div>
                                    <div className="text-xs">
                                        {formatingCreatedAt(message.created_at)}
                                    </div>
                                    <div className="w-full"></div>
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <div className="w-full"></div>
                                    <div className="text-xs">
                                        {formatingCreatedAt(message.created_at)}
                                    </div>
                                    <div className="w-max px-4 py-1 my-2 rounded bg-white border border-gray-400">
                                        {message.message}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <form
                    className="flex w-full justify-between gap-3"
                    onSubmit={handleSendMessage}
                >
                    <textarea
                        className="w-full bg-white border border-black rounded"
                        value={data.message}
                        onChange={(e) => setData("message", e.target.value)}
                    />
                    <button
                        type="submit"
                        className="text-white bg-green-400 px-4 rounded border-b-4 border-green-600 active:scale-95 active:border-opacity-10"
                    >
                        ✔️
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
