// StackExchange's Svg helper, official documentation here: https://stackoverflow.design/product/resources/icons/
// source code here: https://dev.stackoverflow.com/content/Js/full.en.js

// The way the object/class works is rather confusing:
// At first, Svg.<svgName> are assigned to GetImage()
// GetImage() (initialises) and returns a property called _placeholder
// Before .init() is called, _placeholder is a function that throws when it's called
// When it's called, it becomes a function that returns an SVG placeholder (see below)
// In addition, with the call to .init(), all Svg.<svgName> are assigned to actual Svg getters (based on their name)

// When Svg.<svgName> methods are called, Stack returns a placeholder and queues the request to the server
// When that request is complete, the element is updated, its outerHTML is saved as a string in cache,
// and future calls will immediately return the actual jQuery SVG element

/*
Script to update the SVG name types:

let excludeProperties = [
    '_placeholder', 'init', 'ensureCSS', 'get', 'GetImage', 'cssAdded', 'cache', 'cacheBreaker', 'rootPath'
];
let getOfficialDocUrl = (name) => `https://stackoverflow.design/product/resources/icons/#${name.toLowerCase()}`;
console.log(
    Object
        .keys(Svg)
        .filter(svgName => !excludeProperties.includes(svgName))
        .map(svgName =>
`/**
 * Returns the ${svgName} SVG icon
 * @link ${getOfficialDocUrl(svgName)}
 *\/
function ${svgName}(): JQuery<SVGElement>;`)
        .join('\n')
        .split('\n')
        .map(line => `        ${line}`)
        .join('\n')
);
*/

