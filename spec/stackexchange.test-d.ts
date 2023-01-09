import { expectDeprecated, expectError, expectType } from "tsd";
import "../lib/stackexchange";

// helpers
const $modal = $("<div>pretend modal</div>");
const { helpers } = StackExchange;

expectDeprecated(helpers.bindMovablePopups);
expectDeprecated(helpers.showErrorPopup);

// most examples are from SE's JS

const message = "message";
const element = $("#el");

expectType<JQuery>(helpers.addLightbox().data("_popup", "value"));

expectType<void>(
    helpers.bindOnHashChange_HighlightDestination(
        function (commentId, postId) {
            expectType<number>(commentId);
            expectType<number>(postId);
        },
        function (postId) {
            expectType<number>(postId);
        }
    )
);

expectType<JQuery[]>([
    helpers.showMessage(
        element,
        message,
        {
            type: 'info',
            position: { my: 'left top', at: 'right center' },
            css: { 'margin-left': '-10px' }
        }
    ),
    helpers.showMessage(
        element,
        message,
        {
            type: "info",
            position: { my: "left top", at: "right center" },
            relativeToBody: true
        }
    ),
    helpers.showMessage(
        element,
        null,
        {
            messageElement: element,
            type: 'config',
            relativeToBody: true,
            position: { my: 'top center', at: 'bottom center', offsetTop: -10, offsetLeft: 60 },
            fixedTo$elem: true
        }
    ),

    helpers.showErrorMessage(element, message , { transient: true }),
    helpers.showErrorMessage(element, message),

    helpers.showInfoMessage(
        element,
        message,
        {
            position: {
                at: "right top",
                my: "left bottom"
            },
            cssClass: "convert-image-to-link"
        }
    ),
]);

expectType<number[]>([
    helpers.suggestedTransientTimeout(message, true),
    helpers.suggestedTransientTimeout(message, false),
    helpers.suggestedTransientTimeout(message),
]);

expectType<JQuery[]>([
    helpers.showBannerMessage(message, "error"),
    helpers.showBannerMessage(message, "info"),
    helpers.showBannerMessage(message, "success"),
    helpers.showBannerMessage(message, "warning"),
]);
expectError(helpers.showBannerMessage(message, "danger"));

expectType<JQuery[]>([
    helpers.showStacksNotice(message, "danger"),
    helpers.showStacksNotice(message, "info"),
    helpers.showStacksNotice(message, "success"),
    helpers.showStacksNotice(message, "warning"),
    helpers.showStacksNotice(message, "warning", {
        transient: true,
        transientTimeout: 5000,
    }),
]);
expectError(helpers.showStacksNotice(message, "error"));

expectType<void[]>([
    helpers.showModal(
        $modal,
        {
            returnElements: element,
            shown: function () { },
            closeOthers: true,
        }
    ),

    helpers.showModal($modal),
    helpers.showModal(document.createElement("div")),
    helpers.showModal(null),
]);
expectError(helpers.showModal());

expectType<void>(helpers.removeMessages());
expectType<void>(helpers.removeMessages(true));

expectType<JQuery[]>([
    await helpers.loadModal("/url"),
    await helpers.loadModal(
        "url",
        { returnElements: element }
    ),
]);

expectType<void[]>([
    helpers.toggleStacksPopover(element),
    helpers.toggleStacksPopover(element, true),
    helpers.toggleStacksPopover(element, false),

    helpers.queueStacksPopover(element),
    helpers.queueStacksPopover(element, 100)
]);

expectType<string>(helpers.htmlEncode("string"));
expectError(helpers.htmlEncode());

expectType<JQuery[]>([
    helpers.showToast(message),
    helpers.showToast(
        message,
        {
            actions: [{ labelContents: element }],
            transient: false,
            type: "danger"
        }
    ),
    helpers.showToast(
        message,
        {
            type: "success",
            transient: true,
            transientTimeout: 3000,
            actions: [{
                labelContents: "...",
                click: function () { }
            }],
            $parent: element,
            useRawHtml: true
        }
    ),
]);
expectError(helpers.showToast());
expectError(helpers.showToast(message, { type: "error" }));

expectType<void>(helpers.hideToasts());

expectType<void[]>([
    helpers.addSpinner(element),
    helpers.addSpinner(
        element,
        {
            "margin-left": "10px"
        }
    ),

    helpers.addStacksSpinner(element),
    helpers.addStacksSpinner(element, "lg", "fc-orange-400 ml16 mt12")
]);

expectType<JQuery>(helpers.getSpinnerImg());
expectType<JQuery>(
    helpers.getSpinnerImg(
        {
            position: "fixed",
            color: "#abcdef",
            "margin-left": "10px",
        }
    )
);
expectType<void>(helpers.removeSpinner());

expectType<void[]>([
    helpers.closePopups("selector"),
    helpers.closePopups(element, "dismiss")
]);
expectError(helpers.closePopups());

// with selector being jQuery
expectType<void>(helpers.enableSubmitButton(element));
expectType<void>(helpers.disableSubmitButton(element));
// with selector being string
expectType<void>(helpers.enableSubmitButton("selector"));
expectType<void>(helpers.disableSubmitButton("selector"));
// without first parameter
expectError(helpers.enableSubmitButton());
expectError(helpers.disableSubmitButton());

expectType<void>(helpers.loadTicks());
expectType<void>(helpers.loadTicks(element));

expectType<void[]>([
    helpers.showFancyOverlay({ message }),
    helpers.showFancyOverlay(
        {
            message,
            showClose: true,
            complete: () => { },
        }
    ),
]);
expectError(helpers.showFancyOverlay({}));

