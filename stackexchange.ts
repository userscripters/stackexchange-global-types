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
