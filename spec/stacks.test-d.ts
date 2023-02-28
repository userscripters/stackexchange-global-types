/* global Stacks */
import { expectType } from "tsd";
import "../lib/stacks";

// We don't need to test Stacks itself, just that some of the expected
// objects and types exist, as a global namespace.

expectType<Stacks.StacksApplication>(Stacks.application);

expectType<typeof Stacks.BannerController>(Stacks.BannerController);

expectType<typeof Stacks.ExpandableController>(Stacks.ExpandableController);

expectType<typeof Stacks.ModalController>(Stacks.ModalController);

expectType<typeof Stacks.PopoverController>(Stacks.PopoverController);

expectType<typeof Stacks.TabListController>(Stacks.TabListController);

expectType<typeof Stacks.TooltipController>(Stacks.TooltipController);

expectType<typeof Stacks.ToastController>(Stacks.ToastController);

expectType<typeof Stacks.StacksController>(Stacks.StacksController);

expectType<typeof Stacks.UploaderController>(Stacks.UploaderController);
