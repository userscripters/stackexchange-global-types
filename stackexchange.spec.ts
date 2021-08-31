const $modal = $("<div>pretend modal</div>");

// $ExpectType void
StackExchange.helpers.showModal($modal);

// $ExpectType void
StackExchange.helpers.showModal(document.createElement("div"));

// $ExpectType void
StackExchange.helpers.showModal(null);

// $ExpectError
StackExchange.helpers.showModal();

// $ExpectType boolean
StackExchange.helpers.isInNetwork("stackoverflow.com");

// $ExpectError
StackExchange.helpers.isInNetwork();

// $ExpectType number
StackExchange.question.getQuestionId();

// $ExpectType boolean
StackExchange.question.canViewVoteCounts();

// $ExpectError
StackExchange.question.scrollToPost();

// $ExpectType boolean
StackExchange.question.scrollToPost(123456);

// $ExcpectType void
StackExchange.ready(() => 42);

// $ExcpectType void
StackExchange.gaReady(() => console.log("loaded"));

// $ExpectError
StackExchange.ready();

// $ExpectError
StackExchange.gaReady();

const { settings } = StackExchange;

// $ExpectType AccountSettings
settings.accounts;

// $ExpectType FlagSettings
settings.flags;

// $ExpectType MarkdownSettings
settings.markdown;

// $ExpectType SiteSettings
settings.site;
