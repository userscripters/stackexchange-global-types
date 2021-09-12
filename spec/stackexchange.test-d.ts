import { expectError, expectType } from "tsd";
import StackExchange, {
    AccountSettings,
    FlagSettings,
    MarkdownSettings,
    SiteSettings,
} from "../lib/stackexchange";

const $modal = $("<div>pretend modal</div>");

expectType<void>(StackExchange.helpers.showModal($modal));

expectType<void>(
    StackExchange.helpers.showModal(document.createElement("div"))
);

expectType<void>(StackExchange.helpers.showModal(null));

expectError(StackExchange.helpers.showModal());

expectType<boolean>(StackExchange.helpers.isInNetwork("stackoverflow.com"));

expectError(StackExchange.helpers.isInNetwork());

expectType<number>(StackExchange.question.getQuestionId());

expectType<boolean>(StackExchange.question.canViewVoteCounts());

expectError(StackExchange.question.scrollToPost());

expectType<boolean>(StackExchange.question.scrollToPost(123456));

expectType<void>(StackExchange.ready(() => 42));

expectType<void>(StackExchange.gaReady(() => console.log("loaded")));

expectError(StackExchange.ready());

expectError(StackExchange.gaReady());

const { settings } = StackExchange;

expectType<AccountSettings>(settings.accounts);

expectType<FlagSettings>(settings.flags);

expectType<MarkdownSettings>(settings.markdown);

expectType<SiteSettings>(settings.site);
