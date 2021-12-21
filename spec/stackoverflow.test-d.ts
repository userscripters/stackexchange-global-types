import { expectAssignable } from "tsd";
import "../lib/stackoverflow";

Object.values(StackOverflow.Models.UserFlags).forEach((val) => {
    if (typeof val !== "string") {
        expectAssignable<StackOverflow.Models.UserFlags>(val);
    }
});

expectAssignable<StackOverflow.Models.NotificationFrequencyTypeId>(
    StackOverflow.Models.NotificationFrequencyTypeId.Daily
);

expectAssignable<StackOverflow.Models.AccountPreferenceFlags>(
    StackOverflow.Models.AccountPreferenceFlags.HideLeftNavigation
);

expectAssignable<StackOverflow.Models.PostTypeId>(
    StackOverflow.Models.PostTypeId.Answer
);