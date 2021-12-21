declare global {
    namespace StackOverflow {
        namespace Models {
            enum PostTypeId {
                Question = 1,
                Answer = 2,
                Wiki = 3,
                TagWikiExcerpt = 4,
                TagWiki = 5,
                ModeratorNomination = 6,
                WikiPlaceholder = 7,
                PrivilegeWiki = 8,
                Article = 9,
                HelpArticle = 10
            }

            enum NotificationFrequencyTypeId {
                None = 0,
                FifteenMinutes = 1,
                Daily = 2
            }

            enum AccountPreferenceFlags {
                None = 0,
                HideLeftNavigation = 1,
                EnableKeyboardShortcuts = 2,
                HideHotNetworkQuestionsSidebar = 8,
                DisableNewsletterPersonalization = 16,
                DismissFreemiumTeamsCreationCTA = 32,
                UnifiedSearchActiveByDefault = 64,
                DismissReviewQueueNoticeCampaign = 128,
                ForYouUnreadOnlyByDefault = 256
            }

            enum UserFlags {
                None = 0,
                TeamGuide = 1,
                DismissMarkdownEditorHelp = 2,
                HideLeftNavigation = 4,
                DismissMentionsCallout = 8,
                DismissQuestionPageProductBanner = 16,
                DismissWelcomeModal = 32,
                DismissCloseReopenPrivilegePopover = 64,
                DismissCloseReopenPrivilegeExplanationModal = 128,
                DismissPostReactionIntroPopover = 256,
                DismissFollowQuestionIntroPopover = 512,
                DismissClosedEditModal = 1024,
                DismissModalForCompletedEditOnClosedQuestion = 2048,
                DismissAddAdminNotice = 4096,
                ShowReviewQueueNotice = 8192,
                ReviewQueueNoticeIsForCampaign = 16384,
                DismissReviewOnboarding = 32768,
                ShowNewReviewerOnboarding = 65536,
                DismissModalForFirstPostQueue = 131072,
                DismissModalForLateAnswerQueue = 262144,
                DismissModalForCloseVoteQueue = 524288,
                DismissModalForReopenVoteQueue = 1048576,
                DismissModalForTriageQueue = 2097152,
                DismissModalForHelperQueue = 4194304,
                DismissModalForSuggestedEditQueue = 8388608,
                DismissModalForLowQualityPostQueue = 16777216,
                DismissModalForFirstQuestionsQueue = 33554432,
                DismissModalForFirstAnswersQueue = 67108864,
                DismissModalForContentHealthQueue = 134217728,
                IsShareFeedbackDefaultSelf = 268435456,
                DisableSideNav = 1073741824,
            }
        }
    }
}

export { };
