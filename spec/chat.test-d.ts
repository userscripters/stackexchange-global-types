import { expectError, expectType } from "tsd";
import CHAT, { UserInformation } from "../lib/chat.js";

expectType<boolean>(CHAT.user.canTalkDuringTimeout());

expectType<string>(CHAT.user.getName());

expectType<number>(CHAT.LIVE_CHAT_HOST_ID);

expectType<boolean>(CHAT.IS_MOBILE);

expectType<Promise<UserInformation>>(CHAT.RoomUsers.get(1));

expectType<void>(CHAT.RoomUsers.forceUpdate(1));

expectType<void>(
    CHAT.RoomUsers.sidebarActivity(
        1,
        "Jeff Atwood",
        true,
        Date.now() / 1000,
        "abcd"
    )
);

expectType<UserInformation[]>(CHAT.RoomUsers.all());

expectType<JQuery<HTMLElement>>(CHAT.RoomUsers.createAvatarImage(1, 8));

const exampleUser = CHAT.RoomUsers.current();
expectType<UserInformation>(exampleUser);

expectType<string>(exampleUser.email_hash);

expectType<number>(exampleUser.id);

expectType<string>(exampleUser.name);

expectType<number>(exampleUser.reputation);

expectType<boolean>(exampleUser.is_moderator);

expectType<boolean>(exampleUser.is_owner);

expectError(CHAT.inputHint.show("content", "I'm done", "abc"));

expectType<void>(CHAT.switchMobile("on"));

expectError(CHAT.switchMobile("enable"));

expectType<void>(
    CHAT.addEventHandlerHook((event, value1, value2) => {
        expectType<number>(event.id);
        expectType<number>(event.message_id);
        expectType<string>(event.user_name);
        expectType<boolean | undefined>(event?.show_parent);

        expectType<boolean>(value1);
        expectType<number>(value2);
    })
);