declare global {
    namespace Svg {
        /**
         * Initialise the Svg class
         * @param rootPath Where to fetch the SVG's from {@see StackExchange.options.svgIconPath}
         * @param cacheBreaker A (random) string apparently used for cache-busting {@see StackExchange.options.svgIconHash}
         */
        function init(
            rootPath: string,
            cacheBreaker: string
        ): void;
        /** Append placeholder's styles to head if it hasn't already been done */
        function ensureCSS(): void;
        /**
         * Get a specific icon given its name
         * @param name The SVG's name
         */
        function get(name: string): JQuery<SVGElement>;
        /** Returns the Svg._placeholder property and sets it if not already done */
        function GetImage(): JQuery<SVGElement>;
        /** Returns a placeholder SVG or an error if .init() hasn't been called yet */
        function _placeholder(): Error | JQuery<SVGElement>;
        /** Whether the placeholder styles have been appended to head */
        const cssAdded: boolean;
        /** Where all the items fetched from the server are stored */
        const cache: {
            [key: string]: string; // key is the Svg's name, value is the SVG's HTML as a string
        };
        /** A (random) string apparently used for cache-busting {@see StackExchange.options.svgIconHash} */
        const cacheBreaker: string | undefined;
        /** Where to fetch the SVG's from {@see StackExchange.options.svgIconPath} */
        const rootPath: string | undefined;

        // ------------------------------------------------------------------------
        // - The icon names, run the script above in console and paste the output -
        // ------------------------------------------------------------------------

        /**
         * Returns the Achievements SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#achievements
         */
        function Achievements(): JQuery<SVGElement>;
        /**
         * Returns the AchievementsSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#achievementssm
         */
        function AchievementsSm(): JQuery<SVGElement>;
        /**
         * Returns the Alert SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#alert
         */
        function Alert(): JQuery<SVGElement>;
        /**
         * Returns the AlertCircle SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#alertcircle
         */
        function AlertCircle(): JQuery<SVGElement>;
        /**
         * Returns the AlertCircleSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#alertcirclesm
         */
        function AlertCircleSm(): JQuery<SVGElement>;
        /**
         * Returns the AlertSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#alertsm
         */
        function AlertSm(): JQuery<SVGElement>;
        /**
         * Returns the Answer SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#answer
         */
        function Answer(): JQuery<SVGElement>;
        /**
         * Returns the Approve SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#approve
         */
        function Approve(): JQuery<SVGElement>;
        /**
         * Returns the ArrowDoubleDown SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#arrowdoubledown
         */
        function ArrowDoubleDown(): JQuery<SVGElement>;
        /**
         * Returns the ArrowDoubleUp SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#arrowdoubleup
         */
        function ArrowDoubleUp(): JQuery<SVGElement>;
        /**
         * Returns the ArrowDown SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#arrowdown
         */
        function ArrowDown(): JQuery<SVGElement>;
        /**
         * Returns the ArrowDownAlt SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#arrowdownalt
         */
        function ArrowDownAlt(): JQuery<SVGElement>;
        /**
         * Returns the ArrowDownLg SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#arrowdownlg
         */
        function ArrowDownLg(): JQuery<SVGElement>;
        /**
         * Returns the ArrowDownSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#arrowdownsm
         */
        function ArrowDownSm(): JQuery<SVGElement>;
        /**
         * Returns the ArrowLeft SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#arrowleft
         */
        function ArrowLeft(): JQuery<SVGElement>;
        /**
         * Returns the ArrowLeftAlt SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#arrowleftalt
         */
        function ArrowLeftAlt(): JQuery<SVGElement>;
        /**
         * Returns the ArrowLeftSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#arrowleftsm
         */
        function ArrowLeftSm(): JQuery<SVGElement>;
        /**
         * Returns the ArrowRight SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#arrowright
         */
        function ArrowRight(): JQuery<SVGElement>;
        /**
         * Returns the ArrowRightAlt SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#arrowrightalt
         */
        function ArrowRightAlt(): JQuery<SVGElement>;
        /**
         * Returns the ArrowRightAltSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#arrowrightaltsm
         */
        function ArrowRightAltSm(): JQuery<SVGElement>;
        /**
         * Returns the ArrowRightSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#arrowrightsm
         */
        function ArrowRightSm(): JQuery<SVGElement>;
        /**
         * Returns the ArrowUp SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#arrowup
         */
        function ArrowUp(): JQuery<SVGElement>;
        /**
         * Returns the ArrowUpAlt SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#arrowupalt
         */
        function ArrowUpAlt(): JQuery<SVGElement>;
        /**
         * Returns the ArrowUpDown SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#arrowupdown
         */
        function ArrowUpDown(): JQuery<SVGElement>;
        /**
         * Returns the ArrowUpDownSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#arrowupdownsm
         */
        function ArrowUpDownSm(): JQuery<SVGElement>;
        /**
         * Returns the ArrowUpLg SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#arrowuplg
         */
        function ArrowUpLg(): JQuery<SVGElement>;
        /**
         * Returns the ArrowUpSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#arrowupsm
         */
        function ArrowUpSm(): JQuery<SVGElement>;
        /**
         * Returns the Badge SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#badge
         */
        function Badge(): JQuery<SVGElement>;
        /**
         * Returns the Balloon SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#balloon
         */
        function Balloon(): JQuery<SVGElement>;
        /**
         * Returns the Bell SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#bell
         */
        function Bell(): JQuery<SVGElement>;
        /**
         * Returns the Bold SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#bold
         */
        function Bold(): JQuery<SVGElement>;
        /**
         * Returns the Book SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#book
         */
        function Book(): JQuery<SVGElement>;
        /**
         * Returns the Briefcase SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#briefcase
         */
        function Briefcase(): JQuery<SVGElement>;
        /**
         * Returns the BriefcaseSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#briefcasesm
         */
        function BriefcaseSm(): JQuery<SVGElement>;
        /**
         * Returns the Bullhorn SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#bullhorn
         */
        function Bullhorn(): JQuery<SVGElement>;
        /**
         * Returns the BullhornSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#bullhornsm
         */
        function BullhornSm(): JQuery<SVGElement>;
        /**
         * Returns the Calendar SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#calendar
         */
        function Calendar(): JQuery<SVGElement>;
        /**
         * Returns the Chair SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#chair
         */
        function Chair(): JQuery<SVGElement>;
        /**
         * Returns the Checkmark SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#checkmark
         */
        function Checkmark(): JQuery<SVGElement>;
        /**
         * Returns the CheckmarkLg SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#checkmarklg
         */
        function CheckmarkLg(): JQuery<SVGElement>;
        /**
         * Returns the CheckmarkSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#checkmarksm
         */
        function CheckmarkSm(): JQuery<SVGElement>;
        /**
         * Returns the Clap SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#clap
         */
        function Clap(): JQuery<SVGElement>;
        /**
         * Returns the Clear SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#clear
         */
        function Clear(): JQuery<SVGElement>;
        /**
         * Returns the ClearSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#clearsm
         */
        function ClearSm(): JQuery<SVGElement>;
        /**
         * Returns the Clock SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#clock
         */
        function Clock(): JQuery<SVGElement>;
        /**
         * Returns the Code SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#code
         */
        function Code(): JQuery<SVGElement>;
        /**
         * Returns the Coins SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#coins
         */
        function Coins(): JQuery<SVGElement>;
        /**
         * Returns the Columns SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#columns
         */
        function Columns(): JQuery<SVGElement>;
        /**
         * Returns the Computer SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#computer
         */
        function Computer(): JQuery<SVGElement>;
        /**
         * Returns the Copy SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#copy
         */
        function Copy(): JQuery<SVGElement>;
        /**
         * Returns the CreditCard SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#creditcard
         */
        function CreditCard(): JQuery<SVGElement>;
        /**
         * Returns the Crosshairs SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#crosshairs
         */
        function Crosshairs(): JQuery<SVGElement>;
        /**
         * Returns the Currency SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#currency
         */
        function Currency(): JQuery<SVGElement>;
        /**
         * Returns the DevTo SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#devto
         */
        function DevTo(): JQuery<SVGElement>;
        /**
         * Returns the Document SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#document
         */
        function Document(): JQuery<SVGElement>;
        /**
         * Returns the Download SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#download
         */
        function Download(): JQuery<SVGElement>;
        /**
         * Returns the DownloadSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#downloadsm
         */
        function DownloadSm(): JQuery<SVGElement>;
        /**
         * Returns the Dropbox SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#dropbox
         */
        function Dropbox(): JQuery<SVGElement>;
        /**
         * Returns the EllipsisHorizontal SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#ellipsishorizontal
         */
        function EllipsisHorizontal(): JQuery<SVGElement>;
        /**
         * Returns the EllipsisVertical SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#ellipsisvertical
         */
        function EllipsisVertical(): JQuery<SVGElement>;
        /**
         * Returns the Eye SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#eye
         */
        function Eye(): JQuery<SVGElement>;
        /**
         * Returns the EyeOff SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#eyeoff
         */
        function EyeOff(): JQuery<SVGElement>;
        /**
         * Returns the Eyes SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#eyes
         */
        function Eyes(): JQuery<SVGElement>;
        /**
         * Returns the Facebook SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#facebook
         */
        function Facebook(): JQuery<SVGElement>;
        /**
         * Returns the FaceFrown SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#facefrown
         */
        function FaceFrown(): JQuery<SVGElement>;
        /**
         * Returns the FaceJoy SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#facejoy
         */
        function FaceJoy(): JQuery<SVGElement>;
        /**
         * Returns the FaceMindBlown SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#facemindblown
         */
        function FaceMindBlown(): JQuery<SVGElement>;
        /**
         * Returns the FaceNeutral SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#faceneutral
         */
        function FaceNeutral(): JQuery<SVGElement>;
        /**
         * Returns the FaceSad SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#facesad
         */
        function FaceSad(): JQuery<SVGElement>;
        /**
         * Returns the FaceShocked SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#faceshocked
         */
        function FaceShocked(): JQuery<SVGElement>;
        /**
         * Returns the FaceSmile SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#facesmile
         */
        function FaceSmile(): JQuery<SVGElement>;
        /**
         * Returns the Female SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#female
         */
        function Female(): JQuery<SVGElement>;
        /**
         * Returns the Fire SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#fire
         */
        function Fire(): JQuery<SVGElement>;
        /**
         * Returns the FireSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#firesm
         */
        function FireSm(): JQuery<SVGElement>;
        /**
         * Returns the Fitness SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#fitness
         */
        function Fitness(): JQuery<SVGElement>;
        /**
         * Returns the Flag SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#flag
         */
        function Flag(): JQuery<SVGElement>;
        /**
         * Returns the FlagSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#flagsm
         */
        function FlagSm(): JQuery<SVGElement>;
        /**
         * Returns the Float SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#float
         */
        function Float(): JQuery<SVGElement>;
        /**
         * Returns the Food SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#food
         */
        function Food(): JQuery<SVGElement>;
        /**
         * Returns the Gear SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#gear
         */
        function Gear(): JQuery<SVGElement>;
        /**
         * Returns the GearSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#gearsm
         */
        function GearSm(): JQuery<SVGElement>;
        /**
         * Returns the GitHub SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#github
         */
        function GitHub(): JQuery<SVGElement>;
        /**
         * Returns the Gitlab SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#gitlab
         */
        function Gitlab(): JQuery<SVGElement>;
        /**
         * Returns the Globe SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#globe
         */
        function Globe(): JQuery<SVGElement>;
        /**
         * Returns the Google SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#google
         */
        function Google(): JQuery<SVGElement>;
        /**
         * Returns the GoogleDrive SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#googledrive
         */
        function GoogleDrive(): JQuery<SVGElement>;
        /**
         * Returns the Grabber SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#grabber
         */
        function Grabber(): JQuery<SVGElement>;
        /**
         * Returns the Graph SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#graph
         */
        function Graph(): JQuery<SVGElement>;
        /**
         * Returns the Grid SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#grid
         */
        function Grid(): JQuery<SVGElement>;
        /**
         * Returns the Hamburger SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#hamburger
         */
        function Hamburger(): JQuery<SVGElement>;
        /**
         * Returns the HandNice SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#handnice
         */
        function HandNice(): JQuery<SVGElement>;
        /**
         * Returns the HandPointRight SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#handpointright
         */
        function HandPointRight(): JQuery<SVGElement>;
        /**
         * Returns the HandRock SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#handrock
         */
        function HandRock(): JQuery<SVGElement>;
        /**
         * Returns the HandsTogether SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#handstogether
         */
        function HandsTogether(): JQuery<SVGElement>;
        /**
         * Returns the Header SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#header
         */
        function Header(): JQuery<SVGElement>;
        /**
         * Returns the Health SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#health
         */
        function Health(): JQuery<SVGElement>;
        /**
         * Returns the Heart SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#heart
         */
        function Heart(): JQuery<SVGElement>;
        /**
         * Returns the Help SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#help
         */
        function Help(): JQuery<SVGElement>;
        /**
         * Returns the HelpSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#helpsm
         */
        function HelpSm(): JQuery<SVGElement>;
        /**
         * Returns the History SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#history
         */
        function History(): JQuery<SVGElement>;
        /**
         * Returns the Home SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#home
         */
        function Home(): JQuery<SVGElement>;
        /**
         * Returns the HorizontalRule SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#horizontalrule
         */
        function HorizontalRule(): JQuery<SVGElement>;
        /**
         * Returns the Hundred SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#hundred
         */
        function Hundred(): JQuery<SVGElement>;
        /**
         * Returns the Image SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#image
         */
        function Image(): JQuery<SVGElement>;
        /**
         * Returns the Inbox SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#inbox
         */
        function Inbox(): JQuery<SVGElement>;
        /**
         * Returns the Indent SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#indent
         */
        function Indent(): JQuery<SVGElement>;
        /**
         * Returns the Industry SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#industry
         */
        function Industry(): JQuery<SVGElement>;
        /**
         * Returns the Info SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#info
         */
        function Info(): JQuery<SVGElement>;
        /**
         * Returns the InfoSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#infosm
         */
        function InfoSm(): JQuery<SVGElement>;
        /**
         * Returns the International SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#international
         */
        function International(): JQuery<SVGElement>;
        /**
         * Returns the Italic SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#italic
         */
        function Italic(): JQuery<SVGElement>;
        /**
         * Returns the Jira SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#jira
         */
        function Jira(): JQuery<SVGElement>;
        /**
         * Returns the Key SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#key
         */
        function Key(): JQuery<SVGElement>;
        /**
         * Returns the Laptop SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#laptop
         */
        function Laptop(): JQuery<SVGElement>;
        /**
         * Returns the LaunchPad SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#launchpad
         */
        function LaunchPad(): JQuery<SVGElement>;
        /**
         * Returns the Lightbulb SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#lightbulb
         */
        function Lightbulb(): JQuery<SVGElement>;
        /**
         * Returns the Link SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#link
         */
        function Link(): JQuery<SVGElement>;
        /**
         * Returns the LinkedIn SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#linkedin
         */
        function LinkedIn(): JQuery<SVGElement>;
        /**
         * Returns the Location SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#location
         */
        function Location(): JQuery<SVGElement>;
        /**
         * Returns the Lock SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#lock
         */
        function Lock(): JQuery<SVGElement>;
        /**
         * Returns the LockSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#locksm
         */
        function LockSm(): JQuery<SVGElement>;
        /**
         * Returns the Logo SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logo
         */
        function Logo(): JQuery<SVGElement>;
        /**
         * Returns the LogoEnterprise SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logoenterprise
         */
        function LogoEnterprise(): JQuery<SVGElement>;
        /**
         * Returns the LogoEnterpriseWordmarkSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logoenterprisewordmarksm
         */
        function LogoEnterpriseWordmarkSm(): JQuery<SVGElement>;
        /**
         * Returns the LogoGlyph SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logoglyph
         */
        function LogoGlyph(): JQuery<SVGElement>;
        /**
         * Returns the LogoGlyphMd SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logoglyphmd
         */
        function LogoGlyphMd(): JQuery<SVGElement>;
        /**
         * Returns the LogoGlyphSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logoglyphsm
         */
        function LogoGlyphSm(): JQuery<SVGElement>;
        /**
         * Returns the LogoGlyphXSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logoglyphxsm
         */
        function LogoGlyphXSm(): JQuery<SVGElement>;
        /**
         * Returns the LogoGlyphXxs SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logoglyphxxs
         */
        function LogoGlyphXxs(): JQuery<SVGElement>;
        /**
         * Returns the LogoJobs SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logojobs
         */
        function LogoJobs(): JQuery<SVGElement>;
        /**
         * Returns the LogoMd SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logomd
         */
        function LogoMd(): JQuery<SVGElement>;
        /**
         * Returns the LogoSE SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logose
         */
        function LogoSE(): JQuery<SVGElement>;
        /**
         * Returns the LogoSEAlternativeSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logosealternativesm
         */
        function LogoSEAlternativeSm(): JQuery<SVGElement>;
        /**
         * Returns the LogoSEGlyphMd SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logoseglyphmd
         */
        function LogoSEGlyphMd(): JQuery<SVGElement>;
        /**
         * Returns the LogoSEXxs SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logosexxs
         */
        function LogoSEXxs(): JQuery<SVGElement>;
        /**
         * Returns the LogoSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logosm
         */
        function LogoSm(): JQuery<SVGElement>;
        /**
         * Returns the LogoTalent SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logotalent
         */
        function LogoTalent(): JQuery<SVGElement>;
        /**
         * Returns the LogoTeams SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logoteams
         */
        function LogoTeams(): JQuery<SVGElement>;
        /**
         * Returns the LogoTeamsAlt SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logoteamsalt
         */
        function LogoTeamsAlt(): JQuery<SVGElement>;
        /**
         * Returns the LogoTeamsAltMd SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logoteamsaltmd
         */
        function LogoTeamsAltMd(): JQuery<SVGElement>;
        /**
         * Returns the LogoWordmark SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logowordmark
         */
        function LogoWordmark(): JQuery<SVGElement>;
        /**
         * Returns the LogoWordmarkMd SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logowordmarkmd
         */
        function LogoWordmarkMd(): JQuery<SVGElement>;
        /**
         * Returns the LogoWordmarkSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logowordmarksm
         */
        function LogoWordmarkSm(): JQuery<SVGElement>;
        /**
         * Returns the Mail SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#mail
         */
        function Mail(): JQuery<SVGElement>;
        /**
         * Returns the Medal SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#medal
         */
        function Medal(): JQuery<SVGElement>;
        /**
         * Returns the Merge SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#merge
         */
        function Merge(): JQuery<SVGElement>;
        /**
         * Returns the Message SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#message
         */
        function Message(): JQuery<SVGElement>;
        /**
         * Returns the Microsoft SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#microsoft
         */
        function Microsoft(): JQuery<SVGElement>;
        /**
         * Returns the Migrate SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#migrate
         */
        function Migrate(): JQuery<SVGElement>;
        /**
         * Returns the Milestone SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#milestone
         */
        function Milestone(): JQuery<SVGElement>;
        /**
         * Returns the Minus SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#minus
         */
        function Minus(): JQuery<SVGElement>;
        /**
         * Returns the MinusSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#minussm
         */
        function MinusSm(): JQuery<SVGElement>;
        /**
         * Returns the Moderator SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#moderator
         */
        function Moderator(): JQuery<SVGElement>;
        /**
         * Returns the ModeratorSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#moderatorsm
         */
        function ModeratorSm(): JQuery<SVGElement>;
        /**
         * Returns the Money SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#money
         */
        function Money(): JQuery<SVGElement>;
        /**
         * Returns the NotInterested SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#notinterested
         */
        function NotInterested(): JQuery<SVGElement>;
        /**
         * Returns the OpenSource SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#opensource
         */
        function OpenSource(): JQuery<SVGElement>;
        /**
         * Returns the OrderedList SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#orderedlist
         */
        function OrderedList(): JQuery<SVGElement>;
        /**
         * Returns the Outdent SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#outdent
         */
        function Outdent(): JQuery<SVGElement>;
        /**
         * Returns the Paperclip SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#paperclip
         */
        function Paperclip(): JQuery<SVGElement>;
        /**
         * Returns the Peak SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#peak
         */
        function Peak(): JQuery<SVGElement>;
        /**
         * Returns the Pencil SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#pencil
         */
        function Pencil(): JQuery<SVGElement>;
        /**
         * Returns the PencilSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#pencilsm
         */
        function PencilSm(): JQuery<SVGElement>;
        /**
         * Returns the People SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#people
         */
        function People(): JQuery<SVGElement>;
        /**
         * Returns the Person SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#person
         */
        function Person(): JQuery<SVGElement>;
        /**
         * Returns the Phone SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#phone
         */
        function Phone(): JQuery<SVGElement>;
        /**
         * Returns the Play SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#play
         */
        function Play(): JQuery<SVGElement>;
        /**
         * Returns the Plus SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#plus
         */
        function Plus(): JQuery<SVGElement>;
        /**
         * Returns the PlusOne SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#plusone
         */
        function PlusOne(): JQuery<SVGElement>;
        /**
         * Returns the PlusSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#plussm
         */
        function PlusSm(): JQuery<SVGElement>;
        /**
         * Returns the PromoteDemote SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#promotedemote
         */
        function PromoteDemote(): JQuery<SVGElement>;
        /**
         * Returns the Question SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#question
         */
        function Question(): JQuery<SVGElement>;
        /**
         * Returns the Quote SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#quote
         */
        function Quote(): JQuery<SVGElement>;
        /**
         * Returns the Refresh SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#refresh
         */
        function Refresh(): JQuery<SVGElement>;
        /**
         * Returns the RefreshSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#refreshsm
         */
        function RefreshSm(): JQuery<SVGElement>;
        /**
         * Returns the Relocation SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#relocation
         */
        function Relocation(): JQuery<SVGElement>;
        /**
         * Returns the Remote SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#remote
         */
        function Remote(): JQuery<SVGElement>;
        /**
         * Returns the ReviewQueue SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#reviewqueue
         */
        function ReviewQueue(): JQuery<SVGElement>;
        /**
         * Returns the Rss SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#rss
         */
        function Rss(): JQuery<SVGElement>;
        /**
         * Returns the School SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#school
         */
        function School(): JQuery<SVGElement>;
        /**
         * Returns the SchoolSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#schoolsm
         */
        function SchoolSm(): JQuery<SVGElement>;
        /**
         * Returns the Search SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#search
         */
        function Search(): JQuery<SVGElement>;
        /**
         * Returns the SearchSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#searchsm
         */
        function SearchSm(): JQuery<SVGElement>;
        /**
         * Returns the Share SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#share
         */
        function Share(): JQuery<SVGElement>;
        /**
         * Returns the ShareSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#sharesm
         */
        function ShareSm(): JQuery<SVGElement>;
        /**
         * Returns the Shield SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#shield
         */
        function Shield(): JQuery<SVGElement>;
        /**
         * Returns the ShieldSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#shieldsm
         */
        function ShieldSm(): JQuery<SVGElement>;
        /**
         * Returns the ShieldXSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#shieldxsm
         */
        function ShieldXSm(): JQuery<SVGElement>;
        /**
         * Returns the Skull SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#skull
         */
        function Skull(): JQuery<SVGElement>;
        /**
         * Returns the Slack SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#slack
         */
        function Slack(): JQuery<SVGElement>;
        /**
         * Returns the SmartPhone SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#smartphone
         */
        function SmartPhone(): JQuery<SVGElement>;
        /**
         * Returns the SOS SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#sos
         */
        function SOS(): JQuery<SVGElement>;
        /**
         * Returns the SpeechBubble SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#speechbubble
         */
        function SpeechBubble(): JQuery<SVGElement>;
        /**
         * Returns the SpeechBubbleError SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#speechbubbleerror
         */
        function SpeechBubbleError(): JQuery<SVGElement>;
        /**
         * Returns the SpeechBubbleSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#speechbubblesm
         */
        function SpeechBubbleSm(): JQuery<SVGElement>;
        /**
         * Returns the StackExchange SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#stackexchange
         */
        function StackExchange(): JQuery<SVGElement>;
        /**
         * Returns the Star SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#star
         */
        function Star(): JQuery<SVGElement>;
        /**
         * Returns the Stroller SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#stroller
         */
        function Stroller(): JQuery<SVGElement>;
        /**
         * Returns the Subway SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#subway
         */
        function Subway(): JQuery<SVGElement>;
        /**
         * Returns the Sync SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#sync
         */
        function Sync(): JQuery<SVGElement>;
        /**
         * Returns the Tack SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#tack
         */
        function Tack(): JQuery<SVGElement>;
        /**
         * Returns the Tada SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#tada
         */
        function Tada(): JQuery<SVGElement>;
        /**
         * Returns the ThumbsDown SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#thumbsdown
         */
        function ThumbsDown(): JQuery<SVGElement>;
        /**
         * Returns the ThumbsUp SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#thumbsup
         */
        function ThumbsUp(): JQuery<SVGElement>;
        /**
         * Returns the TIL SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#til
         */
        function TIL(): JQuery<SVGElement>;
        /**
         * Returns the Tool SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#tool
         */
        function Tool(): JQuery<SVGElement>;
        /**
         * Returns the Trash SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#trash
         */
        function Trash(): JQuery<SVGElement>;
        /**
         * Returns the TrashSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#trashsm
         */
        function TrashSm(): JQuery<SVGElement>;
        /**
         * Returns the TrendingDown SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#trendingdown
         */
        function TrendingDown(): JQuery<SVGElement>;
        /**
         * Returns the TrendingNone SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#trendingnone
         */
        function TrendingNone(): JQuery<SVGElement>;
        /**
         * Returns the TrendingUp SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#trendingup
         */
        function TrendingUp(): JQuery<SVGElement>;
        /**
         * Returns the Twitter SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#twitter
         */
        function Twitter(): JQuery<SVGElement>;
        /**
         * Returns the Undo SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#undo
         */
        function Undo(): JQuery<SVGElement>;
        /**
         * Returns the UndoSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#undosm
         */
        function UndoSm(): JQuery<SVGElement>;
        /**
         * Returns the UnorderedList SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#unorderedlist
         */
        function UnorderedList(): JQuery<SVGElement>;
        /**
         * Returns the Vacation SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#vacation
         */
        function Vacation(): JQuery<SVGElement>;
        /**
         * Returns the VK SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#vk
         */
        function VK(): JQuery<SVGElement>;
        /**
         * Returns the Wave SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#wave
         */
        function Wave(): JQuery<SVGElement>;
        /**
         * Returns the Yandex SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#yandex
         */
        function Yandex(): JQuery<SVGElement>;
    }
}

export {};
