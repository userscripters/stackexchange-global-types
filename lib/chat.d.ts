declare global {
    namespace CHAT {
        interface User {
            /** Get whether the current user can kick others out of the room */
            canKick(): boolean;
            /** Get whether the current user has moderator privileges */
            canModerate(): boolean;
            /**
             * Get whether the current user has moderator privileges. See
             * {@link https://meta.stackexchange.com/q/258038|What is a 'superping'?}
             */
            canSuperPing(): boolean;
            /** Get whether the current user can talk during a timeout */
            canTalkDuringTimeout(): boolean;
            /** Get the current user's name */
            getName(): string;
            /** Get whether the current user is logged in */
            isLoggedIn(): boolean;
            /** Get whether the current user is a room owner */
            isOwner(): boolean;
        }

        interface UserInformation {
            /** The user's id */
            id: number;
            /** The user's name */
            name: string;
            /** The user's email hash */
            email_hash: string;
            /** The user's reputation */
            reputation: number;
            /** Whether the user is a moderator */
            is_moderator: boolean;
            /** Whether the user can moderate */
            can_moderate: boolean;
            /** Whether the user is a RO */
            is_owner: boolean;
            /** The date the user last posted (Unix epoch time in seconds) */
            last_post: number | null;
            complete: boolean;
            /** The last time the server was updated (Unix epoch time in seconds) */
            last_server_refresh: number;
            /** Whether the user is present in the current room */
            is_present: boolean;
            /** Last time the user was seen (Unix epoch time in seconds) */
            last_seen: number | null;
        }

        interface RoomUsersInfo {
            // not all of those return UserInformation[] - SE has created its own class, Generator
            // which implements most of the array methods
            /** Get all pingable users */
            all(): UserInformation[];
            /** Get all pingable users, includings those whose "complete" value is false */
            allIncludeIncomplete(): UserInformation[];
            /** Get all present users */
            allPresent(): UserInformation[];
            /**
             * Get the avatar image of a particular user as a jQuery object
             * @param userId The user's id
             * @param imageSize The size of the image
             */
            createAvatarImage(userId: number, imageSize: number): JQuery;
            /** Information about the current user */
            current(): UserInformation;
            /**
             * Update a particular user's information from server
             * @param userId The user's id
             */
            forceUpdate(userId: number): void;
            /**
             * Update a particular user's information from server only if necessary
             * @param userId The user's id
             */
            forceUpdateIfNecessary(userId: number): void;
            /**
             * Get information about a particular user
             * @param userId The user's id
             */
            get(userId: number): Promise<UserInformation>;
            /**
             * Get information about a particular user only if it's already been fetched
             * @param userId The user's id
             */
            getIfAvailable(userId: number): UserInformation | void;
            /**
             * Request information from server about a user that has just joined
             */
            initPresent(): void;
            /** Update list of pingable users */
            initializeLate(element: JQuery): void;
            /** Load all pingable users and update cached information */
            loadPingables(): void;
            /**
             * Get the monologue signature of a particular user
             * @param userId The user's id
             */
            monologueSignature(userId: number): JQuery;
            // on(): void; // adds the given callback to $.Callbacks() ??
            /** Get all pingable users, includings those whose "complete" value is false */
            pingableUsersIncludeIncomplete(): UserInformation[];
            /**
             * Update a user's activity information in the sidebar
             * @param userId The user's id
             * @param username The user's name
             * @param isUserJoining Whether the user has just joined
             * @param dateSeconds The Unix epoch time in seconds
             * @param emailHash The user's email hash
             */
            sidebarActivity(
                userId: number,
                username: string,
                isUserJoining: boolean,
                dateSeconds: number,
                emailHash: string
            ): void;
            /**
             * Trigger the remove effect on a user currently present in the room
             * @param userId The user's id
             */
            sidebarLeave(userId: number): void;
            /**
             * Fire a callback from ROOM_USERS_HANDLERS
             * @param callbackName The callback's name
             */
            trigger(callbackName: string): void;
            // update(): unknown;
            /**
             * Update all containers for the given user from server, using the ".user-container.user-<userId>" selector
             * @param userInformation The user information object
             */
            updateAllUserContainersFor(userInformation: UserInformation): void;
            /**
             * Update the given user container information from server
             * @param userContainer The user container jQuery object
             */
            updateUserContainer(userContainer: JQuery): void;
        }

        // TODO expand on those
        interface NewEvent {
            /** The event id */
            event_type: number;
            /** The message content as HTML */
            content?: string;
            id: number;
            /** The message id */
            message_id: number;
            /** The room id the event happened */
            room_id: number;
            /** The name of the room the event happened */
            room_name: string;
            /** When the event was triggered (Unix epoch time in seconds) */
            time_stamp: number;
            /** The id of the user that triggered the event */
            user_id: number;
            /** The name of the user that triggered the event */
            user_name: string;
            /** The number of times the message has been edited */
            message_edits?: number;
            /** The message to which the current one replies */
            parent_id?: number;
            show_parent?: boolean;
        }

        /** The id of the current chat room */
        const CURRENT_ROOM_ID: number;
        /** The id of the current user */
        const CURRENT_USER_ID: number;
        /** Whether or not the current chat room is a "live chat room" */
        const IS_LIVE_CHAT: boolean;
        /** Whether the user is on mobile */
        const IS_MOBILE: boolean;
        /** The user id of the host of the "live chat room" (0 if IS_LIVE_CHAT is false) */
        const LIVE_CHAT_HOST_ID: number;

        /** Information about the current room users */
        const RoomUsers: RoomUsersInfo;
        /**
         * Add the given callback to a list. Callbacks are fired on a new event
         * @param callback The callback to add
         */
        const addEventHandlerHook: (
            callback: (
                eventInfo: NewEvent,
                value1: boolean,
                value2: number
            ) => void
        ) => void;
        /** Get the list of callbacks */
        const getEventHandlerHooks: () => Array<
            (eventInfo: NewEvent, value1: boolean, value2: number) => void
        >;
        /** Information about the current user */
        const user: User;
        /** Input hint helpers */
        const inputHint: {
            /**
             * Show the input hint bubble
             * @param content The bubble's HTML content
             * @param buttonText The primary button's text content
             * @param setPrefValue The value of the data-set-pref attribute
             */
            show(
                content: string,
                buttonText: string,
                setPrefValue: number
            ): void;
        };

        /**
         * Toggle mobile view
         * @param state The new state
         */
        const switchMobile: (state: "on" | "off") => void;
    }
}

export {};
