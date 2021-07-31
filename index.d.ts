import "@stackoverflow/stacks/dist/js/stacks.js";

declare global {
    namespace Stacks {
        class ModalController extends StacksController {
            toggle(dispatcher?: Event | Element | null): void;
            show(dispatcher?: Event | Element | null): void;
            hide(dispatcher?: Event | Element | null): void;
        }

        function showModal(element: HTMLElement): void;
        function hideModal(element: HTMLElement): void;
        function toggleModal(element: HTMLElement): void;

        abstract class BasePopoverController extends StacksController {
            isVisible: boolean;
            isInViewPort: boolean;

            toggle(dispatcher?: Event | Element | null): void;
            show(dispatcher?: Event | Element | null): void;
            hide(dispatcher?: Event | Element | null): void;
        }

        class PopoverController extends BasePopoverController {}

        interface PopoverOptions {
            toggleOnClick?: boolean;
            placement?: string;
            autoShow?: boolean;
        }

        interface GetPopoverResult {
            isPopover: boolean;
            controller: PopoverController | null;
            referenceElement: Element | null;
            popover: HTMLElement | null;
        }

        function showPopover(element: HTMLElement): void;
        function hidePopover(element: Element): void;
        function attachPopover(
            element: Element,
            popover: Element | string,
            options?: PopoverOptions
        ): void;
        function detachPopover(element: Element): GetPopoverResult["popover"];
        function getPopover(element: Element): GetPopoverResult;
        function toggleController(
            el: Element,
            controllerName: string,
            include: boolean
        ): void;

        class TooltipController extends BasePopoverController {
            scheduleShow(dispatcher: Event | Element | null = null): void;
            applyTitleAttributes(): HTMLElement | null;
        }

        interface TooltipOptions {
            placement: string;
        }

        function setTooltipHtml(
            element: Element,
            html: string,
            options?: TooltipOptions
        ): void;
        function setTooltipText(
            element: Element,
            text: string,
            options?: TooltipOptions
        ): void;
    }
}

export {};
