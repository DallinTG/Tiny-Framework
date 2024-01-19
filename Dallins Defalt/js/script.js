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
// <div>
// #{age}
// </div>
// `,
// 	true,
// 	true,
// 	variables,
// );

//-----------------------------------------

append_comp_string(
	document.querySelector("#waf"),
	`
<div class="$bg-color-red-md:hover">
 awfffsadasd asda sda sd asd asda sdas
</div>
<br>
<hr>
<br>
<div>
#{tab_info.waffles.p}
</div>
`,
	40,
	true,
	true,
	food_tab,
);

//--------------------------------------------

// add_comp(document.querySelector("#waf"), "test", false);

// append_comp(document.querySelector("#waf"), "test", 2, true, false);
