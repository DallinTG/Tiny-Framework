
// let all_elements
// let all_classes = []
let all_styles = [];

let sheet = new CSSStyleSheet();
let sheet_md = new CSSStyleSheet();
let sheet_lg = new CSSStyleSheet();
document.adoptedStyleSheets = [sheet, sheet_md, sheet_lg];

//------------------------------filters------------------
function onlyUnique(value, index, array) {
	return array.indexOf(value) === index;
}
function getPosition(string, subString, index) {
	return string.split(subString, index).join(subString).length;
}
//-----------------------lode styles------------------
function lode_styles(dom_style) {
	// console.log(all_styles);

	let all_elements = dom_style.querySelectorAll("*");
	let all_classes = [];
	// let all_styles = []

	for (const element of all_elements) {
		for (const classes of element.classList) {
			all_classes.push(classes);
		}
	}
	all_classes.filter(onlyUnique);
	for (const iterator of all_classes.filter(onlyUnique)) {
		if (iterator.startsWith("$")) {
			let do_push = true;
			for (const style of all_styles) {
				if (style[0] == iterator) {
					do_push = false;
					break;
				}
			}
			if (do_push) {
				all_styles.push([iterator, "not_added"]);
			}
		}
	}

	for (const style of all_styles) {
		if (style[1] == "not_added") {
			style[1] = "added";
			let sty = style[0];
			let media_top = "";
			let media_bot = "";
			let style_sheet;
			let size = "default";
			let value;
			let style_mod = "";
			let style_mod_base = "";
			let suffix = "";
			//----------------------------suffixes------------------------------
			if (sty.indexOf(":") != -1) {
				suffix = sty.slice(sty.indexOf(":"));
				suffix = "\\" + suffix + suffix;
				if (suffix.startsWith(":", 2)) {
					suffix = suffix.slice(0, 2) + "\\" + suffix.slice(2);
				}
				sty = sty.slice(0, sty.indexOf(":"));
			}
			//----------------------------size/stylesheet---------------------------
			if (sty.slice(-2) == "md") {
				media_top = "@media (min-width: 800px) {";
				media_bot = "}";
				size = "-md";
				style_sheet = sheet_md;
				sty = sty.slice(0, -3);
			} else if (sty.slice(-2) == "lg") {
				media_top = "@media (min-width: 1500px) {";
				media_bot = "}";
				size = "-lg";
				style_sheet = sheet_lg;
				sty = sty.slice(0, -3);
			} else {
				media_top = "";
				media_bot = "";
				size = "";
				style_sheet = sheet;
			}

			if (
				sty.startsWith("p", 1) ||
				sty.startsWith("m", 1) ||
				sty.slice(1, 5) == "gap-" ||
				sty.includes("display-") ||
				sty.includes("justify") ||
				sty.includes("flex-")
			) {
				//----------------$p-00 / $m-00----------------------------

				value = sty.slice(sty.indexOf("-") + 1);
				let arg1 = "calc(var(--padding) *";
				let arg2 = ")";
				if (sty.slice(1, 2) == "p") {
					style_mod_base = "padding";
				} else if (sty.slice(1, 2) == "m") {
					style_mod_base = "margin";
				} else if (sty.slice(1, 5) == "gap-") {
					style_mod_base = "gap";
				}

				if (sty.slice(2, 3) == "-") {
					style_mod = "";
				} else if (
					sty.slice(sty.indexOf("-") - 1, sty.indexOf("-") + 1) ==
					"t-"
				) {
					style_mod = "-top";
				} else if (
					sty.slice(sty.indexOf("-") - 1, sty.indexOf("-") + 1) ==
					"b-"
				) {
					style_mod = "-bottom";
				} else if (
					sty.slice(sty.indexOf("-") - 1, sty.indexOf("-") + 1) ==
					"l-"
				) {
					style_mod = "-left";
				} else if (
					sty.slice(sty.indexOf("-") - 1, sty.indexOf("-") + 1) ==
					"r-"
				) {
					style_mod = "-right";
				}

				if (sty.includes("display-")) {
					style_mod_base = "display";
					value = sty.slice(sty.indexOf("-") + 1);
					arg1 = "";
					arg2 = "";
				}

				if (sty.includes("justify")) {
					style_mod_base = "justify-";
					style_mod = sty.slice(
						sty.indexOf("-") + 1,
						getPosition(sty, "-", 2),
					);
					value = sty.slice(getPosition(sty, "-", 2) + 1);
					arg1 = "";
					arg2 = "";
					// console.log(style_mod);
				}

				if (sty.includes("flex-")) {
					style_mod_base = "flex-";
					style_mod = sty.slice(
						sty.indexOf("-") + 1,
						getPosition(sty, "-", 2),
					);
					value = sty.slice(getPosition(sty, "-", 2) + 1);
					arg1 = "";
					arg2 = "";
					// console.log(style_mod);
				}

				style_sheet.insertRule(
					`
                    ${media_top}
                    .\\${sty}${size}${suffix} {
                    ${style_mod_base}${style_mod}:${arg1}${value}${arg2};
                    }
                    ${media_bot}
                    `,
				);
				// console.log(`
				// ${media_top}
				// .\\${sty}${size}${suffix} {
				// ${style_mod_base}${style_mod}:${arg1}${value}${arg2};
				// }
				// ${media_bot}
				// `);
			} else if (sty.slice(1, 5) == "col-") {
				//----------------$col-1/2

				if (sty.slice(1, 12) == "col-offset-") {
					value = sty.slice(12);
				} else {
					value = sty.slice(5);
				}

				if (sty.indexOf("/") != -1) {
					sty =
						sty.slice(0, sty.indexOf("/")) +
						"\\" +
						sty.slice(sty.indexOf("/"));
				}

				if (sty.slice(1, 12) == "col-offset-") {
					style_sheet.insertRule(
						`
                    ${media_top}
                    .\\${sty}${size}${suffix} {
                    margin-left: calc(100% *calc(${value}));
                    }
                    ${media_bot}
                    `,
					);
				} else {
					//-----------------------------------col-offset

					style_sheet.insertRule(
						`
                    ${media_top}
                    .\\${sty}${size}${suffix} {
                    -ms-flex: 0 0 calc(100% *calc(${value}));
                    flex: 0 0 calc(100% *calc(${value}));
                    max-width: calc(100% *calc(${value}));
                    }
                    ${media_bot}
                    `,
					);
				}
			} else if (sty.slice(1, 8) == "gutter-") {
				if (sty.slice(1, 8) == "gutter-") {
					value = sty.slice(8);
					// console.log(sty.slice(8));
				}

				style_sheet.insertRule(
					`
                    ${media_top}
                    .\\${sty}${size}${suffix} {
                        margin-right: calc(var(--padding) * -${value});
                        margin-left: calc(var(--padding) * -${value});
                    }
                    ${media_bot}
                    `,
				);
				style_sheet.insertRule(
					`
                    ${media_top}
                    .\\${sty}${size}${suffix}>[class*="$col-"] {
                        padding-right: calc(var(--padding) * ${value});
                        padding-left: calc(var(--padding) * ${value});
                    }
                    ${media_bot}
                    `,
				);
			} else if (sty.includes("color-")) {
				let color = "";
				let color_value = "100";
				let color_light_or_dark = "white";
				style_mod = "color:";
				sty.indexOf("color-");

				color = sty.slice(sty.indexOf("color-") + 6);

				if (color.includes("-")) {
					color_value = color.slice(color.indexOf("-") + 2);
					color_light_or_dark = color.slice(
						color.indexOf("-") + 1,
						color.indexOf("-") + 2,
					);
					color = color.slice(0, color.indexOf("-"));

					if (color_light_or_dark == "d") {
						color_light_or_dark = "black";
					} else {
						color_light_or_dark = "white";
					}
				}
				if (sty.includes("bg")) {
					style_mod_base = "background-";
				} else if (sty.includes("boxshadow-")) {
					style_mod_base = "box-shadow";
					style_mod = ": 5px 20px 35px";
				} else if (sty.includes("textshadow-")) {
					style_mod_base = "text-shadow";
					style_mod = ": 2px 2px ";
				} else if (sty.includes("border-")) {
					style_mod_base = "border-";
				}

				style_sheet.insertRule(
					`
                    ${media_top}
                    .\\${sty}${size}${suffix}{
                        ${style_mod_base}${style_mod} color-mix(in srgb, var(--${color}) ${color_value}%, ${color_light_or_dark});
                    }
                    ${media_bot}
                    `,
				);
			} else if (sty.includes("row") || sty.includes("column")) {
				if (sty.includes("row")) {
					style_sheet.insertRule(
						`
						${media_top}
						.\\${sty}${size}${suffix}{
								display: -ms-flexbox;
								display: flex;
								-ms-flex-wrap: wrap;
								flex-wrap: wrap;
								width: 100%;
								padding-right: 0;
								padding-left: 0;
								margin-right: auto;
								margin-left: auto;
						}
						${media_bot}
						`,
					);
				} else {
					style_sheet.insertRule(
						`
						${media_top}
						.\\${sty}${size}${suffix}{
								display: -ms-flexbox;
								display: flex;
								-ms-flex-wrap: wrap;
								flex-wrap: wrap;
								width: 100%;
								padding-right: 0;
								padding-left: 0;
								margin-right: auto;
								margin-left: auto;
								flex-direction: column;
						}
						${media_bot}
						`,
					);
				}
			}
		}
	}
}
