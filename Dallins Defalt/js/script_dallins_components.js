//----------global var ---------------

let all_doms = [document];
let comp_index = -1;
let new_comp_index;
let new_comp_index_2 = 0;
let comp;
let comp_host;
let comp_data = {};
let comp_text_data = "";

//-----------------------components-----------------------

// const regex = /#{[^{]+}/g;
const regex = /#{[^{]+?}/g;

function interpolate(template, variables, fallback) {
	return template.replace(regex, (match) => {
		const path = match.slice(2, -1).trim();
		// console.log(match);
		return getObjPath(path, variables, fallback);
		
	});
}

//get the specified property or nested property of an object
function getObjPath(path, obj, fallback = "") {
	return path.split(".").reduce((res, key) => res[key] || fallback, obj);
}

// --------------------------------------------------------

function components_load() {
	let new_components = document.querySelectorAll("[comp]");
	new_components.forEach((new_component) => {
		add_new_component(new_component);
	});
}

function components_load_shadow(shadow_doms) {
	let new_components = shadow_doms.querySelectorAll("[comp]");
	new_components.forEach((new_component) => {
		add_new_component(new_component);
	});
}

function if_components(new_component) {
	if (new_component.querySelector("[comp]") != null) {
		components_load_shadow(new_component);
	}
}
function test_comp_loaded() {
	if (new_comp_index_2 == 0) {
		main();
	}
}

//----------------------------------------------
function get_comp_text(comp_name) {
	return fetch(`./component/${comp_name}.html`).then(function (response) {
		if (response.ok) {
			let text = response.text();
			return text;
		}
		throw response;
	});
}

function create_doc_frag(text) {
	return document.createRange().createContextualFragment(text);
}

function add_shadow(host_comp) {
	const host = host_comp;
	const shadow = host.attachShadow({ mode: "open" });
	comp = shadow;
	comp_host = host;
	all_doms.push(shadow);
	shadow.adoptedStyleSheets = [sheet, sheet_md, sheet_lg];
	return shadow;
}

function add_new_component(location) {
	let comp_name = location.getAttribute("comp");
	location.removeAttribute("comp");
	new_comp_index_2++;
	let data_comp_data;
	if (location.getAttribute("comp-data") != null) {
		data_comp_data = location.getAttribute("comp-data");
	}
	try {
		append_comp(location, comp_name,1, true, true, eval(data_comp_data));
	} catch {
		append_comp(location, comp_name,1, true);
		console.log(
			"\x1B[31mInvalid object in [comp-data] = '" + data_comp_data + "'",
			location,
		);
	}
}

function add_comp_string(
	location,
	text,
	do_shadow = true,
	do_replace = true,
	object = variables,
) {
	text = interpolate(text, object);
	let html = create_doc_frag(text);
	if (do_replace) {
		location.replaceChildren();
	}
	if (do_shadow) {
		let shadow = add_shadow(location);
		comp_data = object;
		shadow.append(html);
		shadow.adoptedStyleSheets = [sheet, sheet_md, sheet_lg];
		if_components(shadow);
		lode_styles(shadow);
	} else {
		comp = location;
		comp_host = location;
		comp_data = object;
		location.append(html);
		if_components(location);
		lode_styles(location);
	}
	comp_index++;
	return comp;
}
// add_comp_string(
// 	document.querySelector("#waf"),
// 	`
// <div class="$bg-color-red">
//  awfffsadasd asda sda sd asd asda sdas
// </div>
// <br>
// <hr>
// <br>
// <div>
//  awfffsadasd asda sda sd asd asda sdas
// </div>
// `,
// );

function append_comp_string(
	location,
	text,
	times = 1,
	do_shadow = true,
	do_replace = false,
	object = variables,
) {
	let added_comps = [];
	if (do_replace) {
		location.replaceChildren();
	}
	for (let index = 0; index < times; index++) {
		text = interpolate(text, object);
		let div = document.createElement("div");
		div.classList.add("doc_frag")
		// let div = location;
		location.append(div);
		let html = create_doc_frag(text);
		if (do_shadow) {
			let shadow = add_shadow(div);
			comp_data = object;
			shadow.append(html);
			shadow.adoptedStyleSheets = [sheet, sheet_md, sheet_lg];
			if_components(shadow);
			lode_styles(shadow);
		} else {
			comp = div;
			comp_host = div;
			comp_data = object;
			div.append(html);
			if_components(div);
			lode_styles(div);
		}
		comp_index++;
		added_comps.push(comp);
	}
	return [added_comps, comp_host.parentElement];
}
// append_comp_string(
// 	document.querySelector("#waf"),
// 	`
// <div class="$bg-color-red">
//  awfffsadasd asda sda sd asd asda sdas
// </div>
// <br>
// <hr>
// <br>
// <div>
//  awfffsadasd asda sda sd asd asda sdas
// </div>
// `,
// 	40,
// 	true,
// );

function add_comp(
	location,
	comp_name,
	do_shadow = true,
	do_replace = true,
	object = variables,
) {
	return get_comp_text(comp_name).then(function (text) {
		return add_comp_string(location, text, do_shadow, do_replace, object);
	});
}
// add_comp(document.querySelector("#waf"), "test", true, waf);

function append_comp(
	location,
	comp_name,
	times = 1,
	do_shadow = true,
	do_replace = false,
	object = variables,
) {
	return get_comp_text(comp_name).then(function (text) {
		return append_comp_string(
			location,
			text,
			times,
			do_shadow,
			do_replace,
			object,
		);
	});
}
// append_comp(document.querySelector("#waf"), "test", 4, false);

function on_comp_lode(this_, comp) {}
