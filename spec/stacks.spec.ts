import { Context } from "stimulus";

const controllerContext = {} as unknown as Context;
// classes testing

// ----------------------------------
// Modal controller

const modalController = new Stacks.ModalController(controllerContext);

// $ExpectType void
modalController.focusReturnElement();

// $ExpectType void
modalController.show(document.createElement("aside"));

// $ExpectType HTMLElement[]
modalController.getAllTabbables();

// $ExpectType HTMLElement | undefined
modalController.lastVisible(modalController.getAllTabbables());

// $ExpectType typeof ModalController
Stacks.ModalController;

// ----------------------------------

// $ExpectType ["modal", "initialFocus"]
Stacks.ModalController.targets;

// $ExpectType typeof TooltipController
Stacks.TooltipController;

// $ExpectType typeof PopoverController
Stacks.PopoverController;

// helpers testing

const el = document.createElement("div");
el.id = "testId";

// $ExpectType void
Stacks.showModal(el);

// $ExpectError
Stacks.showModal();

const input = document.createElement("input");

const tooltipOptions: Stacks.TooltipOptions = {
    placement: "left",
};

// $ExpectType void
Stacks.setTooltipHtml(input, "<strong>important</strong>", tooltipOptions);

// $ExpectType void
Stacks.setTooltipText(input, "test input", tooltipOptions);
