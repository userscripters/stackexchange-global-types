// The Stacks library is actually a UMD module, so it can be used as a global
export * from "@stackoverflow/stacks";
export as namespace Stacks;

declare global {
    const Stacks: typeof import("@stackoverflow/stacks");
}
