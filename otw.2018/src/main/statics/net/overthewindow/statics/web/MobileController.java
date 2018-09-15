package net.overthewindow.statics.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value="/mobile/")
public class MobileController {
	
	@GetMapping(value="main.otw")
	public String main() {
		return "statics/mobile/main";
	}

}
