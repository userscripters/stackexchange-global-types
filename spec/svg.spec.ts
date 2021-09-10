// $ExpectType void
Svg.init("https://cdn.sstatic.net/Img/stacks-icons", "d569c09cdf59");

// $ExpectType JQuery<SVGElement>
Svg.get("Achievements");

// $ExpectType string
Svg.cache.Achievements;

// $ExpectType JQuery<SVGElement>
Svg.GetImage()();

// $ExpectType JQuery<SVGElement> | Error
Svg._placeholder();

// $ExpectType JQuery<SVGElement>
Svg.Achievements();

// $ExpectType JQuery<SVGElement>
Svg.Achievements.With("native");