const exampleFn = (str: string) => console.log(str);
const delayed = helpers.DelayedReaction(exampleFn, 100, { sliding: true });
expectType<void>(delayed.trigger("string"));
expectType<void>(delayed.cancel());
expectType<() => void>(delayed.cancel);
expectType<(...args: any[]) => void>(delayed.trigger);

expectType<void>(helpers.fireAndForget("url"));
expectError(helpers.fireAndForget());

expectType<string>(
    helpers.updateQueryStringParameter(
        "https://stackoverflow/questions",
        "tab",
        "hot"
    )
);
expectType<void>(helpers.removeParameterFromQueryString("goodbye"));
// errors:
expectError(helpers.removeParameterFromQueryString());
expectError(helpers.updateQueryStringParameter());
expectError(helpers.updateQueryStringParameter("s1"));
expectError(helpers.updateQueryStringParameter("s1", false, {}));

expectType<HTMLAnchorElement>(helpers.parseUrl("https://example.com"));
expectError(helpers.parseUrl());

expectType<boolean>(helpers.isEmailAddress("example@gmail.com"));
expectError(helpers.isEmailAddress());

expectType<void>(helpers.submitFormOnEnterPress(element));
expectError(helpers.submitFormOnEnterPress());

expectType<boolean>(helpers.isInNetwork("stackoverflow.com"));
expectError(helpers.isInNetwork());

expectType<void>(helpers.placeCaretAtEnd(element[0]));
expectError(helpers.placeCaretAtEnd());

expectType<boolean>(helpers.hasContentEditable(element));
expectType<boolean>(helpers.hasContentEditable(element[0]));
expectError(helpers.hasContentEditable());

expectType<void>(
    helpers.copyTextToClipboard(
        message,
        {
            actions: [{ labelContents: element }],
            transientTimeout: 5000,
        })
);
expectError(helpers.copyTextToClipboard());

expectType<string>(helpers.encodeHexHtmlEntities("nonsense"));
expectError(helpers.encodeHexHtmlEntities());

expectType<boolean[]>([
    await helpers.showConfirmModal({
        title: "Are you sure you want to rollback?",
        body: message,
        buttonLabel: "Rollback",
        returnElements: element,
    }),
    await helpers.showConfirmModal({
        title: "Nominate this question for reopening?",
        bodyHtml: "blah blah",
        buttonLabel: "Vote to reopen"
    }),
]);
expectError(await helpers.showConfirmModal());

expectType<void[]>([
    helpers.MagicPopup(
        {
            selector: ".post-tag:not(.user-tag,.no-tag-menu,.invalid-tag,.job-link)",
            className: "tag-group",
            getUrl: element => {
                expectType<HTMLElement>(element);

                return "/url";
            },
            showing: (element, jMenu) => {
                expectType<HTMLElement>(element);
                expectType<JQuery>(jMenu);

                return {
                    top: 15,
                    bottom: 15,
                };
            },
            fade: true,
            unclipped: true,
            renderInline: true,
        }
    ),
    helpers.MagicPopup(
        {
            selector: ".user-hover .user-gravatar48, .user-hover .user-gravatar32, .js-user-hover-target",
            predicate: element => {
                expectType<HTMLElement>(element);
            },
            getUrl: () => "string",
            cache: true,
            id: "user-menu",
            showing: () => {
                return {
                    top: 15,
                    left: 16,
                    additional: element.clone()
                };
            },
            shown: (element, jMenu) => {
                expectType<HTMLElement>(element);
                expectType<JQuery>(jMenu);
            },
            removed: (element, jMenu) => {
                expectType<HTMLElement>(element);
                expectType<JQuery>(jMenu);
            },
            renderInline: true
        }
    ),
]);

expectType<string>(helpers.noDiacritics("nonsense"));
expectError(helpers.noDiacritics());

expectType<RegExp>(helpers.tagSeparator("javascript|typescript"));
expectError(helpers.tagSeparator());

expectType<string>(helpers.sanitizeAndSplitTags(element.text(), true, false));
expectError(helpers.sanitizeAndSplitTags());

// don't care about the types returned
// these should just avoid any errors
helpers.toggleUserFlags(0, true);
helpers.toggleUserFlags(0, false);
helpers.toggleAccountPreferenceFlags(0, true);
helpers.toggleAccountPreferenceFlags(0, false);
expectError(helpers.toggleUserFlags(0));
expectError(helpers.toggleAccountPreferenceFlags(0));

// end .helpers

expectType<number>(StackExchange.question.getQuestionId());

expectType<boolean>(StackExchange.question.canViewVoteCounts());

expectError(StackExchange.question.scrollToPost());

expectType<boolean>(StackExchange.question.scrollToPost(123456));

expectType<void>(StackExchange.ready(() => 42));

expectType<void>(StackExchange.gaReady(() => console.log("loaded")));

expectError(StackExchange.ready());

expectError(StackExchange.gaReady());

const { settings } = StackExchange;

expectType<StackExchange.AccountSettings>(settings.accounts);

expectType<StackExchange.FlagSettings>(settings.flags);

expectType<StackExchange.MarkdownSettings>(settings.markdown);

expectType<StackExchange.SiteSettings>(settings.site);

const { realtime } = StackExchange;

expectType<boolean>(realtime.pauseQuestionNotifications);

expectType<void>(realtime.debug("message"));

expectType<void>(realtime.genericSubscribe("event", () => void 0));