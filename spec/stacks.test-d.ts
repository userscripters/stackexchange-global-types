/* global Stacks */
import { expectType } from "tsd";
import "../lib/stacks";

// We don't need to test Stacks itself, just that some of the expected
// objects and types exist, as a global namespace.
expectType<Stacks.StacksApplication>(Stacks.application);

export {}
