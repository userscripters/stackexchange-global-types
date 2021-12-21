import { expectAssignable } from "tsd";
import "../lib/stackoverflow";

Object.values(StackOverflow.Models.UserFlags).forEach((val) => {
    if (typeof val !== "string") {
        expectAssignable<StackOverflow.Models.UserFlags>(val);
    }
});