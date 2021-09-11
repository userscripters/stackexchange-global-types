import Stimulus from "stimulus";

type BasicPlacement = "auto" | "top" | "right" | "bottom" | "left";
// Minimum TypeScript Version: 4.1
type AllPlacements =
    | BasicPlacement
    | `${BasicPlacement}-start`
    | `${BasicPlacement}-end`;

declare global {
    namespace Stacks {
        /* Stacks classes */

        class StacksController extends Stimulus.Controller {
            /**
             * Gets the value of a data attribute in a given element
             * @param element The element
             * @param key The attribute
             */
            protected getElementData(element: Element, key: string): string | null;
            /**
             * Sets the value of a data attribute in a given element
             * @param element The element
             * @param key The attribute
             * @param value The new value
             */
            protected setElementData(element: Element, key: string, value: string): void;
            /**
             * Remove the data attribute of a given element
             * @param element The element
             * @param key The attribute
             */
            protected removeElementData(element: Element, key: string): void;
            /**
             * Trigger a custom event (on an element)
             * @param eventName The event name
             * @param detail The event options/details
             * @param optionalElement The element to trigger the event on
             */
            protected triggerEvent<T>(eventName: string, detail?: T, optionalElement?: Element): CustomEvent<T>;
        }

        class ModalController extends StacksController {
            static targets: ["modal", "initialFocus"];
            /**
             * Toggles the visibility of the modal
             * @param dispatcher The modal element or an event to get the element from
             */
            toggle(dispatcher?: Event | Element | null): void;
            /**
             * Shows the modal
             * @param dispatcher The modal element or an event to get the element from
             */
            show(dispatcher?: Event | Element | null): void;
            /**
             * Hides the modal
             * @param dispatcher The modal element or an event to get the element from
             */
            hide(dispatcher?: Event | Element | null): void;

            /** Validates the modal settings and attempts to set necessary internal variables */
            validate(): void;
            /**
             * Toggles the visibility of the modal element
             * @param show Optional parameter that force shows/hides the element or toggles it if left undefined
             * @param dispatcher The modal element or an event to get the element from
             */
            _toggle(show?: boolean, dispatcher?: Event | Element | null): void;
            /** Listens for the s-modal:hidden event and focuses the returnElement when it is fired */
            focusReturnElement(): void;
            /** Remove the element on hide if the `remove-when-hidden` flag is set */
            removeModalOnHide(): void;
            /** Gets all elements within the modal that could receive keyboard focus. */
            getAllTabbables(): HTMLElement[];
            /**
             * Returns the first visible element in an array or `undefined` if no elements are visible.
             * @param elements The list of elements to check
             */
            firstVisible(elements: HTMLElement[]): HTMLElement | undefined;
            /**
             * Returns the last visible element in an array or `undefined` if no elements are visible.
             * @param elements The list of elements to check
             */
            lastVisible(elements: HTMLElement[]): HTMLElement | undefined;
            /**
             * Attempts to shift keyboard focus into the modal.
             * If elements with `data-s-modal-target="initialFocus"` are present and visible, one of those will be selected.
             * Otherwise, the first visible focusable element will receive focus.
             */
            focusInsideModal(): void;
            /**
             * Returns keyboard focus to the modal if it has left or is about to leave.
             * @param e The keyboard event that triggered the closure
             */
            keepFocusWithinModal(e: KeyboardEvent): void;
            /** Binds global events to the document for hiding popovers on user interaction */
            bindDocumentEvents(): void;
            /** Unbinds global events to the document for hiding popovers on user interaction */
            unbindDocumentEvents(): void;
            /**
             * Forces the popover to hide if a user clicks outside of it or its reference element
             * @param e The click event
             */
            hideOnOutsideClick(e: Event): void;
            /**
             * Forces the popover to hide if the user presses escape while it, one of its childen, or the reference element are focused
             * @param e The escape-press keyboard event
             */
            hideOnEscapePress(e: KeyboardEvent): void;
            /**
             * Determines the correct dispatching element from a potential input
             * @param dispatcher The event or element to get the dispatcher from
             */
            getDispatcher(dispatcher: Event | Element | null): Element;
        }

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

        class TooltipController extends BasePopoverController {
            /** Sets up a tooltip popover show after a delay */
            scheduleShow(dispatcher?: Event | Element | null): void;
            /** Applies data-s-tooltip-html-title and title attributes */
            applyTitleAttributes(): HTMLElement | null;
        }

        /* end of Stacks classes */

        /* Interfaces */

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

        interface TooltipOptions {
            /** The position to place the tooltip */
            placement: AllPlacements;
        }

        /* end of interfaces */

        /* Stacks helpers */

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

        /* end of Stacks helpers */
    }
}

export {};
