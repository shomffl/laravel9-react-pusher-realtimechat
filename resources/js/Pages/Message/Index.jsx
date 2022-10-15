import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

const Index = (props) => {
    const { users } = props;

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Index
                </h2>
            }
        >
            <Head title="Index" />
            <div className="flex flex-col gap-4 py-12 px-10 m-10">
                {users.map((user) => (
                    <div key={user.id}>
                        {props.auth.user.id != user.id ? (
                            <div className="flex items-center justify-between py-4 px-10 rounded bg-white shadow uppercase">
                                {user.name}
                                <button
                                    onClick={(e) =>
                                        Inertia.get(
                                            route("messages.show", user.id)
                                        )
                                    }
                                    className="px-3 py-1 text-white bg-red-500 rounded border-b-4 border-red-700 hover:text-gray-300 active:border-opacity-10 active:scale-95"
                                >
                                    chat
                                </button>
                            </div>
                        ) : null}
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
