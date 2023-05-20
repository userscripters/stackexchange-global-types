// initial definition of the StackExchange global by Rob https://github.com/rjrudman from:
// https://github.com/SOBotics/AdvancedFlagging/blob/1945787f9d3d01b5aa84bc6cff3f1da358aaf8c0/src/GlobalVars.ts

type ShowMessagePositions = "left" | "top" | "right" | "bottom" | "center";
// not accurate (e.g. would allow "center center")
type PositionAcceptedValues = `${ShowMessagePositions} ${ShowMessagePositions}`;
type JQueryHtml =
    | JQuery.htmlString
    | JQuery.Node
    | ((
          this: Element,
          index: number,
          oldhtml: JQuery.htmlString
      ) => JQuery.htmlString | JQuery.Node);
type JQueryCss = JQuery.PlainObject<
    | string
    | number
    | ((
          this: Element,
          index: number,
          value: string
      ) => string | number | void | undefined)
>;

type XHRMock = {
    reponseText: string;
};

declare global {
    namespace StackExchange {
        const cacheBreakers: Record<string, string>;

        interface ModalType {
            /** The modal's (text) title */
            title: string;
            /** The modal's (HTML or jQuery) title */
            titleHtml: JQuery.htmlString | JQuery.Node | JQuery;
            /** The modal's (text) body */
            body: string;
            /** The modal's (HTML or jQuery) body */
            bodyHtml: JQuery.htmlString | JQuery.Node | JQuery;
            /** The text of the primary button in the modal's footer */
            buttonLabel: string;
            /** The HTML or jQuery element of the primary button located in the modal's footer */
            buttonLabelHtml: JQuery.htmlString | JQuery.Node | JQuery;
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
            /** Function that will be bound to the modal's `fadeOutAndRemove()`'s 'removing' event */
            removing: () => void;
        }

        interface ToastActions {
            /** The button's HTML content */
            labelContents: JQuery | string;
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
            /** How long the toast will fade in ms (default is `20000`) */
            transientTimeout: number;
            /** An array of action buttons */
            actions: Partial<ToastActions>[];
            /** Whether to encode the toast text as HTML (default is `false`) */
            useRawHtml: boolean;
        }

        interface ShowMessageOptions {
            /** Instead of the 'message' parameter's html, appends this element (or jQuery object) to .message-text */
            messageElement:
                | JQuery.htmlString
                | JQuery.TypeOrArray<JQuery.Node>
                | JQuery<JQuery.Node>;
            /** Whether the popup can be dismissed (by clicking X or pressing Esc) or last until removed (default is `true`) */
            dismissable: boolean;
            /** Whether the message should fade away on its own after a short while (default is `false`) */
            transient: boolean;
            /** After how long (in ms) the message will fade away (default is `null`, `transient` must be `true`) */
            transientTimeout: number;
            /** The color/style of the popup (default is `error`) */
            type: "error" | "warning" | "info" | "config" | "success";
            /** CSS object - passed into jQuery's function */
            css: JQueryCss;
            /** Additional CSS class(es) to add on the *root* .message div */
            cssClass: Parameters<JQuery["addClass"]>[0];
            /** Whether to remove all other messages before showing the current one (default is `true`) */
            closeOthers: boolean;
            /** If set, the text for the title of the [x] on the message (if dismissible) **/
            closeTitle: boolean;
            /**
             * There are four possible values for "position":
             *   (1) `inline`: appended to `$elem` with default position (static)
             *   (2) `inside`: appended to `$elem` with `position: absolute;`
             *   (3) `toast`: shown in the upper right corner of the window; useful for success messages
             *
             * When using 'inline' or 'inside', the triangular tip is not shown by default.
             * It can be added with the option `tip: 'top left'`, for example.
             *
             *   (4) corner/edge-based positioning, e.g. `{ my: 'left top', at: 'right center', offsetTop: 30, offsetLeft: 10 }`
             *
             * This positioning method is heavily based upon qtip2 (http:*craigsworks.com/projects/qtip2/docs/position/),
             * which is heavily based upon the jQuery UI Position plugin (http:*docs.jquery.com/UI/Position).
             * Basically, you specify how you want the triangular tip to align with the target. For example, if you want the top
             * left corner at the right center of the target, your position would be `{ my: 'left top', at: 'right center' }`.
             */
            position:
                | "inside"
                | "inline"
                | "toast"
                | Partial<{
                      my: PositionAcceptedValues;
                      at: PositionAcceptedValues;
                      /** Pixels to move message up/down */
                      offsetTop: number;
                      /** Pixels to move message left/right */
                      offsetLeft: number;
                  }>;
            /** Same as `position.my` */
            tip: PositionAcceptedValues;
            /** Function called after the message has been displayed */
            shown: Parameters<JQuery["fadeIn"]>[0];
            /** Function called right before the message is displayed */
            showing: () => void;
            /** Do all the positioning relative to `body` instead of `offsetParent` (default is `false`) */
            relativeToBody: boolean;
            /** Function that will be bound to the message's `fadeOutAndRemove()`'s 'removing' event */
            removing: (event: JQuery.Event) => void;
            /** Function that will be called if the message is dismissed by pressing escape */
            dismissing: () => void;
            /** When `true`, lightbox effect (darkened screen) will be used; default is `false` */
            lightbox: boolean;
            /** When this and lightbox are `true`, will add `.stop-scrolling` to `body`; removed when message is dismissed */
            stopBodyScroll: boolean;
            /**
             * When `true`, displayed message will be kept next to first parameter `$elem`, regardless of body scroll and
             * window resizing - useful when showing a tip near a `position: fixed` element.
             * Only applies when position is set to the position object, e.g. `{ my: 'left top', at: 'right center' }`
             */
            fixedTo$elem: boolean;
            /** When `true`, the message will slide down instead of fading in */
            slideDown: boolean;
        }

        type ShowMessage = (
            $elem: JQuery | string | HTMLElement,
            message: JQueryHtml | null,
            options?: Partial<ShowMessageOptions>
        ) => JQuery;

        interface ShowStacksNoticeOptions {
            /** Message will fade out after `transientTimeout` milliseconds */
            transient: boolean;
            /** Number of milliseconds to wait before dismissing the notice. Defaults to 10,000 */
            transientTimeout: number;
            /** A jQuery object in which to place the message*/
            target: JQuery;
        }

        interface OverlayOptions {
            /** The message to show */
            message: string;
            /** Whether to show the "close this message" button (default is `true`) */
            showClose?: boolean;
            /** Function called after the animation is complete */
            complete?: () => void;
        }

        interface DelayedReactionOptions {
            /** Function that will be called *immediately* on every `.trigger()` call, with the same arguments. */
            always: Function;
            /** - If `true`, a call to `trigger` will cause the timer to be reset; in other words,
             *  before `callback` is called, there has to be a pause of `delay` milliseconds in which `trigger`
             *  is *not* called.
             *  - If `false` (or not set), the call to `callback` will happen `delay` milliseconds
             *  after the first call to `trigger`, no matter how many times `trigger` is called afterwards.
             */
            sliding: boolean;
        }

        interface DelayedReactionObject {
            trigger: (...args: any[]) => void;
            cancel: () => void;
        }

        interface MagicPopupOptions {
            /** Hovering elements matching this selector will trigger the popup */
            selector: string;
            /**
             * A function that receives a single argument; a DOM element. It's the element
             * that was hovered. Should return the URL from where the popup content is AJAXed in.
             * If it returns `null`, no popup will be shown
             */
            getUrl: (element: HTMLElement) => string;
            /** The HTML element ID of the div in which the HTML will be wrapped */
            id?: string;
            /** The class names to add to the div in which the HTML will be wrapped */
            className?: string;
            /**
             * If `true`, contents from the same URL will only be loaded once;
             * additional hovers will display this cached content.
             */
            cache?: boolean;
            /** If `true`, the popup fades in rather than expanding */
            fade?: boolean;
            /** If `true`, the popup will be allowed to overflow its container */
            unclipped?: boolean;
            /** The number of milliseconds to wait before hiding the popup on mouse leave (default is 5ms) */
            dismissDelay?: number;
            /**
             * If `true`, the popup will be added as a sibling to the triggering element
             * in the DOM instead of adding it to the document body.
             */
            renderInline?: boolean;

            /**
             * A function that will be called before the popup will be animated in.
             * Should return an object `{ left: pageX, top: pageY, additional: elements }`
             * saying where the popup should be shown, and what additional DOM elements (if any)
             * should be considered part of the popup with regard to hovering.
             * Instead of `top`, you can pass `bottom` (with the obvious consequences).
             * @param element The original element
             * @param jMenu A jQuery object containing the menu element in its final position
             */
            showing: (
                element: HTMLElement,
                jMenu: JQuery
            ) => {
                left?: number;
                top?: number;
                bottom?: number;
                additional?: JQuery;
            };
            /**
             * A function that will be called when the popup is fully visible
             * @param element The original element
             * @param jMenu A jQuery object containing the menu element in its final position
             */
            shown?: (element: HTMLElement, jMenu: JQuery) => void;
            /**
             * A function that will be called when the popup has been removed.
             * Guaranteed to be called between two calls to `showing()`.
             * @param element The original element
             * @param jMenu A jQuery object containing the menu element, no longer attached to the DOM
             */
            removed?: (element: HTMLElement, jMenu: JQuery) => void;
            /**
             * A function that if when called returns `false`, the popup won't be shown
             * @param element The original element
             */
            predicate?: (element: HTMLElement) => void;
        }

        const helpers: {
            // properties below (some with docs) available at:
            // https://dev.stackoverflow.com/content/js/stub.en.js

            /** Appends a hidden .lightbox div to the body */
            addLightbox(): JQuery;
            /**
             * Initializes draggable popups
             * @deprecated
             */
            bindMovablePopups(): void;
            /**
             * Binds to (and triggers) hashchange event to highlight either an answer or a comment
             * @param commentCallback
             * @param answerCallback
             */
            bindOnHashChange_HighlightDestination(
                commentCallback: (commentId: number, postId: number) => void,
                answerCallback?: (answerId: number) => void
            ): void;
            /**
             * Adds a `click` event listener to the element with the given selector
             * @param selector The selector of the element
             */
            onClickDraftSave(selector: string): true;
            /**
             * Displays a message to the user
             * @param $elem The element to append the message to
             * @param message The message to show (HTML allowed)
             * @returns The message jQuery element
             */
            showMessage: ShowMessage;
            /**
             * Estimate transient timeout based on the message's length - longer messages should stay longer
             * @param message The message that will be displayed
             * @param isToast Whether the message will be shown in a toast
             * @returns The milliseconds to wait before removing the message (at least 4000ms)
             */
            suggestedTransientTimeout(
                message: string,
                isToast?: boolean
            ): number;
            /**
             * Displays an error message to the user
             * @param $elem The element to append the message to
             * @param message The message to show (HTML allowed)
             * @returns The message jQuery element
             */
            showErrorMessage: ShowMessage;
            /**
             * Temporary alias to `showErrorMessage`
             * @deprecated
             */
            showErrorPopup: ShowMessage;
            /**
             * Displays an info message to the user
             * @param $elem The element to append the message to
             * @param message The message to show (HTML allowed)
             * @returns The message jQuery element
             */
            showInfoMessage: ShowMessage;
            /**
             * Displays a success message to the user
             * @param $elem The element to append the message to
             * @param message The message to show (HTML allowed)
             * @returns The message jQuery element
             */
            showSuccessMessage: ShowMessage;
            /**
             * Displays a banner message.
             *
             * - If the DOM doesn't contain an element with class 'banner-message-container',
             *   the banner is placed below the header.
             * - If the DOM contains one or more elements with class 'banner-message-container',
             *   the banner is placed within the one that is farthest down the DOM.
             * @param message A string or HTML string
             * @param type banner type
             */
            showBannerMessage(
                message: JQueryHtml,
                type?: "error" | "info" | "success" | "warning"
            ): JQuery;
            /**
             * Displays a stacks notice with the `Svg.ClearSm` dismiss button
             * https://stackoverflow.design/product/components/notices
             *
             * - Requires a container element with class 'js-notice-message-container'.
             *
             * @param message A string, or HTML string
             * @param type The type of the notice
             * @param options Configuration
             * @returns The jQuery Stacks notice element
             */
            showStacksNotice(
                message: JQueryHtml,
                type?: "success" | "warning" | "danger" | "info",
                options?: Partial<ShowStacksNoticeOptions>
            ): JQuery;
            /**
             * Shows a Stacks modal that already exists in the DOM
             * @param elementOrSelector The modal's HTML element or its selector
             */
            showModal(
                elementOrSelector: string | JQuery | Element | null,
                options?: Partial<ShowModalOptions>
            ): void;
            /**
             * Load a modal from a URL
             * @param url The url from which to obtain the modal's HTML
             * @param options Configuration
             * @returns A `$.Deferred().promise()` that resolves to the jQuery modal element
             */
            loadModal(
                url: string,
                options?: Partial<ShowModalOptions> & {
                    /** Error message shown on request error */
                    defaultErrorMessage?: string;
                }
            ): ReturnType<JQueryDeferred<JQuery>["promise"]>;
            /**
             * Tells Stacks to show a popover by calling the stimulus controller directly
             * @param $triggerElement The jQuery popover element
             * @param showOrHide Whether to show or hide the popover (or toggle if `undefined`).
             */
            toggleStacksPopover(
                $triggerElement: JQuery,
                showOrHide?: boolean
            ): void;
            /**
             * Attempts to show a popover if its trigger element is on screen.
             * If not, it attaches to the scroll listener and tries showing
             * the popover when the element is almost on screen.
             * @param $triggerElement The popover jQuery element
             * @param verticalBuffer From this Stack Overflow answer: https://stackoverflow.com/a/488073
             */
            queueStacksPopover(
                $triggerElement: JQuery,
                verticalBuffer?: number
            ): void;
            /**
             * Encodes a string replacing ", ' with their HTML equivalents
             * @param value the given string
             */
            htmlEncode(value: string): string;
            /**
             * Shows a Stacks toast
             * @param messageHtml The message's HTML content
             * @param toastOptions Some toast options
             */
            showToast(
                messageHtml: string,
                toastOptions?: Partial<ShowToastOptions>
            ): JQuery;
            /** Hides any visible toasts from the page */
            hideToasts(): void;
            /**
             * Removes all `.message` elements from the DOM
             * @param removeImmediately If `false`, each message will `.fadeOutAndRemove()`
             */
            removeMessages(removeImmediately?: boolean): void;
            /**
             * Creates a Stacks spinner
             * @param appendToSelector The (selector of the) element the spinner will be appended to
             * @param cssProperties CSS properties applied to the selector `img` element
             */
            addSpinner(
                appendToSelector: string | Element | JQuery,
                cssProperties?: JQueryCss
            ): void;
            /**
             * Creates a Stacks spinner
             * @param appendToSelector The (selector of the) element the spinner will be appended to
             * @param size The size of the spinner - see https://stackoverflow.design/product/components/spinner
             * @param extraClassNames Class(es) to add to the spinner element
             */
            addStacksSpinner(
                appendToSelector: string | Element | JQuery,
                size?: "xs" | "sm" | "md" | "lg",
                extraClassNames?: Parameters<JQuery["addClass"]>[0]
            ): void;
            /**
             * GETs the spinner GIF
             * @param cssProperties CSS properties applied to the `img` element
             */
            getSpinnerImg(cssProperties?: JQueryCss): JQuery;
            /** Removes all `img.ajax-loader .s-spinner` elements from the DOM */
            removeSpinner(): void;
            /**
             * Triggers a custom `closePopups` event with the properties given
             * @param selectorToClose The selector of the popups to close
             * @param closeTrigger Close trigger (default is `closePopups`)
             */
            closePopups(
                selectorToClose: string | JQuery.Node | JQuery,
                closeTrigger?: string
            ): void;
            /**
             * Enables the submit button of a form
             * @param formSelector (The selector of) a form
             */
            enableSubmitButton(formSelector: string | JQuery): void;
            /**
             * Disables the submit button of a form
             * @param formSelector (The selector of) a form
             */
            disableSubmitButton(formSelector: string | JQuery): void;
            /**
             * Makes a request to `/questions/ticks`.
             * This function is used to set up an anti-spam field
             * @param jAncestor jQuery parent element
             */
            loadTicks(jAncestor?: JQuery): void;
            /**
             * Shows a message at the top of the page with a slide-down animation.
             * @param options Configuration
             */
            showFancyOverlay(options?: OverlayOptions): void;
            /**
             * Returns an object with two methods:
             * - `trigger()` causes `callback` to be called after `delay` milliseconds. Any arguments given
             *   to `trigger` will be passed to the callback. If `trigger` is called while a reaction is
             *   pending, the callback will still only be called *once*. The arguments passed to the
             *   callback in this case are the arguments passed to the *last* call to `trigger`.
             * - `cancel()` cancels the delayed reaction -- even if a `trigger()` call has happened previously,
             *   the callback won't be called. No-op if no call is pending.
             *
             * Method calls do not need a context.
             * @param callback The callback function
             * @param delay The number of milliseconds to wait
             * @param options Configuration
             */
            DelayedReaction(
                callback: Function,
                delay: number,
                options?: Partial<DelayedReactionOptions>
            ): DelayedReactionObject;
            /**
             * Makes a POST request supplying the user's fkey and ignoring the output/result
             * @param url The URL the POST request should be made
             */
            fireAndForget(url: string): void;
            /**
             * Append query string parameters to a URL
             * @param uri The URL to work on
             * @param key They key of the param to add
             * @param value The param value
             * @returns The modified URL
             */
            updateQueryStringParameter(
                uri: string,
                key: string,
                value: string
            ): string;
            /**
             * Returns an object with hostname and pathname properties parsed from parameter URL
             * @param url The URL/href
             */
            parseUrl(url: string): HTMLAnchorElement;
            /**
             * Returns `true` if parameter looks like an email.
             * @param s *Trimmed* email to test
             */
            isEmailAddress(s: string): boolean;
            /**
             * Returns a short `responseText`, which is most likely a proper error message
             * and not the full /error page's HTML.
             * @param jqXHR http://api.jquery.com/jQuery.ajax/#jqXHR
             */
            getLikelyErrorMessage(
                jqXHR: ReturnType<JQueryDeferred<XHRMock>["reject"]>
            ): string;
            /*
             * For use with the `getLikelyErrorMessage()` method.
             * Returns a rejected `.Deferred` with the first (and only) argument
             * a mock XHR with `.responseText` property set to `errorMessage`.
             * @param errorMessage Will be set to the resulting object's `.responseText` property
             */
            getRejectedMockXhr(
                errorMessage: string
            ): ReturnType<JQueryDeferred<XHRMock>["reject"]>;
            /**
             * When 'enter' is pressed while `$form`'s child textarea has focus, `$form` will be submitted.
             *
             * Exceptions to submission:
             *  - if shift is modifying the enter `keypress`
             *  - if `07_CommentTabCompleter.js`: `StackExchange.comments.tabCompleter` is in play
             *    (completer popup is visible)
             *  - if IME Input is visible (e.g., when using Japanese input)
             *  - `.js-prevent-submit-form-on-enter-press` is present on the `$form`
             *
             * @param $form Form containing a `textarea`/`contenteditable`
             */
            submitFormOnEnterPress($form: JQuery): void;
            /**
             * Returns `true` if the parameter url's host is in the Stack Exchange network
             * @param url The URL to check
             */
            isInNetwork(url: string): boolean;
            /**
             * Removes a parameter from the current URL
             * @param parameterName The parameter name to remove
             */
            removeParameterFromQueryString(parameterName: string): void;
            /**
             * Sets the caret at the end of the text
             * @param el A `contenteditable="true"` element
             */
            placeCaretAtEnd(el: Element): void;
            /**
             * Returns `true` if parameter has the contenteditable attribute set to a truthy value
             * (i.e. either just `contenteditable` or `contenteditable="true"`).
             *
             * Does NOT check ancestors, only the parameter,
             * which differs from `HTMLElement.isContentEditable`
             *
             * @param elementOrJQuery either an `HTMLElement` or a jQuery object wrapping an element
             */
            hasContentEditable(elementOrJQuery: HTMLElement | JQuery): boolean;
            /**
             * Places the parameter string into the user's clipboard.
             *
             * @param strText The text to copy
             * @param toastOptions Configuration
             */
            copyTextToClipboard(
                strText: string,
                toastOptions?: Partial<ShowToastOptions>
            ): void;
            /**
             * Encodes a string containing potential unicode characters
             * into the equivalent encoded HTML entity
             * @param rawText The string to encode
             */
            encodeHexHtmlEntities(rawText: string): string;

            // defined at: https://dev.stackoverflow.com/content/js/full.en.js
            // (not at stub.en.js)

            /**
             * Shows a Stacks confirmation modal
             * @param modalOptions The modal options
             */
            showConfirmModal(
                modalOptions: Partial<ModalType> & Partial<ShowModalOptions>
            ): Promise<boolean>;
            /**
             * Creates a Magic Popup (e.g. the popup shown on hover of a user profile)
             * @param options Configuration
             */
            MagicPopup(options: MagicPopupOptions): void;
            /**
             * Replaces diacritics and similar characters by their plain ASCII brothers
             * @param s The string to process
             */
            noDiacritics(s: string): string;
            /**
             * Identifies the tag separator used by a string, for use with `String.prototype.split`.
             * @param tags A sequence of tags separated by `+`, space, `|`, `,`, or `;`
             */
            tagSeparator(tags: string): RegExp;
            /**
             * Splits a sequence of tags into an array, removing or sanitizing invalid characters and illegal tags.
             * @param tags A sequence of tags separated by any supported separator.
             * @param allowWildcards If `true`, wildcards will not be stripped from the output tags.
             * @param allowOperators If `true`, the operators "or", "and", and "not" will not be removed from tags.
             *                       It will also not sanitize out duplicate instances of the same tag.
             * @param allowUpperCase If `true`, upper case characters will not be converted to lower case.
             */
            sanitizeAndSplitTags(
                tags: string,
                allowWildcard?: boolean,
                allowOperators?: boolean,
                allowUpperCase?: boolean
            ): string;
            /**
             * Toggles a particular user flag on/off
             * @param flags The flag id
             * @param value Whether to enable/disable that flag
             * @param accountId The user's id
             */
            toggleUserFlags(
                flags: number,
                value: boolean,
                userId?: number
            ): ReturnType<ReturnType<JQueryStatic["post"]>["then"]>;
            /**
             * Toggles a particular preference on/off
             * @param flags The flag/option id
             * @param value Whether to enable/disable that preference
             * @param accountId The user's account id
             */
            toggleAccountPreferenceFlags(
                flags: number,
                value: boolean,
                accountId?: number
            ): ReturnType<ReturnType<JQueryStatic["post"]>["then"]>;
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

        interface CommentsSettings {
            addButtonSaysSuggestImprovements?: boolean;
        }

        interface ElectionsSettings {
            opaVoteResultsBaseUrl: string;
        }

        interface FlagSettings {
            /** Whether retracting comment flags is allowed */
            allowRetractingCommentFlags: boolean;
            /** Whether retracting post flags is allowed */
            allowRetractingFlags: boolean;
        }

        interface IntercomSettings {
            appId: string;
            hostBaseUrl: string;
        }

        interface LegalSettings {
            oneTrustConfigId: string;
        }

        interface MarkdownSettings {
            /** Whether table formatting is allowed */
            enableTables: boolean;
        }

        interface MentionsSettings {
            maxNumUsersInDropdown: number;
        }

        interface PathsSettings {
            jQueryUICSSPath: string;
            jQueryUIJSPath: string;
        }

        interface QuestionsSettings {
            enableQuestionTitleLengthLiveWarning: boolean;
            enableSavesFeature: boolean;
            maxTitleSize: number;
            questionTitleLengthStartLiveWarningChars: number;
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

        interface SnippetsSettings {
            renderDomain: string;
            snippetsEnabled: boolean;
        }

        interface SubscriptionsSettings {
            defaultBasicMaxTrueUpSeats: number;
            defaultFreemiumMaxTrueUpSeats: number;
            defaultMaxTrueUpSeats: number;
        }

        interface TopBarSettings {
            enableInboxManagement: boolean;
        }

        /** Site settings */
        const settings: {
            /** Constants related to the current StackExchange account */
            accounts: AccountSettings;
            comments: CommentsSettings;
            elections: ElectionsSettings;
            /** Constants related to flags */
            flags: FlagSettings;
            intercom: IntercomSettings;
            legal: LegalSettings;
            /** Constants related to the markdown parser */
            markdown: MarkdownSettings;
            mentions: MentionsSettings;
            paths: PathsSettings;
            questions: QuestionsSettings;
            search: {};
            snippets: SnippetsSettings;
            /** Constants related to the current site */
            site: SiteSettings;
            subscriptions: SubscriptionsSettings;
            tags: {};
            tobBar: TopBarSettings;
            userMessaging: {};
        };

        const sidebar: {
            /**
             * When Post Collections are enabled on the current site, the sidebar will render
             * StackOverflow/Views/PostCollections/Partials/SidebarWidget.cshtml and it will call this.
             */
            initCollectionWidget(postId: string): void;
        };

        /** Stack Snippets */
        const snippets: {
            init(): void;
            initSnippetRenderer(): void;
            makeSnippets(text: string): string;
            renderer?(
                snippetCode: string,
                hide: boolean,
                console: boolean,
                babel: boolean
            ): string;
            redraw?(): void;
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
            success?: (
                jClicked: JQuery,
                postId: number,
                data: VoteData
            ) => void;
            undo?: boolean;
            voteTypeId: VoteTypeId;
        }

        interface VoteCast {
            PostId: number;
            VoteTypeId: VoteTypeId;
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
            init(votesCast: VoteCast[]): void;
            /** This was written for an experiment that did not graduate and can be removed. */
            normalizePostScore(score: number): number;
            submit(voteOptions: VoteOptions): void;
            voteTypeIds: typeof VoteTypeId;
            vote_down($voteButton: JQuery): void;
            /** used by the review dashboard */
            vote_init(votesCast: VoteCast[]): void;
            vote_up($voteButton: JQuery): void;
        }

        const vote: Vote;

        interface VoteBountyInitOptions {
            canOpenBounty?: boolean;
            hasOpenBounty?: boolean;
        }

        const vote_bounty: {
            init(options: VoteBountyInitOptions): void;
        };

        const vote_closingAndFlagging: {
            close_afterLoadListOriginals(container: JQuery<Element>): void;
            close_initDuplicateSubPane(): void;
            init(options: object): void;
            showReopenConfirmation(callback: () => void): void;
            updateCloseLinkCount(
                json: {
                    Count?: number;
                    Message?: string;
                    isRecommendClose?: boolean;
                },
                closeLink: Element
            ): void;
        };

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
