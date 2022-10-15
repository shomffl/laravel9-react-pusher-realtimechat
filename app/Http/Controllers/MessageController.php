<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Message;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index(User $user)
    {
        return Inertia("Message/Index", ["users" => $user->get()]);
    }

    public function show($user_id)
    {
        $messages = Message::where([["sender_id", auth()->id()],["reciever_id", $user_id]])
            ->orWhere([["sender_id", $user_id], ["reciever_id", auth()->id()]])
            ->orderBy("created_at","asc")->get();

        return Inertia("Message/Show", ["reciever_id" => $user_id, "messages" => $messages]);
    }

    public function store(Request $request, Message $message)
    {
        $input = $request->all();
        $input += ["sender_id" => auth()->id()];
        $message->fill($input)->save();
        return redirect(route("messages.show", $input["reciever_id"]));
    }
}
