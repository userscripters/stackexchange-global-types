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

// $ExpectType typeof TooltipController
Stacks.TooltipController;

// $ExpectType typeof PopoverController
Stacks.PopoverController;

// $ExpectType void
Stacks.setTooltipHtml(input, "<strong>important</strong>", tooltipOptions);

// $ExpectType void
Stacks.setTooltipText(input, "test input", tooltipOptions);
