import { Context } from "@hotwired/stimulus";
import { expectError, expectType } from "tsd";
import "../lib/stacks";

const controllerContext = {} as unknown as Context;
// classes testing

// ----------------------------------
// Modal controller

const modalController = new Stacks.ModalController(controllerContext);

expectType<void>(modalController.focusReturnElement());

expectType<void>(modalController.show(document.createElement("aside")));

expectType<HTMLElement[]>(modalController.getAllTabbables());

expectType<HTMLElement | undefined>(
    modalController.lastVisible(modalController.getAllTabbables())
);

expectType<typeof Stacks.ModalController>(Stacks.ModalController);

// ----------------------------------

expectType<["modal", "initialFocus"]>(Stacks.ModalController.targets);

expectType<typeof Stacks.TooltipController>(Stacks.TooltipController);

expectType<typeof Stacks.PopoverController>(Stacks.PopoverController);

// helpers testing

const el = document.createElement("div");
el.id = "testId";

expectType<void>(Stacks.showModal(el));

expectError(Stacks.showModal());

const input = document.createElement("input");

const tooltipOptions: Stacks.TooltipOptions = {
    placement: "left",
};

expectType<void>(
    Stacks.setTooltipHtml(input, "<strong>important</strong>", tooltipOptions)
);

expectType<void>(Stacks.setTooltipText(input, "test input", tooltipOptions));
