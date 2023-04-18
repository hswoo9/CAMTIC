package egovframework.com.devjitsu.camtic.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.enterprise.inject.Model;
import javax.servlet.http.HttpServletRequest;

@Controller
public class HomepageController {

    private static final Logger logger = LoggerFactory.getLogger(HomepageController.class);

    @RequestMapping("/camtic")
    public String homepageIndexA(){
        return "camtic/camticIndex";
    }

    @RequestMapping("/camtic/")
    public String homepageIndexB(){
        return "camtic/camticIndex";
    }

    @RequestMapping("/camtic/index.do")
    public String homepageIndexC(HttpServletRequest request, Model model){
        logger.info("camtic index.do");
        return "camtic/camticIndex";
    }
}
