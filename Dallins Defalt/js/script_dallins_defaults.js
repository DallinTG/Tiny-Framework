// ------------------------ Global-var -----------------
// let all_carousels;


//------------- live variables --------------

const variables_handler = {
	set(target, property, value) {
		target[property] = value;
		let live = deep_querySelectorAll("[data-live]");
		live.forEach((element) => {
			if (element.hasAttribute("data-live")) {
				if (property === element.getAttribute("data-live")) {
					element.innerText = value;
				}
			}
		});
	},
};

const live_variables = new Proxy(variables, variables_handler);

for (const [key, value] of Object.entries(live_variables)) {
	let live = deep_querySelectorAll("[data-live]");
	live.forEach((element) => {
		if (element.hasAttribute("data-live")) {
			if (key === element.getAttribute("data-live")) {
				element.innerText = value;
			}
		}
	});
}

//--------------- dom lib ----------------------------

//------------------------- Create HTML --------------------------

function create_html(type, inner_text = "", attributes = "", styles = "") {
	let element_name = document.createElement(type);
	element_name.textContent = inner_text;
	if (attributes != "") {
		attributes.forEach((element) => {
			let attribute = element[0];
			let data = element[1];
			element_name.setAttribute(attribute, data);
		});
	}
	if (styles != "") {
		styles.forEach((element) => {
			let style1 = element[0];
			let data = element[1];
			element_name.style[style1] = data;
		});
	}
	return element_name;
}
//-----------------------------------------------------

function deep_querySelector(selector) {
	let output = [];
	for (const comp_1 of all_doms) {
		output = comp_1.querySelector(selector);
		if (output == null) {
		} else {
			return output;
		}
	}
	return output;
}
function deep_querySelectorAll(selector) {
	let output = [];
	for (const comp_2 of all_doms) {
		comp_2.querySelectorAll(selector).forEach((element) => {
			output.push(element);
		});
	}
	return output;
}

//------------------------------ Carousel ----------------------------------

// function carousel_lode(comp) {
// 	let carousel_index = -1;
// 	all_carousels.forEach((carousel) => {
// 		carousel_index++;
// 		carousel.setAttribute("data-index", carousel_index);
// 		let previous_button = create_html("button", "⇦", [
// 			["class", "carousel_button previous"],
// 			[
// 				"onclick",
// 				"carousel_button(" + carousel_index + `, 'previous',${comp})`,
// 			],
// 			["data-carousel-button", "previous"],
// 		]);
// 		let next_button = create_html("button", "⇨", [
// 			["class", "carousel_button next"],
// 			[
// 				"onclick",
// 				"carousel_button(" + carousel_index + `, 'next',${comp})`,
// 			],
// 			["data-carousel-button", "next"],
// 		]);
// 		let button_box = create_html("div", "", [
// 			["class", "carousel_button_bottom_box"],
// 		]);
// 		carousel.appendChild(previous_button);
// 		carousel.appendChild(next_button);
// 		carousel.appendChild(button_box);
// 		let carousel_li = carousel.querySelectorAll("li");
// 		carousel.setAttribute("data-slide-index", 0);
// 		carousel.setAttribute("data-slide-length", carousel_li.length);
// 		carousel_li[0].setAttribute("data-active", "1");
// 		let carousel_li_index = -1;
// 		carousel_li.forEach((li) => {
// 			carousel_li_index++;
// 			let bottom_button = create_html("button", "−", [
// 				[
// 					"onclick",
// 					"carousel_bottom_button(" +
// 						carousel_index +
// 						", " +
// 						carousel_li_index +
// 						")",
// 				],
// 				["data-bottom-button-index", carousel_li_index],
// 				["class", "carousel_button_bottom"],
// 			]);
// 			button_box.appendChild(bottom_button);
// 		});
// 	});
// }
// function carousel_button(carousel_index, l_or_r, comp) {
// 	let carousel = comp.querySelectorAll(".carousel")[carousel_index];
// 	let carousel_li_index = carousel.getAttribute("data-slide-index");
// 	let carousel_all = carousel.querySelectorAll("li");
// 	carousel_all[carousel_li_index].removeAttribute("data-active");

