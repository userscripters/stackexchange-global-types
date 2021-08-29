// $ExpectType boolean
CHAT.user.canTalkDuringTimeout();

// $ExpectType string
CHAT.user.getName();

// $ExpectType number
CHAT.LIVE_CHAT_HOST_ID;

// $ExpectType boolean
CHAT.IS_MOBILE;

// $ExpectType Promise<UserInformation>
CHAT.RoomUsers.get(1);

// $ExpectType void
CHAT.RoomUsers.forceUpdate(1);

// $ExpectType void
CHAT.RoomUsers.sidebarActivity(1, "Jeff Atwood", true, Date.now() / 1000, "abcd");

// $ExpectType UserInformation[]
CHAT.RoomUsers.all();

// $ExpectType JQuery<HTMLElement>
CHAT.RoomUsers.createAvatarImage(1, 8);

const exampleUser = CHAT.RoomUsers.current();
// $ExpectType UserInformation
exampleUser;

// $ExpectType string
exampleUser.email_hash;

// $ExpectType number
exampleUser.id;

// $ExpectType string
exampleUser.name;

// $ExpectType number
exampleUser.reputation;

// $ExpectType boolean
exampleUser.is_moderator;

// $ExpectType boolean
exampleUser.is_owner;

// $ExpectError
CHAT.inputHint.show("content", "I'm done", "abc");

// $ExpectType void
CHAT.switchMobile("on");

// $ExpectError
CHAT.switchMobile("enable");

// $ExpectType void
CHAT.addEventHandlerHook((event, value1, value2) => {
    // $ExpectType number
    event.id;
    // $ExpectType number
    event.message_id;
    // $ExpectType string
    event.user_name;
    // $ExpectType boolean | undefined
    event?.show_parent;

    // $ExpectType boolean
    value1;
    // $ExpectType number
    value2;
});
