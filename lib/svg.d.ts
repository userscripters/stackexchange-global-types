// StackExchange's Svg helper, official documentation here: https://stackoverflow.design/product/resources/icons/
// source code here: https://dev.stackoverflow.com/content/Js/full.en.js
// Number of properties: 228
// Find the number of properties running Object.keys(Svg).length in the console.
// Then find the ones added/removed and edit the count and the types below accordingly

// The way the object/class works is rather confusing:
// At first, Svg.<svgName> are assigned to GetImage()
// GetImage() (initialises) and returns a property called _placeholder
// Before .init() is called, _placeholder is a function that throws when it's called
// When it's called, it becomes a function that returns an SVG placeholder (see below)
// In addition, with the call to .init(), all Svg.<svgName> are assigned to actual Svg getters (based on their name)

// When Svg.<svgName> methods are called, Stack returns a placeholder and queues the request to the server
// When that request is complete, the element is updated, its outerHTML is saved as a string to Svg.cache,
// and future calls will immediately return the actual jQuery SVG element from there

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
const ${svgName}: SvgReturn;`)
        .join('\n')
        .split('\n')
        .map(line => `        ${line}`)
        .join('\n')
);
*/

declare global {
    namespace Svg {
        interface SvgReturn {
            (): JQuery<SVGElement>;
            /**
             * Add classes to the SVG icon
             * @param classnames Space-separated class list
             * @example Instead of `Svg.Bar().addClass("foo")`, you can use `Svg.Bar.With("foo")`
             */
            With(classnames: string): JQuery<SVGElement>;
        }

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
        function GetImage(): SvgReturn;
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
        const Achievements: SvgReturn;
        /**
         * Returns the AchievementsSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#achievementssm
         */
        const AchievementsSm: SvgReturn;
        /**
         * Returns the Alert SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#alert
         */
        const Alert: SvgReturn;
        /**
         * Returns the AlertCircle SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#alertcircle
         */
        const AlertCircle: SvgReturn;
        /**
         * Returns the AlertCircleSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#alertcirclesm
         */
        const AlertCircleSm: SvgReturn;
        /**
         * Returns the AlertSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#alertsm
         */
        const AlertSm: SvgReturn;
        /**
         * Returns the Answer SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#answer
         */
        const Answer: SvgReturn;
        /**
         * Returns the Approve SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#approve
         */
        const Approve: SvgReturn;
        /**
         * Returns the ArrowDoubleDown SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#arrowdoubledown
         */
        const ArrowDoubleDown: SvgReturn;
        /**
         * Returns the ArrowDoubleUp SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#arrowdoubleup
         */
        const ArrowDoubleUp: SvgReturn;
        /**
         * Returns the ArrowDown SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#arrowdown
         */
        const ArrowDown: SvgReturn;
        /**
         * Returns the ArrowDownAlt SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#arrowdownalt
         */
        const ArrowDownAlt: SvgReturn;
        /**
         * Returns the ArrowDownLg SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#arrowdownlg
         */
        const ArrowDownLg: SvgReturn;
        /**
         * Returns the ArrowDownSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#arrowdownsm
         */
        const ArrowDownSm: SvgReturn;
        /**
         * Returns the ArrowLeft SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#arrowleft
         */
        const ArrowLeft: SvgReturn;
        /**
         * Returns the ArrowLeftAlt SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#arrowleftalt
         */
        const ArrowLeftAlt: SvgReturn;
        /**
         * Returns the ArrowLeftSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#arrowleftsm
         */
        const ArrowLeftSm: SvgReturn;
        /**
         * Returns the ArrowRight SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#arrowright
         */
        const ArrowRight: SvgReturn;
        /**
         * Returns the ArrowRightAlt SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#arrowrightalt
         */
        const ArrowRightAlt: SvgReturn;
        /**
         * Returns the ArrowRightAltSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#arrowrightaltsm
         */
        const ArrowRightAltSm: SvgReturn;
        /**
         * Returns the ArrowRightSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#arrowrightsm
         */
        const ArrowRightSm: SvgReturn;
        /**
         * Returns the ArrowUp SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#arrowup
         */
        const ArrowUp: SvgReturn;
        /**
         * Returns the ArrowUpAlt SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#arrowupalt
         */
        const ArrowUpAlt: SvgReturn;
        /**
         * Returns the ArrowUpDown SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#arrowupdown
         */
        const ArrowUpDown: SvgReturn;
        /**
         * Returns the ArrowUpDownSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#arrowupdownsm
         */
        const ArrowUpDownSm: SvgReturn;
        /**
         * Returns the ArrowUpLg SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#arrowuplg
         */
        const ArrowUpLg: SvgReturn;
        /**
         * Returns the ArrowUpSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#arrowupsm
         */
        const ArrowUpSm: SvgReturn;
        /**
         * Returns the Badge SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#badge
         */
        const Badge: SvgReturn;
        /**
         * Returns the Balloon SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#balloon
         */
        const Balloon: SvgReturn;
        /**
         * Returns the Bell SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#bell
         */
        const Bell: SvgReturn;
        /**
         * Returns the Bold SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#bold
         */
        const Bold: SvgReturn;
        /**
         * Returns the Book SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#book
         */
        const Book: SvgReturn;
        /**
         * Returns the Briefcase SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#briefcase
         */
        const Briefcase: SvgReturn;
        /**
         * Returns the BriefcaseSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#briefcasesm
         */
        const BriefcaseSm: SvgReturn;
        /**
         * Returns the Bullhorn SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#bullhorn
         */
        const Bullhorn: SvgReturn;
        /**
         * Returns the BullhornSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#bullhornsm
         */
        const BullhornSm: SvgReturn;
        /**
         * Returns the Calendar SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#calendar
         */
        const Calendar: SvgReturn;
        /**
         * Returns the Chair SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#chair
         */
        const Chair: SvgReturn;
        /**
         * Returns the Checkmark SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#checkmark
         */
        const Checkmark: SvgReturn;
        /**
         * Returns the CheckmarkLg SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#checkmarklg
         */
        const CheckmarkLg: SvgReturn;
        /**
         * Returns the CheckmarkSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#checkmarksm
         */
        const CheckmarkSm: SvgReturn;
        /**
         * Returns the Clap SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#clap
         */
        const Clap: SvgReturn;
        /**
         * Returns the Clear SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#clear
         */
        const Clear: SvgReturn;
        /**
         * Returns the ClearSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#clearsm
         */
        const ClearSm: SvgReturn;
        /**
         * Returns the Clock SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#clock
         */
        const Clock: SvgReturn;
        /**
         * Returns the Code SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#code
         */
        const Code: SvgReturn;
        /**
         * Returns the Coins SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#coins
         */
        const Coins: SvgReturn;
        /**
         * Returns the Columns SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#columns
         */
        const Columns: SvgReturn;
        /**
         * Returns the Computer SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#computer
         */
        const Computer: SvgReturn;
        /**
         * Returns the Copy SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#copy
         */
        const Copy: SvgReturn;
        /**
         * Returns the CreditCard SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#creditcard
         */
        const CreditCard: SvgReturn;
        /**
         * Returns the Crosshairs SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#crosshairs
         */
        const Crosshairs: SvgReturn;
        /**
         * Returns the Currency SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#currency
         */
        const Currency: SvgReturn;
        /**
         * Returns the DevTo SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#devto
         */
        const DevTo: SvgReturn;
        /**
         * Returns the Document SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#document
         */
        const Document: SvgReturn;
        /**
         * Returns the Download SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#download
         */
        const Download: SvgReturn;
        /**
         * Returns the DownloadSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#downloadsm
         */
        const DownloadSm: SvgReturn;
        /**
         * Returns the Dropbox SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#dropbox
         */
        const Dropbox: SvgReturn;
        /**
         * Returns the EllipsisHorizontal SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#ellipsishorizontal
         */
        const EllipsisHorizontal: SvgReturn;
        /**
         * Returns the EllipsisVertical SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#ellipsisvertical
         */
        const EllipsisVertical: SvgReturn;
        /**
         * Returns the Eye SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#eye
         */
        const Eye: SvgReturn;
        /**
         * Returns the EyeSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#eyesm
         */
        const EyeSm: SvgReturn;
        /**
         * Returns the EyeOff SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#eyeoff
         */
        const EyeOff: SvgReturn;
        /**
         * Returns the EyeOffSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#eyeoffsm
         */
        const EyeOffSm: SvgReturn;
        /**
         * Returns the Eyes SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#eyes
         */
        const Eyes: SvgReturn;
        /**
         * Returns the Facebook SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#facebook
         */
        const Facebook: SvgReturn;
        /**
         * Returns the FaceFrown SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#facefrown
         */
        const FaceFrown: SvgReturn;
        /**
         * Returns the FaceJoy SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#facejoy
         */
        const FaceJoy: SvgReturn;
        /**
         * Returns the FaceMindBlown SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#facemindblown
         */
        const FaceMindBlown: SvgReturn;
        /**
         * Returns the FaceNeutral SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#faceneutral
         */
        const FaceNeutral: SvgReturn;
        /**
         * Returns the FaceSad SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#facesad
         */
        const FaceSad: SvgReturn;
        /**
         * Returns the FaceShocked SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#faceshocked
         */
        const FaceShocked: SvgReturn;
        /**
         * Returns the FaceSmile SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#facesmile
         */
        const FaceSmile: SvgReturn;
        /**
         * Returns the Female SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#female
         */
        const Female: SvgReturn;
        /**
         * Returns the Fire SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#fire
         */
        const Fire: SvgReturn;
        /**
         * Returns the FireSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#firesm
         */
        const FireSm: SvgReturn;
        /**
         * Returns the Fitness SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#fitness
         */
        const Fitness: SvgReturn;
        /**
         * Returns the Flag SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#flag
         */
        const Flag: SvgReturn;
        /**
         * Returns the FlagSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#flagsm
         */
        const FlagSm: SvgReturn;
        /**
         * Returns the Float SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#float
         */
        const Float: SvgReturn;
        /**
         * Returns the Food SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#food
         */
        const Food: SvgReturn;
        /**
         * Returns the Gear SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#gear
         */
        const Gear: SvgReturn;
        /**
         * Returns the GearSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#gearsm
         */
        const GearSm: SvgReturn;
        /**
         * Returns the GitHub SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#github
         */
        const GitHub: SvgReturn;
        /**
         * Returns the Gitlab SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#gitlab
         */
        const Gitlab: SvgReturn;
        /**
         * Returns the Globe SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#globe
         */
        const Globe: SvgReturn;
        /**
         * Returns the Google SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#google
         */
        const Google: SvgReturn;
        /**
         * Returns the GoogleDrive SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#googledrive
         */
        const GoogleDrive: SvgReturn;
        /**
         * Returns the Grabber SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#grabber
         */
        const Grabber: SvgReturn;
        /**
         * Returns the Graph SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#graph
         */
        const Graph: SvgReturn;
        /**
         * Returns the Grid SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#grid
         */
        const Grid: SvgReturn;
        /**
         * Returns the Hamburger SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#hamburger
         */
        const Hamburger: SvgReturn;
        /**
         * Returns the HandNice SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#handnice
         */
        const HandNice: SvgReturn;
        /**
         * Returns the HandPointRight SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#handpointright
         */
        const HandPointRight: SvgReturn;
        /**
         * Returns the HandRock SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#handrock
         */
        const HandRock: SvgReturn;
        /**
         * Returns the HandsTogether SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#handstogether
         */
        const HandsTogether: SvgReturn;
        /**
         * Returns the Header SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#header
         */
        const Header: SvgReturn;
        /**
         * Returns the Health SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#health
         */
        const Health: SvgReturn;
        /**
         * Returns the Heart SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#heart
         */
        const Heart: SvgReturn;
        /**
         * Returns the Help SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#help
         */
        const Help: SvgReturn;
        /**
         * Returns the HelpSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#helpsm
         */
        const HelpSm: SvgReturn;
        /**
         * Returns the History SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#history
         */
        const History: SvgReturn;
        /**
         * Returns the Home SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#home
         */
        const Home: SvgReturn;
        /**
         * Returns the HorizontalRule SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#horizontalrule
         */
        const HorizontalRule: SvgReturn;
        /**
         * Returns the Hundred SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#hundred
         */
        const Hundred: SvgReturn;
        /**
         * Returns the Image SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#image
         */
        const Image: SvgReturn;
        /**
         * Returns the Inbox SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#inbox
         */
        const Inbox: SvgReturn;
        /**
         * Returns the Indent SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#indent
         */
        const Indent: SvgReturn;
        /**
         * Returns the Industry SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#industry
         */
        const Industry: SvgReturn;
        /**
         * Returns the Info SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#info
         */
        const Info: SvgReturn;
        /**
         * Returns the InfoSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#infosm
         */
        const InfoSm: SvgReturn;
        /**
         * Returns the International SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#international
         */
        const International: SvgReturn;
        /**
         * Returns the Italic SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#italic
         */
        const Italic: SvgReturn;
        /**
         * Returns the Jira SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#jira
         */
        const Jira: SvgReturn;
        /**
         * Returns the Key SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#key
         */
        const Key: SvgReturn;
        /**
         * Returns the Laptop SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#laptop
         */
        const Laptop: SvgReturn;
        /**
         * Returns the LaunchPad SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#launchpad
         */
        const LaunchPad: SvgReturn;
        /**
         * Returns the Lightbulb SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#lightbulb
         */
        const Lightbulb: SvgReturn;
        /**
         * Returns the Link SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#link
         */
        const Link: SvgReturn;
        /**
         * Returns the LinkedIn SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#linkedin
         */
        const LinkedIn: SvgReturn;
        /**
         * Returns the Location SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#location
         */
        const Location: SvgReturn;
        /**
         * Returns the Lock SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#lock
         */
        const Lock: SvgReturn;
        /**
         * Returns the LockSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#locksm
         */
        const LockSm: SvgReturn;
        /**
         * Returns the Logo SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logo
         */
        const Logo: SvgReturn;
        /**
         * Returns the LogoGlyph SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logoglyph
         */
        const LogoGlyph: SvgReturn;
        /**
         * Returns the LogoGlyphMd SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logoglyphmd
         */
        const LogoGlyphMd: SvgReturn;
        /**
         * Returns the LogoGlyphSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logoglyphsm
         */
        const LogoGlyphSm: SvgReturn;
        /**
         * Returns the LogoGlyphXSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logoglyphxsm
         */
        const LogoGlyphXSm: SvgReturn;
        /**
         * Returns the LogoGlyphXxs SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logoglyphxxs
         */
        const LogoGlyphXxs: SvgReturn;
        /**
         * Returns the LogoMd SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logomd
         */
        const LogoMd: SvgReturn;
        /**
         * Returns the LogoSE SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logose
         */
        const LogoSE: SvgReturn;
        /**
         * Returns the LogoSEAlternativeSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logosealternativesm
         */
        const LogoSEAlternativeSm: SvgReturn;
        /**
         * Returns the LogoSEGlyphMd SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logoseglyphmd
         */
        const LogoSEGlyphMd: SvgReturn;
        /**
         * Returns the LogoSEXxs SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logosexxs
         */
        const LogoSEXxs: SvgReturn;
        /**
         * Returns the LogoSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logosm
         */
        const LogoSm: SvgReturn;
        /**
         * Returns the LogoTalent SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logotalent
         */
        const LogoTalent: SvgReturn;
        /**
         * Returns the LogoTeams SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logoteams
         */
        const LogoTeams: SvgReturn;
        /**
         * Returns the LogoTeamsAlt SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logoteamsalt
         */
        const LogoTeamsAlt: SvgReturn;
        /**
         * Returns the LogoTeamsAltMd SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logoteamsaltmd
         */
        const LogoTeamsAltMd: SvgReturn;
        /**
         * Returns the LogoWordmark SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logowordmark
         */
        const LogoWordmark: SvgReturn;
        /**
         * Returns the LogoWordmarkMd SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logowordmarkmd
         */
        const LogoWordmarkMd: SvgReturn;
        /**
         * Returns the LogoWordmarkSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#logowordmarksm
         */
        const LogoWordmarkSm: SvgReturn;
        /**
         * Returns the Mail SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#mail
         */
        const Mail: SvgReturn;
        /**
         * Returns the MailSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#mailsm
         */
        const MailSm: SvgReturn;
        /**
         * Returns the Medal SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#medal
         */
        const Medal: SvgReturn;
        /**
         * Returns the Merge SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#merge
         */
        const Merge: SvgReturn;
        /**
         * Returns the Message SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#message
         */
        const Message: SvgReturn;
        /**
         * Returns the Microsoft SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#microsoft
         */
        const Microsoft: SvgReturn;
        /**
         * Returns the Migrate SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#migrate
         */
        const Migrate: SvgReturn;
        /**
         * Returns the Milestone SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#milestone
         */
        const Milestone: SvgReturn;
        /**
         * Returns the Minus SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#minus
         */
        const Minus: SvgReturn;
        /**
         * Returns the MinusSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#minussm
         */
        const MinusSm: SvgReturn;
        /**
         * Returns the Moderator SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#moderator
         */
        const Moderator: SvgReturn;
        /**
         * Returns the ModeratorSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#moderatorsm
         */
        const ModeratorSm: SvgReturn;
        /**
         * Returns the Money SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#money
         */
        const Money: SvgReturn;
        /**
         * Returns the NotInterested SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#notinterested
         */
        const NotInterested: SvgReturn;
        /**
         * Returns the OpenSource SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#opensource
         */
        const OpenSource: SvgReturn;
        /**
         * Returns the OrderedList SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#orderedlist
         */
        const OrderedList: SvgReturn;
        /**
         * Returns the Outdent SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#outdent
         */
        const Outdent: SvgReturn;
        /**
         * Returns the Paperclip SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#paperclip
         */
        const Paperclip: SvgReturn;
        /**
         * Returns the Peak SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#peak
         */
        const Peak: SvgReturn;
        /**
         * Returns the Pencil SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#pencil
         */
        const Pencil: SvgReturn;
        /**
         * Returns the PencilSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#pencilsm
         */
        const PencilSm: SvgReturn;
        /**
         * Returns the People SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#people
         */
        const People: SvgReturn;
        /**
         * Returns the Person SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#person
         */
        const Person: SvgReturn;
        /**
         * Returns the Phone SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#phone
         */
        const Phone: SvgReturn;
        /**
         * Returns the Play SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#play
         */
        const Play: SvgReturn;
        /**
         * Returns the Plus SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#plus
         */
        const Plus: SvgReturn;
        /**
         * Returns the PlusOne SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#plusone
         */
        const PlusOne: SvgReturn;
        /**
         * Returns the PlusSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#plussm
         */
        const PlusSm: SvgReturn;
        /**
         * Returns the PromoteDemote SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#promotedemote
         */
        const PromoteDemote: SvgReturn;
        /**
         * Returns the Question SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#question
         */
        const Question: SvgReturn;
        /**
         * Returns the Quote SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#quote
         */
        const Quote: SvgReturn;
        /**
         * Returns the Refresh SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#refresh
         */
        const Refresh: SvgReturn;
        /**
         * Returns the RefreshSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#refreshsm
         */
        const RefreshSm: SvgReturn;
        /**
         * Returns the Relocation SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#relocation
         */
        const Relocation: SvgReturn;
        /**
         * Returns the Remote SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#remote
         */
        const Remote: SvgReturn;
        /**
         * Returns the ReviewQueue SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#reviewqueue
         */
        const ReviewQueue: SvgReturn;
        /**
         * Returns the Rss SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#rss
         */
        const Rss: SvgReturn;
        /**
         * Returns the School SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#school
         */
        const School: SvgReturn;
        /**
         * Returns the SchoolSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#schoolsm
         */
        const SchoolSm: SvgReturn;
        /**
         * Returns the Search SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#search
         */
        const Search: SvgReturn;
        /**
         * Returns the SearchSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#searchsm
         */
        const SearchSm: SvgReturn;
        /**
         * Returns the Share SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#share
         */
        const Share: SvgReturn;
        /**
         * Returns the ShareSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#sharesm
         */
        const ShareSm: SvgReturn;
        /**
         * Returns the Shield SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#shield
         */
        const Shield: SvgReturn;
        /**
         * Returns the ShieldSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#shieldsm
         */
        const ShieldSm: SvgReturn;
        /**
         * Returns the ShieldXSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#shieldxsm
         */
        const ShieldXSm: SvgReturn;
        /**
         * Returns the Skull SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#skull
         */
        const Skull: SvgReturn;
        /**
         * Returns the Slack SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#slack
         */
        const Slack: SvgReturn;
        /**
         * Returns the SmartPhone SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#smartphone
         */
        const SmartPhone: SvgReturn;
        /**
         * Returns the SOS SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#sos
         */
        const SOS: SvgReturn;
        /**
         * Returns the SpeechBubble SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#speechbubble
         */
        const SpeechBubble: SvgReturn;
        /**
         * Returns the SpeechBubbleError SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#speechbubbleerror
         */
        const SpeechBubbleError: SvgReturn;
        /**
         * Returns the SpeechBubbleSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#speechbubblesm
         */
        const SpeechBubbleSm: SvgReturn;
        /**
         * Returns the StackExchange SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#stackexchange
         */
        const StackExchange: SvgReturn;
        /**
         * Returns the Star SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#star
         */
        const Star: SvgReturn;
        /**
         * Returns the Stroller SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#stroller
         */
        const Stroller: SvgReturn;
        /**
         * Returns the Subway SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#subway
         */
        const Subway: SvgReturn;
        /**
         * Returns the Sync SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#sync
         */
        const Sync: SvgReturn;
        /**
         * Returns the Tack SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#tack
         */
        const Tack: SvgReturn;
        /**
         * Returns the Tada SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#tada
         */
        const Tada: SvgReturn;
        /**
         * Returns the ThumbsDown SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#thumbsdown
         */
        const ThumbsDown: SvgReturn;
        /**
         * Returns the ThumbsUp SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#thumbsup
         */
        const ThumbsUp: SvgReturn;
        /**
         * Returns the TIL SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#til
         */
        const TIL: SvgReturn;
        /**
         * Returns the Tool SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#tool
         */
        const Tool: SvgReturn;
        /**
         * Returns the Trash SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#trash
         */
        const Trash: SvgReturn;
        /**
         * Returns the TrashSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#trashsm
         */
        const TrashSm: SvgReturn;
        /**
         * Returns the TrendingDown SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#trendingdown
         */
        const TrendingDown: SvgReturn;
        /**
         * Returns the TrendingNone SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#trendingnone
         */
        const TrendingNone: SvgReturn;
        /**
         * Returns the TrendingUp SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#trendingup
         */
        const TrendingUp: SvgReturn;
        /**
         * Returns the Twitter SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#twitter
         */
        const Twitter: SvgReturn;
        /**
         * Returns the Undo SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#undo
         */
        const Undo: SvgReturn;
        /**
         * Returns the UndoSm SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#undosm
         */
        const UndoSm: SvgReturn;
        /**
         * Returns the UnorderedList SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#unorderedlist
         */
        const UnorderedList: SvgReturn;
        /**
         * Returns the Vacation SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#vacation
         */
        const Vacation: SvgReturn;
        /**
         * Returns the VK SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#vk
         */
        const VK: SvgReturn;
        /**
         * Returns the Wave SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#wave
         */
        const Wave: SvgReturn;
        /**
         * Returns the Yandex SVG icon
         * @link https://stackoverflow.design/product/resources/icons/#yandex
         */
        const Yandex: SvgReturn;
    }
}

export { };
