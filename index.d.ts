import "@stackoverflow/stacks/dist/js/stacks.js";
import "jquery";

declare global {
    namespace CHAT {
        interface User {
            canKick(): boolean;
            canModerate(): boolean;
            canSuperPing(): boolean;
            canTalkDuringTimeout(): boolean;
            getName(): string;
            isLoggedIn(): boolean;
            isOwner(): boolean;
        }

        const CURRENT_ROOM_ID: number;
        const CURRENT_USER_ID: number;
        const IS_LIVE_CHAT: boolean;
        const IS_MOBILE: boolean;
        const LIVE_CHAT_HOST_ID: number;
        const user: User;
    }

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

    // initial definition of the StackExchange global by double-beep https://github.com/double-beep from:
    // https://github.com/SOBotics/AdvancedFlagging/blob/1945787f9d3d01b5aa84bc6cff3f1da358aaf8c0/src/GlobalVars.ts

    namespace StackExchange {
        interface ModalType {
            title: string;
            bodyHtml: string;
            buttonLabel: string;
        }

        const helpers: {
            hideToasts(): void;
            isInNetwork(url: string): boolean;
            parseUrl(url: string): string;
            showConfirmModal(modal: ModalType): Promise<boolean>;
            showModal(popup: JQuery | Element | null): void;
            showToast(
                message: string,
                info: { type: string; transientTimeout: number }
            ): void;
        };

        interface UserInfo {
            fkey: string;
            userId: number;
            isModerator: boolean;
            isRegistered: boolean;
            accountId: number;
            canSeeDeletedPosts: boolean;
            gravatar: string;
            keyboardShortcuts: boolean;
            profileUrl: string;
            rep: number;
            tid: string;
            userType: number;
        }

        interface RealtimeInfo {
            active: boolean;
            newest: boolean;
            tagged: boolean;
            staleDisconnectIntervalInHours: number;
        }

        interface SiteInfo {
            childUrl: string;
            cookieDomain: string;
            description: string;
            enableNewTagCreationWarning: boolean;
            enableSocialMediaInSharePopup: boolean;
            id: number;
            insertSpaceAfterNameTabCompletion: boolean;
            isNoticesTabEnabled: boolean;
            name: string;
            negativeVoteScoreFloor: null;
            protocol: "http" | "https";
            styleCodeWithHighlightjs: boolean;
        }

        interface JobPreferences {
            maxNumDeveloperRoles: number;
            maxNumIndustries: number;
        }

        interface Story {
            dislikedTagsMaxLength: number;
            likedTagsMaxLength: number;
            minCompleteBodyLength: number;
        }

        interface Events {
            postEditionSection: { title: 1; body: 2; tags: 3 };
            postType: { question: 1 };
        }

        const options: {
            user: UserInfo;
            jobPreferences: JobPreferences;
            locale: string;
            networkMetaHostname: string;
            realtime: RealtimeInfo;
            routeName: string;
            serverTime: number;
            serverTimeOffsetSec: number;
            events: Events;
            site: SiteInfo;
            story: Story;
            svgIconHash: string;
            svgIconPath: string;
        };

        const comments: {
            uiForPost(comments: JQuery): {
                addShow(value1: boolean, value2: boolean): void;
                showComments(
                    value1: string,
                    value2: string | null,
                    value3: boolean,
                    value4: boolean
                ): void;
            };
        };

        const question: {
            getQuestionId(): number;
            canViewVoteCounts(): boolean;
            scrollToPost(postId: number): boolean;
        };
    }
}

export {};
