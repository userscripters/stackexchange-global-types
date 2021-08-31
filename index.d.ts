// Minimum TypeScript Version: 4.1

import "@stackoverflow/stacks/dist/js/stacks.js";
import "jquery";
import "./lib/chat.d.ts";
import "./lib/stackexchange.d.ts";
import "./lib/stacks.d.ts";

declare global {
    Stacks;
    StackExchange;
    CHAT;
}

export {};
