// initial definition of the StackExchange global by Rob https://github.com/rjrudman from:
// https://github.com/SOBotics/AdvancedFlagging/blob/1945787f9d3d01b5aa84bc6cff3f1da358aaf8c0/src/GlobalVars.ts

declare global {
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
            /** Whether to encode the toast text as HTML (default is false) */
            useRawHtml: boolean;
        }

        const helpers: {
            /** Appends a hidden .lightbox to the body */
            addLightbox(): JQuery;
            /**
             * Initializes draggable popups
             * @deprecated
             */
            bindMovablePopups(): void;
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
             * Displays a banner message.
             * @param message a string or HTML string
             * @param type banner type
             */
            showBannerMessage(
                message: string,
                type: "error" | "info" | "success" | "warning"
            ): JQuery;
            /**
             * Shows a Stacks confirmation modal
             * @param modalOptions The modal options
             */
            showConfirmModal(modalOptions: ModalType): Promise<boolean>;
            /**
             * Displays a success message.
             */
            showErrorMessage(
                $elem: JQuery,
                message: string,
                options: object
            ): JQuery;
            /**
             * Displays a success message.
             */
            showInfoMessage(
                $elem: JQuery,
                message: string,
                options: object
            ): JQuery;
            /**
             * Shows a modal that already exists in the DOM
             * @param elementOrSelector The modal's HTML element or its selector
             */
            showModal(
                elementOrSelector: string | JQuery | Element | null,
                displayOptions?: Partial<ShowModalOptions>
            ): void;
            /**
             * Displays a success message.
             */
            showSuccessMessage(
                $elem: JQuery,
                message: string,
                options: object
            ): JQuery;
            /**
             * Shows a Stacks toast
             * @param messageHtml The message's HTML content
             * @param toastOptions Some toast options
             */
            showToast(
                messageHtml: string,
                toastOptions: Partial<ShowToastOptions>
            ): void;
            /**
             * Encodes a string replacing ", ' with their HTML equivalents
             * @param value the given string
             */
            htmlEncode(
                value: string
            ): string;
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

        /**
         * This is considered LegacyJS
         * @see https://cdn-dev.sstatic.net/Js/full.en.js
         */
        interface Realtime {
            pauseQuestionNotifications: boolean;
            debug(section: string): void;
            expandActiveQuestions(): void;
            expandAnswers(): void;
            genericSubscribe(
                subscriptionName: string,
                callback: (...args: any[]) => void
            ): void;
            genericUnsubscribe(
                subscriptionName: string,
                callback: (...args: any[]) => void
            ): void;
            init(endpoint: string): void;
            log(message: { action: string; data: unknown }): void;
            reloadPosts(
                postIds: string[],
                includeComments?: boolean
            ): Promise<Record<number, JQuery>>;
            simulate(message: string): void;
            subscribeToActiveQuestions(
                sid: string | number,
                channel: string,
                noHighlightTags: string[] | undefined,
                requiredTags: string[] | undefined,
                formatDateShort: boolean,
                callback: (...args: any[]) => void
            ): void;
            subscribeToCounts(sid: string | number): void;
            subscribeToReputationNotifications(sid: string | number): void;
            subscribeToReviewDashboard(sid: string | number): void;
            subscribeToTopBarNotifications(sid: string | number): void;
            subscribeToQuestion(
                sid: string | number,
                qid: string | number
            ): void;
            subscribeToUQL(
                sid: string | number,
                sort: string,
                tagQuery: string[],
                filters: {
                    noAnswers?: boolean;
                    hasBounty?: boolean;
                },
                suppressedTags: string[]
            ): void;
            unsubscribeToQuestion(
                sid: string | number,
                qid: string | number
            ): void;
            updateRelativeDates(): void;
        }

        const realtime: Realtime;

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
                tags: 3;
            };
            postType: {
                question: 1;
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
            /** A (random) string apparently used for cache-busting */
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
                addShow(noFocus: boolean, shouldRenderAddForm: boolean): void;
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

        enum VoteTypeId {
            "informModerator" = -1,
            "undoMod" = 0,
            "acceptedByOwner" = 1,
            "upMod" = 2,
            "downMod" = 3,
            "offensive" = 4,
            "bookmark" = 5,
            "close" = 6,
            "reopen" = 7,
            "bountyClose" = 9,
            "deletion" = 10,
            "undeletion" = 11,
            "spam" = 12,
            "reaction1" = 17,
            "helpful" = 18,
            "thankYou" = 19,
            "wellWritten" = 20,
            "follow" = 21,
            "reaction2" = 22,
            "reaction3" = 23,
            "reaction4" = 24,
            "reaction5" = 25,
            "reaction6" = 26,
            "reaction7" = 27,
            "reaction8" = 28,
            "outdated" = 29,
            "notOutdated" = 30,
            "preVote" = 31,
        }

        interface VoteData {
            Message?: string;
            Warning?: boolean;
        }

        interface VoteOptions {
            $target: JQuery;
            complete?: () => void;
            data?: VoteData;
            error?: (jClicked: JQuery, postId: number, data: VoteData) => void;
            postId: number;
            success?: (jClicked: JQuery, postId: number, data: VoteData) => void;
            undo?: boolean;
            voteTypeId: VoteTypeId;
        }

        interface VoteCast {
            PostId: number
            VoteTypeId: VoteTypeId
        }

        interface Vote {
            /** used on the user's own bookmarks page */
            bookmark_init(): void;
            /** used by suggested edits */
            delete_init(
                optionalCallback?: (...args: unknown[]) => unknown,
                optionalFormData?: unknown
            ): void;
            election_init(canVote: boolean, votesCast: VoteCast[]): void;
            /** used by the review dashboard */
            follow_init(): void;
            getPostId($el: JQuery): number;
            highlightExistingVotes(votesCast: VoteCast[]): void;
            init(votesCast:VoteCast[]): void;
            /** This was written for an experiment that did not graduate and can be removed. */
            normalizePostScore(score: number): number;
            submit(voteOptions:VoteOptions): void;
            voteTypeIds: typeof VoteTypeId;
            vote_down($voteButton: JQuery): void;
            /** used by the review dashboard */
            vote_init(votesCast:VoteCast[]): void;
            vote_up($voteButton: JQuery): void;
        }

        const vote: Vote;

        /**
         * Defers execution of a callback until StackExchange is ready
         * @param callback callback to defer
         */
        function ready(callback: () => void): void;

        /**
         * Defers exectuion of a callback until Google Analytics is ready
         * @param callback callback to defer
         */
        function gaReady(callback: () => void): void;
    }
}

export {};
