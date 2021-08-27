import "@stackoverflow/stacks/dist/js/stacks.js";
import "jquery";

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
            createAvatarImage(
                userId: number,
                imageSize: number
            ): JQuery;
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
        const addEventHandlerHook: (callback: (eventInfo: NewEvent, value1: boolean, value2: number) => void) => void;
        /** Get the list of callbacks */
        const getEventHandlerHooks: () => Array<(eventInfo: NewEvent, value1: boolean, value2: number) => void>;
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

    namespace Stacks {
        type BasicPlacement = "auto" | "top" | "right" | "bottom" | "left";
        // Minimum TypeScript Version: 4.1
        type AllPlacements =
            | BasicPlacement
            | `${BasicPlacement}-start`
            | `${BasicPlacement}-end`;

        class ModalController extends StacksController {
            /** Toggles the visibility of the modal */
            toggle(dispatcher?: Event | Element | null): void;
            /** Shows the modal */
            show(dispatcher?: Event | Element | null): void;
            /** Hides the modal */
            hide(dispatcher?: Event | Element | null): void;
        }

        /**
         * Helper to manually show an s-modal element via external JS
         * @param element the element the `data-controller="s-modal"` attribute is on
         */
        function showModal(element: HTMLElement): void;
        /**
         * Helper to manually hide an s-modal element via external JS
         * @param element the element the `data-controller="s-modal"` attribute is on
         */

        function hideModal(element: HTMLElement): void;
        /**
         * Helper to manually show an s-modal element via external JS
         * @param element the element the `data-controller="s-modal"` attribute is on
         * @param show whether to force show/hide the modal; toggles the modal if left undefined
         */
        function toggleModal(element: HTMLElement, show?: boolean): void;

        abstract class BasePopoverController extends StacksController {
            /** Returns true if the if the popover is currently visible */
            isVisible: boolean;
            /** Gets whether the element is visible in the browser's viewport */
            isInViewPort: boolean;

            /** Toggles the visibility of the popover */
            toggle(dispatcher?: Event | Element | null): void;
            /** Shows the popover if not already visible */
            show(dispatcher?: Event | Element | null): void;
            /** Hides the popover if not already hidden */
            hide(dispatcher?: Event | Element | null): void;
        }

        class PopoverController extends BasePopoverController {}

        interface PopoverOptions {
            /** When true, the `click->s-popover#toggle` action will be attached to the controller element or reference element */
            toggleOnClick?: boolean;
            /** When set, `data-s-popover-placement` will be set to this value on the controller element */
            placement?: AllPlacements;
            /** When true, the popover will appear immediately when the controller connects */
            autoShow?: boolean;
        }

        interface GetPopoverResult {
            /** Indicates whether or not the element has s-popover in its `data-controller` class */
            isPopover: boolean;
            /** Returns the element's existing `PopoverController` or null if it has not been configured yet */
            controller: PopoverController | null;
            /** Returns the popover's reference element as would live in `referenceSelector` or null if it is invalid */
            referenceElement: Element | null;
            /** Returns the popover currently associated with the controller, or null if one does not exist in the DOM */
            popover: HTMLElement | null;
        }

        /**
         * Helper to manually show an s-popover element via external JS
         * @param element the element the `data-controller="s-popover"` attribute is on
         */
        function showPopover(element: HTMLElement): void;
        /**
         * Helper to manually hide an s-popover element via external JS
         * @param element the element the `data-controller="s-popover"` attribute is on
         */
        function hidePopover(element: Element): void;
        /**
         * Attaches a popover to an element and performs additional configuration.
         * @param element the element that will receive the `data-controller="s-popover"` attribute.
         * @param popover an element with the `.s-popover` class or HTML string containing a single element with the `.s-popover` class.
         *                If the popover does not have a parent element, it will be inserted as a immediately after the reference element.
         * @param options an optional collection of options to use when configuring the popover.
         */
        function attachPopover(
            element: Element,
            popover: Element | string,
            options?: PopoverOptions
        ): void;
        /**
         * Removes the popover controller from an element and removes the popover from the DOM.
         * @param element the element that has the `data-controller="s-popover"` attribute.
         * @returns The popover that was attached to the element.
         */
        function detachPopover(element: Element): GetPopoverResult["popover"];
        /**
         * Gets the current state of an element that may be or is intended to be an s-popover controller
         * so it can be configured either directly or via the DOM.
         * @param element An element that may have `data-controller="s-popover"`.
         */
        function getPopover(element: Element): GetPopoverResult;
        /**
         * Adds or removes the controller from an element's [data-controller] attribute without altering existing entries
         * @param el The element to alter
         * @param controllerName The name of the controller to add/remove
         * @param include Whether to add the controllerName value
         */
        function toggleController(
            el: Element,
            controllerName: string,
            include: boolean
        ): void;

        class TooltipController extends BasePopoverController {
            /** Sets up a tooltip popover show after a delay */
            scheduleShow(dispatcher: Event | Element | null = null): void;
            /** Applies data-s-tooltip-html-title and title attributes */
            applyTitleAttributes(): HTMLElement | null;
        }

        interface TooltipOptions {
            /** The position to place the tooltip */
            placement: AllPlacements;
        }

        /**
         * Adds or updates a Stacks tooltip on a given element, initializing the controller if necessary
         * @param element The element to add a tooltip to.
         * @param html An HTML string to populate the tooltip with.
         * @param options Options for rendering the tooltip.
         */
        function setTooltipHtml(
            element: Element,
            html: string,
            options?: TooltipOptions
        ): void;
        /**
         * Adds or updates a Stacks tooltip on a given element, initializing the controller if necessary
         * @param element The element to add a tooltip to.
         * @param text A plain text string to populate the tooltip with.
         * @param options Options for rendering the tooltip.
         */
        function setTooltipText(
            element: Element,
            text: string,
            options?: TooltipOptions
        ): void;
    }

    // initial definition of the StackExchange global by double-beep https://github.com/double-beep from:
    // https://github.com/SOBotics/AdvancedFlagging/blob/1945787f9d3d01b5aa84bc6cff3f1da358aaf8c0/src/GlobalVars.ts

    namespace StackExchange {
        interface ModalType {
            /** The modal's title */
            title: string;
            /** The modal's HTML body */
            bodyHtml: string;
            /** The text of the primary button in the modal's footer */
            buttonLabel: string;
        }

        interface ShowModalOptions {
            /** Whether to fade out and remove any Stacks modals in the body */
            closeOthers: boolean;
            /** The element to return focus to when the modal is closed */
            returnElements: JQuery;
            /** Function that will be called after the modal has been displayed */
            shown: () => void;
            /** Function that will be called if the message is dismissed by pressing escape */
            dismissing: () => void;
            /** Function that will be called right before the modal is displayed */
            showing: () => void;
            /** Function that will be bound to the modal's fadeOutAndRemove()'s 'removing' event */
            removing: () => void;
        }

        interface ToastActions {
            /** The button's HTML content */
            labelContent: JQuery;
            /** Function that is called when the button is clicked */
            click: () => void;
            /** The button's aria-label attribute */
            ariaLabel: string;
            /** Space-separated button classes */
            jsClass: string;
        }

        interface ShowToastOptions {
            /** The color/style of the toast (default is info) */
            type: "info" | "success" | "warning" | "danger";
            /** Whether the popup can be dismissed (default is true) */
            dismissable: boolean;
            // SE uses $toast.appendTo($parent), so this is not necessarily a jQuery element
            // however we assume it is intended to be one because of the $
            // and a $parent.length === 0 if condition
            /** The element to append the toast to */
            $parent: JQuery;
            /** Used to find the closest s-modal element to append the toast to */
            $source: JQuery;
            /** If true, the toast will fade away on its own after a short while (default is true) */
            transient: boolean;
            /** How long the toast will fade in ms (default is 20000) */
            transientTimeout: number;
            /** An array of action buttons */
            actions: ToastActions[];
        }

        const helpers: {
            /** Hides any visible toasts from the page */
            hideToasts(): void;
            /**
             * Returns true if the parameter url's host is in the Stack Exchange network
             * @param url The URL to check
             */
            isInNetwork(url: string): boolean;
            /**
             * Returns an anchor element whose href is the given URL
             * @param url The URL
             */
            parseUrl(url: string): HTMLAnchorElement;
            /**
             * Shows a Stacks confirmation modal
             * @param modalOptions The modal options
             */
            showConfirmModal(modalOptions: ModalType): Promise<boolean>;
            /**
             * Shows a modal that already exists in the DOM
             * @param elementOrSelector The modal's HTML element or its selector
             */
            showModal(
                elementOrSelector: string | JQuery | Element | null,
                displayOptions?: Partial<ShowModalOptions>
            ): void;
            /**
             * Shows a Stacks toast
             * @param messageHtml The message's HTML content
             * @param toastOptions Some toast options
             */
            showToast(
                messageHtml: string,
                toastOptions: Partial<ShowToastOptions>
            ): void;
        };

        // NOTE: optional fields do not appear if the user has logged out
        interface UserInfo {
            /** The StackExchange fkey */
            fkey: string;
            /** The current user's current id (doesn't exist if the user is anonymous) */
            userId?: number;
            /** Whether the current user is a moderator */
            isModerator?: boolean;
            /** Whether the current user is registered */
            isRegistered?: boolean;
            /** The current user's StackExchange account id */
            accountId?: number;
            /** Whether the user has the privilege to see deleted posts */
            canSeeDeletedPosts?: boolean;
            /** The user's gravatar element stringified */
            gravatar?: string;
            /** Whether keyboard shortcuts are enabled. See {@link https://meta.stackexchange.com/q/237166|the official announcement} */
            keyboardShortcuts?: boolean;
            /** The current user's profile URL */
            profileUrl?: string;
            /** The current user's reputation (0 for anonymous users) */
            rep: number;
            /** Tracking id, used for tracking with Google Analytics */
            tid: string;
            /** The current user's type */
            userType?: number;
            // following two do not exist if the user is logged in!!
            /** Whether the user is anonymous */
            isAnonymous?: boolean;
            /** Whether the user is anonymous network-wide */
            isAnonymousNetworkWide?: boolean;
        }

        interface RealtimeInfo {
            /** Whether to listen to active questions via the websocket */
            active: boolean;
            /** Whether to listen to new questions via the websocket */
            newest: boolean;
            /** Whether to listen to tag-related websocket events */
            tagged: boolean;
            /** Number of hours to disconnect websocket connection if it is stale */
            staleDisconnectIntervalInHours: number;
        }

        interface SiteInfo {
            /** The meta site that corresponds to the current main one (doesn't exist if the current site is a meta site) */
            childUrl?: string;
            /** The domain of the cookies SE uses */
            cookieDomain: string;
            /** A short description of the site */
            description: string;
            /** Whether to show a warning if a new tag is about to be created */
            enableNewTagCreationWarning: boolean;
            /** Whether to enable social media sharing in the "Share" popup */
            enableSocialMediaInSharePopup: boolean;
            /** The current site's id */
            id: number;
            /** Whether to insert a space after the auto-completed name of a user in the comment box */
            insertSpaceAfterNameTabCompletion: boolean;
            /** Whether the current site is the meta site of a main one */
            isChildMeta?: boolean;
            /** Whether the current site is a meta site */
            isMetaSite?: boolean;
            isNoticesTabEnabled: boolean; // unused?
            /** The current site's name */
            name: string;
            /** Used to normalise a post's score. */
            negativeVoteScoreFloor: number | null;
            /** The main's site URL, only exists if isChildMeta is true */
            parentUrl?: string;
            /** The current site's protocol */
            protocol: "http" | "https";
            /** Whether to highlight the code using highlight.js in the current site */
            styleCodeWithHighlightjs: boolean;
        }

        interface JobPreferences {
            /** Maximum number of developer roles */
            maxNumDeveloperRoles: number;
            /** Maximum number of industries */
            maxNumIndustries: number;
        }

        interface Story {
            /** Max length of disliked technologies */
            dislikedTagsMaxLength: number;
            /** Max length of disliked technologies */
            likedTagsMaxLength: number;
            /** The minimum body length of various description textareas */
            minCompleteBodyLength: number;
        }

        interface Events {
            postEditionSection: {
                title: 1;
                body: 2;
                tags: 3
            };
            postType: {
                question: 1
            };
        }

        const options: {
            /** Information about the current user */
            user: UserInfo;
            /** Current user's job preferences */
            jobPreferences: JobPreferences;
            /** The language code of the locale */
            locale: string;
            /** The hostname of Meta StackExchange */
            networkMetaHostname: string;
            /** Websocket-related constants */
            realtime: RealtimeInfo;
            /** The route name of the current page (e.g. Home/Index) */
            routeName: string;
            /** The Unix epoch time in seconds */
            serverTime: number;
            /** Server's time offset in seconds */
            serverTimeOffsetSec: number;
            /** Event-related constants */
            events: Events;
            /** Information about the current site */
            site: SiteInfo;
            /** Constants regarding the user's bio */
            story: Story;
            /** StackExchange's SVGs hash */
            svgIconHash: string;
            /** The remote URL StackExchange fetches the SVGs from */
            svgIconPath: string;
        };

        const comments: {
            /**
             * Useful helpers related to a post's comments
             * @param elOrJQueryOrSelector The comments container HTML element, selector or jQuery object
             */
            uiForPost(elOrJQueryOrSelector: string | JQuery | HTMLDivElement): {
                /**
                 * Show all hidden comments (if any)
                 * @param noFocus If true, the input won't be focused
                 * @param shouldRenderAddForm Whether to show the "Add a comment" textarea
                 */
                addShow(
                    noFocus: boolean,
                    shouldRenderAddForm: boolean
                ): void;
                /**
                 *
                 * @param htmlOrJQuery The new comments as an HTML string or a jQuery object
                 * @param submittedEditCommentId The submitted comment id (if one has been posted)
                 * @param noHighlighting If true, the unhidden comments won't be highlighted
                 * @param noScrolling Whether to scroll to the comments container
                 */
                showComments(
                    htmlOrJQuery: string | JQuery,
                    submittedEditCommentId: string | null,
                    noHighlighting: boolean,
                    noScrolling: boolean
                ): void;
            };
        };

        const question: {
            /** Get the question id of the current question */
            getQuestionId(): number;
            /** Get whether the user can view the individual up and down votes */
            canViewVoteCounts(): boolean;
            /**
             * Scroll to a given post
             * @param postId The id of the post
             */
            scrollToPost(postId: number): boolean;
        };

        interface AccountSettings {
            /** Whether the current account's password is required for changing Stack id password */
            currentPasswordRequiredForChangingStackIdPassword: boolean;
        }

        interface FlagSettings {
            /** Whether retracting comment flags is allowed */
            allowRetractingCommentFlags: boolean;
            /** Whether retracting post flags is allowed */
            allowRetractingFlags: boolean;
        }

        interface MarkdownSettings {
            /** Whether table formatting is allowed */
            enableTables: boolean;
        }

        interface SiteSettings {
            /** Whether image uploads are allowed */
            allowImageUploads: boolean;
            /** Whether imgur HTTPS is enabled  */
            enableImgurHttps: boolean;
            /** Whether expanded user cards are enabled */
            enableUserHovercards: boolean;
            /** Whether to force HTTPS on images */
            forceHttpsImages: boolean;
            /** Whether to highlight the code */
            styleCode: boolean;
        }

        /** Site settings */
        const settings: {
            /** Constants related to the current StackExchange account */
            accounts: AccountSettings;
            /** Constants related to flags */
            flags: FlagSettings;
            /** Constants related to the markdown parser */
            markdown: MarkdownSettings;
            /** Constants related to the current site */
            site: SiteSettings;
        };
    }
}

export {};
