declare global {
    namespace Stacks {
        type BasicPlacement = "auto" | "top" | "right" | "bottom" | "left";
        // Minimum TypeScript Version: 4.1
        type AllPlacements =
            | BasicPlacement
            | `${BasicPlacement}-start`
            | `${BasicPlacement}-end`;

        class ModalController extends StacksController {
            /** Toggles the visibility of the modal */
            toggle(dispatcher?: Event | Element | null): void;
            /** Shows the modal */
            show(dispatcher?: Event | Element | null): void;
            /** Hides the modal */
            hide(dispatcher?: Event | Element | null): void;
        }

        /**
         * Helper to manually show an s-modal element via external JS
         * @param element the element the `data-controller="s-modal"` attribute is on
         */
        function showModal(element: HTMLElement): void;
        /**
         * Helper to manually hide an s-modal element via external JS
         * @param element the element the `data-controller="s-modal"` attribute is on
         */

        function hideModal(element: HTMLElement): void;
        /**
         * Helper to manually show an s-modal element via external JS
         * @param element the element the `data-controller="s-modal"` attribute is on
         * @param show whether to force show/hide the modal; toggles the modal if left undefined
         */
        function toggleModal(element: HTMLElement, show?: boolean): void;

        abstract class BasePopoverController extends StacksController {
            /** Returns true if the if the popover is currently visible */
            isVisible: boolean;
            /** Gets whether the element is visible in the browser's viewport */
            isInViewPort: boolean;

            /** Toggles the visibility of the popover */
            toggle(dispatcher?: Event | Element | null): void;
            /** Shows the popover if not already visible */
            show(dispatcher?: Event | Element | null): void;
            /** Hides the popover if not already hidden */
            hide(dispatcher?: Event | Element | null): void;
        }

        class PopoverController extends BasePopoverController {}

        interface PopoverOptions {
            /** When true, the `click->s-popover#toggle` action will be attached to the controller element or reference element */
            toggleOnClick?: boolean;
            /** When set, `data-s-popover-placement` will be set to this value on the controller element */
            placement?: AllPlacements;
            /** When true, the popover will appear immediately when the controller connects */
            autoShow?: boolean;
        }

        interface GetPopoverResult {
            /** Indicates whether or not the element has s-popover in its `data-controller` class */
            isPopover: boolean;
            /** Returns the element's existing `PopoverController` or null if it has not been configured yet */
            controller: PopoverController | null;
            /** Returns the popover's reference element as would live in `referenceSelector` or null if it is invalid */
            referenceElement: Element | null;
            /** Returns the popover currently associated with the controller, or null if one does not exist in the DOM */
            popover: HTMLElement | null;
        }

        /**
         * Helper to manually show an s-popover element via external JS
         * @param element the element the `data-controller="s-popover"` attribute is on
         */
        function showPopover(element: HTMLElement): void;
        /**
         * Helper to manually hide an s-popover element via external JS
         * @param element the element the `data-controller="s-popover"` attribute is on
         */
        function hidePopover(element: Element): void;
        /**
         * Attaches a popover to an element and performs additional configuration.
         * @param element the element that will receive the `data-controller="s-popover"` attribute.
         * @param popover an element with the `.s-popover` class or HTML string containing a single element with the `.s-popover` class.
         *                If the popover does not have a parent element, it will be inserted as a immediately after the reference element.
         * @param options an optional collection of options to use when configuring the popover.
         */
        function attachPopover(
            element: Element,
            popover: Element | string,
            options?: PopoverOptions
        ): void;
        /**
         * Removes the popover controller from an element and removes the popover from the DOM.
         * @param element the element that has the `data-controller="s-popover"` attribute.
         * @returns The popover that was attached to the element.
         */
        function detachPopover(element: Element): GetPopoverResult["popover"];
        /**
         * Gets the current state of an element that may be or is intended to be an s-popover controller
         * so it can be configured either directly or via the DOM.
         * @param element An element that may have `data-controller="s-popover"`.
         */
        function getPopover(element: Element): GetPopoverResult;
        /**
         * Adds or removes the controller from an element's [data-controller] attribute without altering existing entries
         * @param el The element to alter
         * @param controllerName The name of the controller to add/remove
         * @param include Whether to add the controllerName value
         */
        function toggleController(
            el: Element,
            controllerName: string,
            include: boolean
        ): void;

        class TooltipController extends BasePopoverController {
            /** Sets up a tooltip popover show after a delay */
            scheduleShow(dispatcher: Event | Element | null = null): void;
            /** Applies data-s-tooltip-html-title and title attributes */
            applyTitleAttributes(): HTMLElement | null;
        }

        interface TooltipOptions {
            /** The position to place the tooltip */
            placement: AllPlacements;
        }

        /**
         * Adds or updates a Stacks tooltip on a given element, initializing the controller if necessary
         * @param element The element to add a tooltip to.
         * @param html An HTML string to populate the tooltip with.
         * @param options Options for rendering the tooltip.
         */
        function setTooltipHtml(
            element: Element,
            html: string,
            options?: TooltipOptions
        ): void;
        /**
         * Adds or updates a Stacks tooltip on a given element, initializing the controller if necessary
         * @param element The element to add a tooltip to.
         * @param text A plain text string to populate the tooltip with.
         * @param options Options for rendering the tooltip.
         */
        function setTooltipText(
            element: Element,
            text: string,
            options?: TooltipOptions
        ): void;
    }
}

export {};
