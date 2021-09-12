import { expectType } from "tsd";
import "../lib/svg";

expectType<void>(
    Svg.init("https://cdn.sstatic.net/Img/stacks-icons", "d569c09cdf59")
);

expectType<JQuery<SVGElement>>(Svg.get("Achievements"));

expectType<string>(Svg.cache.Achievements);

expectType<JQuery<SVGElement>>(Svg.GetImage()());

expectType<JQuery<SVGElement> | Error>(Svg._placeholder());

expectType<JQuery<SVGElement>>(Svg.Achievements());

expectType<JQuery<SVGElement>>(Svg.Achievements.With("native"));