// 	carousel.querySelectorAll("li").forEach((li) => {
// 		li.removeAttribute("data-active");
// 	});

// 	if (l_or_r === "previous") {
// 		if (carousel.getAttribute("data-slide-index") <= 0) {
// 			carousel.setAttribute(
// 				"data-slide-index",
// 				carousel.getAttribute("data-slide-length") - 1,
// 			);
// 		} else {
// 			carousel.setAttribute(
// 				"data-slide-index",
// 				carousel.getAttribute("data-slide-index") - 1,
// 			);
// 		}
// 	}
// 	if (l_or_r === "next") {
// 		if (
// 			carousel.getAttribute("data-slide-index") >=
// 			carousel.getAttribute("data-slide-length") - 1
// 		) {
// 			carousel.setAttribute("data-slide-index", 0);
// 		} else {
// 			carousel.setAttribute(
// 				"data-slide-index",
// 				Number(carousel_li_index) + 1,
// 			);
// 		}
// 	}

// 	let carousel_li = carousel.querySelectorAll("li");
// 	carousel_li[carousel.getAttribute("data-slide-index")].setAttribute(
// 		"data-active",
// 		"1",
// 	);
// }

// function carousel_bottom_button(carousel_index, li) {
// 	let carousel = all_carousels[carousel_index];
// 	let slide_index = carousel.getAttribute("data-slide-index");
// 	carousel.setAttribute("data-slide-index", li);
// 	let carousel_li = carousel.querySelectorAll("li");
// 	carousel_li.forEach((li) => {
// 		li.removeAttribute("data-active");
// 	});
// 	carousel_li[li].setAttribute("data-active", "1");
// }

// ----------------------------Modal--------------------------------

function modal_display(id) {
	let modals = deep_querySelectorAll(id);
	modals.forEach((modal) => {
		if (modal.hasAttribute("data-active")) {
			modal.removeAttribute("data-active");
			console.log("modal display off");
		} else {
			modal.setAttribute("data-active", "1");
			modal.setAttribute("tabindex", "0");
			modal.setAttribute("onblur", "modal_display('" + id + "')");
			modal.focus();
			console.log("modal display on");
		}
	});
}

// -------------------------- random number -------------------

function random_number(num_start, num_end) {
	return Math.floor(Math.random() * num_end) + num_start;
}
// -------------------------- random color -------------------
function random_color(s_true, l_true) {
	let h = random_number(0, 360);
	let s = random_number(0, 100);
	let l = random_number(0, 100);
	if (s_true) {
		s = random_number(40, 35);
	} else {
		s = random_number(0, 100);
	}
	if (l_true) {
		l = random_number(30, 30);
	} else {
		l = random_number(0, 100);
	}
	return [h, s, l];
}

function do_random_color_on_page() {
	color = random_color(true, true);
	color_contrast = [0, 0, 0];
	color_contrast[0] = color_contrast[0] + 180;
	color_contrast[0] = color[0] + color_contrast[0];
	color_contrast[1] = color[1] + color_contrast[1];
	color_contrast[2] = color[2] + color_contrast[2];

	color = "hsl(" + color[0] + ", " + color[1] + "%, " + color[2] + "%)";

	color_contrast =
		"hsl(" +
		color_contrast[0] +
		", " +
		color_contrast[1] +
		"%, " +
		color_contrast[2] +
		"%)";

	root.style.setProperty("--m", color);
	root.style.setProperty("--h", color_contrast);
	console.log("H Color" + color_contrast);
	console.log("M Color" + color);
}
//--------------------------------------

function age_up() {
	live_variables.age++;
}

function main(params) {
}
do_random_color_on_page();
lode_styles(document);
components_load();
