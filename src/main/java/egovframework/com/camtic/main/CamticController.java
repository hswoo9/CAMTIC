package egovframework.com.camtic.main;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CamticController {

    @RequestMapping("/CAMTIC")
    public String index(){
        return "camtic/index";
    }
}
